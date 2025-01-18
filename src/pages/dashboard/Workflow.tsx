import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface Subject {
  id?: string;
  name: string;
  forwardTo: string;
}

interface UrgencySettings {
  id?: string;
  urgencyLevel: string;
  forwardStep: 'call_112' | 'forward_to_assistant' | 'provide_selfcare';
  assistantPhone?: string;
  adviceType?: 'simple' | 'extensive';
}

const Workflow = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: "", forwardTo: "" });
  const [urgencySettings, setUrgencySettings] = useState<UrgencySettings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflowSettings();
  }, []);

  const fetchWorkflowSettings = async () => {
    try {
      // Fetch urgency settings
      const { data: urgencyData, error: urgencyError } = await supabase
        .from('workflow_urgency_settings')
        .select('*');

      if (urgencyError) throw urgencyError;

      // Initialize default settings if none exist
      if (!urgencyData || urgencyData.length === 0) {
        const defaultSettings = ['U1', 'U2', 'U3', 'U4', 'U5'].map(level => ({
          urgencyLevel: level,
          forwardStep: level === 'U1' ? 'call_112' : 
                      level === 'U5' ? 'provide_selfcare' : 
                      'forward_to_assistant'
        }));
        setUrgencySettings(defaultSettings);
      } else {
        setUrgencySettings(urgencyData);
      }

      // Fetch unsuitable subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('workflow_unsuitable_subjects')
        .select('*');

      if (subjectsError) throw subjectsError;

      if (subjectsData) {
        setSubjects(subjectsData.map(s => ({
          id: s.id,
          name: s.subject,
          forwardTo: s.forward_to
        })));
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
      const updatedSettings = urgencySettings.map(s => 
        s.urgencyLevel === level ? { ...s, ...setting } : s
      );
      setUrgencySettings(updatedSettings);

      const { error } = await supabase
        .from('workflow_urgency_settings')
        .upsert({
          urgency_level: level,
          ...setting
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
    if (!newSubject.name || !newSubject.forwardTo) {
      toast({
        title: "Missing information",
        description: "Please fill in both the subject and forward to fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('workflow_unsuitable_subjects')
        .insert({
          subject: newSubject.name,
          forward_to: newSubject.forwardTo
        })
        .select()
        .single();

      if (error) throw error;

      setSubjects([...subjects, {
        id: data.id,
        name: data.subject,
        forwardTo: data.forward_to
      }]);
      setNewSubject({ name: "", forwardTo: "" });
      
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Configuration</h2>
        <p className="text-white/60">Configure how incoming calls are handled</p>
      </div>

      <div className="grid gap-6">
        {/* Care Demand Suitable Section */}
        <Card className="bg-forest-light/50 border-mint/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-mint" />
              Care Demand Suitable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {urgencySettings.map((setting) => (
              <div key={setting.urgencyLevel} className="grid gap-4 p-4 rounded-lg bg-forest-dark/30">
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold min-w-[40px]">{setting.urgencyLevel}</span>
                  <Select
                    value={setting.forwardStep}
                    onValueChange={(value: 'call_112' | 'forward_to_assistant' | 'provide_selfcare') => 
                      handleUrgencySettingChange(setting.urgencyLevel, { forwardStep: value })
                    }
                  >
                    <SelectTrigger className="bg-forest border-mint/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call_112">Advice to call 112 directly</SelectItem>
                      <SelectItem value="forward_to_assistant">Forward to Doctor's Assistant</SelectItem>
                      <SelectItem value="provide_selfcare">Provide selfcare advice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {setting.forwardStep === 'forward_to_assistant' && (
                  <div className="ml-[56px]">
                    <Input
                      placeholder="Assistant's phone number"
                      value={setting.assistantPhone || ''}
                      onChange={(e) => handleUrgencySettingChange(setting.urgencyLevel, { 
                        assistantPhone: e.target.value 
                      })}
                      className="bg-forest border-mint/20"
                    />
                  </div>
                )}

                {setting.forwardStep === 'provide_selfcare' && (
                  <div className="ml-[56px]">
                    <Select
                      value={setting.adviceType || 'simple'}
                      onValueChange={(value: 'simple' | 'extensive') => 
                        handleUrgencySettingChange(setting.urgencyLevel, { adviceType: value })
                      }
                    >
                      <SelectTrigger className="bg-forest border-mint/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple short advice</SelectItem>
                        <SelectItem value="extensive">Extensive advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="bg-forest border-mint/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Forward To</Label>
                  <Input
                    placeholder="Enter destination"
                    value={newSubject.forwardTo}
                    onChange={(e) => setNewSubject({ ...newSubject, forwardTo: e.target.value })}
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
                      <span className="text-white font-medium">{subject.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => subject.id && handleRemoveSubject(subject.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-white/60 text-sm">→ {subject.forwardTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workflow;