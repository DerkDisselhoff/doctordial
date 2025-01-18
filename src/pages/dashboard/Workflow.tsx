import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

type ForwardStep = "call_112" | "forward_to_assistant" | "provide_selfcare";
type AdviceType = "simple" | "extensive";

// Interface matching the database schema
interface UrgencySettings {
  id?: string;
  profile_id: string; // Required by database
  urgency_level: string;
  forward_step: ForwardStep; // Required by database
  assistant_phone?: string;
  advice_type?: AdviceType;
  created_at?: string;
  updated_at?: string;
}

interface Subject {
  id?: string;
  profile_id: string; // Required by database
  subject: string;
  forward_to: string;
  created_at?: string;
  updated_at?: string;
}

const getUrgencyColor = (level: string) => {
  switch (level) {
    case 'U1': return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'U2': return 'bg-orange-500/20 border-orange-500/30 text-orange-500';
    case 'U3': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500';
    case 'U4': return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    case 'U5': return 'bg-green-500/20 border-green-500/30 text-green-500';
    default: return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};

export function Workflow() {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ subject: "", forward_to: "" });
  const [urgencySettings, setUrgencySettings] = useState<UrgencySettings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflowSettings();
  }, []);

  const fetchWorkflowSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Initialize default settings if none exist
      const defaultSettings: UrgencySettings[] = ['U1', 'U2', 'U3', 'U4', 'U5'].map(level => ({
        urgency_level: level,
        forward_step: level === 'U1' ? 'call_112' : 
                     level === 'U5' ? 'provide_selfcare' : 
                     'forward_to_assistant',
        profile_id: user.id
      }));

      // Fetch urgency settings
      const { data: urgencyData, error: urgencyError } = await supabase
        .from('workflow_urgency_settings')
        .select('*')
        .eq('profile_id', user.id);

      if (urgencyError) throw urgencyError;

      if (!urgencyData || urgencyData.length === 0) {
        // Insert default settings
        const { error: insertError } = await supabase
          .from('workflow_urgency_settings')
          .insert(defaultSettings);

        if (insertError) throw insertError;
        setUrgencySettings(defaultSettings);
      } else {
        setUrgencySettings(urgencyData);
      }

      // Fetch unsuitable subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('workflow_unsuitable_subjects')
        .select('*')
        .eq('profile_id', user.id);

      if (subjectsError) throw subjectsError;

      if (subjectsData) {
        setSubjects(subjectsData);
      }
    } catch (error) {
      console.error('Error fetching workflow settings:', error);
      toast({
        title: "Error fetching settings",
        description: "Failed to load workflow settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUrgencySettingChange = async (level: string, setting: Partial<UrgencySettings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const updatedSettings = urgencySettings.map(s => 
        s.urgency_level === level ? { ...s, ...setting } : s
      );
      setUrgencySettings(updatedSettings);

      const currentSetting = updatedSettings.find(s => s.urgency_level === level);
      if (!currentSetting) return;

      const { error } = await supabase
        .from('workflow_urgency_settings')
        .upsert({
          ...currentSetting,
          profile_id: user.id,
          forward_step: currentSetting.forward_step // Ensure this is always set
        });

      if (error) throw error;

      toast({
        title: "Settings updated",
        description: `Settings for ${level} have been updated`,
      });
    } catch (error) {
      console.error('Error updating urgency settings:', error);
      toast({
        title: "Error updating settings",
        description: "Failed to update urgency settings",
        variant: "destructive",
      });
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject.subject || !newSubject.forward_to) {
      toast({
        title: "Missing information",
        description: "Please fill in both the subject and forward to fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('workflow_unsuitable_subjects')
        .insert({
          profile_id: user.id,
          subject: newSubject.subject,
          forward_to: newSubject.forward_to
        })
        .select()
        .single();

      if (error) throw error;

      setSubjects([...subjects, data]);
      setNewSubject({ subject: "", forward_to: "" });
      
      toast({
        title: "Subject added",
        description: "The new subject has been added to the workflow",
      });
    } catch (error) {
      console.error('Error adding subject:', error);
      toast({
        title: "Error adding subject",
        description: "Failed to add the new subject",
        variant: "destructive",
      });
    }
  };

  const handleRemoveSubject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflow_unsuitable_subjects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubjects(subjects.filter(s => s.id !== id));
      toast({
        title: "Subject removed",
        description: "The subject has been removed from the workflow",
      });
    } catch (error) {
      console.error('Error removing subject:', error);
      toast({
        title: "Error removing subject",
        description: "Failed to remove the subject",
        variant: "destructive",
      });
    }
  };

  const handleSaveUrgencySettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('workflow_urgency_settings')
        .upsert(
          urgencySettings.map(setting => ({
            profile_id: user.id,
            urgency_level: setting.urgency_level,
            forward_step: setting.forward_step,
            assistant_phone: setting.assistant_phone,
            advice_type: setting.advice_type
          }))
        );

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your urgency settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving urgency settings:', error);
      toast({
        title: "Error saving settings",
        description: "Failed to save urgency settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Configuration</h2>
        <p className="text-white/60">Configure how incoming calls are handled</p>
      </div>

      <div className="grid gap-6">
        {/* Care Demand Suitable Section */}
        <Card className="bg-forest-light/50 border-mint/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-mint" />
              <CardTitle className="text-white">Care Demand Suitable</CardTitle>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSaveUrgencySettings}
              className="bg-forest border-mint/20 hover:bg-forest-light/50 text-mint"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgencySettings.map((setting) => (
              <div key={setting.urgency_level} className="grid gap-2 p-3 rounded-lg bg-forest-dark/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className={`inline-flex px-2 py-1 rounded-md text-sm font-medium border ${getUrgencyColor(setting.urgency_level)}`}>
                      {setting.urgency_level}
                    </span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      value={setting.forward_step}
                      onValueChange={(value: ForwardStep) => 
                        handleUrgencySettingChange(setting.urgency_level, { forward_step: value })
                      }
                    >
                      <SelectTrigger className="bg-forest border-mint/20 hover:bg-forest-light/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-forest border-mint/20">
                        <SelectItem value="call_112">Advice to call 112 directly</SelectItem>
                        <SelectItem value="forward_to_assistant">Forward to Doctor's Assistant</SelectItem>
                        <SelectItem value="provide_selfcare">Provide selfcare advice</SelectItem>
                      </SelectContent>
                    </Select>

                    {setting.forward_step === 'forward_to_assistant' && (
                      <Input
                        placeholder="Assistant's phone number"
                        value={setting.assistant_phone || ''}
                        onChange={(e) => handleUrgencySettingChange(setting.urgency_level, { 
                          assistant_phone: e.target.value 
                        })}
                        className="bg-forest border-mint/20"
                      />
                    )}

                    {setting.forward_step === 'provide_selfcare' && (
                      <Select
                        value={setting.advice_type || 'simple'}
                        onValueChange={(value: AdviceType) => 
                          handleUrgencySettingChange(setting.urgency_level, { advice_type: value })
                        }
                      >
                        <SelectTrigger className="bg-forest border-mint/20 hover:bg-forest-light/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-forest border-mint/20">
                          <SelectItem value="simple">Simple short advice</SelectItem>
                          <SelectItem value="extensive">Extensive advice</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Care Demand Unsuitable Section */}
        <Card className="bg-forest-light/50 border-mint/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-mint" />
              Care Demand Unsuitable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Subject Form */}
            <div className="grid gap-4 p-4 rounded-lg bg-forest-dark/30">
              <div className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
                <div className="space-y-2">
                  <Label className="text-white">Subject</Label>
                  <Input
                    placeholder="Enter subject"
                    value={newSubject.subject}
                    onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                    className="bg-forest border-mint/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Forward To</Label>
                  <Input
                    placeholder="Enter destination"
                    value={newSubject.forward_to}
                    onChange={(e) => setNewSubject({ ...newSubject, forward_to: e.target.value })}
                    className="bg-forest border-mint/20"
                  />
                </div>
                <Button
                  onClick={handleAddSubject}
                  className="self-end"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </div>

            {/* Subject List */}
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-forest-dark/30"
                >
                  <div className="grid gap-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{subject.subject}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => subject.id && handleRemoveSubject(subject.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-white/60 text-sm">→ {subject.forward_to}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Workflow;
