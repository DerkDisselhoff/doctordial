import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Plus, Trash2, Save, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { getUrgencyColor } from "@/utils/urgencyUtils";

type ForwardStep = "call_112" | "forward_to_assistant" | "provide_selfcare";
type AdviceType = "simple" | "extensive";
type ForwardingType = 'external' | 'selfcare' | 'both';

interface UrgencySettings {
  id?: string;
  profile_id: string;
  urgency_level: string;
  forward_step: ForwardStep;
  assistant_phone?: string;
  advice_type?: AdviceType;
  created_at?: string;
  updated_at?: string;
}

interface Subject {
  id?: string;
  profile_id: string;
  subject: string;
  forward_to: string;
  forward_type?: ForwardingType;
  created_at?: string;
  updated_at?: string;
}

export function Workflow() {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ 
    subject: "", 
    forward_to: "",
    forward_type: 'external' as ForwardingType 
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflowSettings();
  }, []);

  const fetchWorkflowSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

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

  const handleAddSubject = async () => {
    if (!newSubject.subject || (!newSubject.forward_to && newSubject.forward_type === 'external')) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
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
          forward_to: newSubject.forward_type === 'selfcare' ? 'Self-care advice' : newSubject.forward_to,
          forward_type: newSubject.forward_type
        })
        .select()
        .single();

      if (error) throw error;

      setSubjects([...subjects, data]);
      setNewSubject({ subject: "", forward_to: "", forward_type: 'external' });
      
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

  const handleRemoveSubject = async (subjectId: string) => {
    try {
      const { error } = await supabase
        .from('workflow_unsuitable_subjects')
        .delete()
        .eq('id', subjectId);

      if (error) throw error;

      setSubjects(subjects.filter(subject => subject.id !== subjectId));
      
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

  const filteredSubjects = subjects.filter(subject =>
    subject.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Configuration</h2>
        <p className="text-white/60">Configure how incoming calls are handled</p>
      </div>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="border-b border-mint/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-mint" />
              <CardTitle className="text-white">Subject Forwarding Externally Rules</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-forest border-mint/20"
              />
              <Button
                variant="outline"
                onClick={() => setNewSubject({ subject: "", forward_to: "", forward_type: 'external' })}
                className="bg-forest border-mint/20 hover:bg-forest-light/50 text-mint"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Subject
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-4 p-4 rounded-lg bg-forest-dark/30 mb-6">
            <div className="grid gap-4 md:grid-cols-[2fr,2fr,1fr,auto]">
              <div>
                <Label className="text-white mb-2">Subject</Label>
                <Input
                  placeholder="Enter subject"
                  value={newSubject.subject}
                  onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                  className="bg-forest border-mint/20"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Forward Type</Label>
                <Select
                  value={newSubject.forward_type}
                  onValueChange={(value: ForwardingType) => {
                    setNewSubject({ 
                      ...newSubject, 
                      forward_type: value,
                      forward_to: value === 'selfcare' ? 'Self-care advice' : newSubject.forward_to 
                    });
                  }}
                >
                  <SelectTrigger className="bg-forest border-mint/20 hover:bg-forest-light/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-forest border-mint/20">
                    <SelectItem value="external">External Clinic</SelectItem>
                    <SelectItem value="selfcare">Self-care Advice</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newSubject.forward_type !== 'selfcare' && (
                <div>
                  <Label className="text-white mb-2">Forward To</Label>
                  <Input
                    placeholder="Enter destination"
                    value={newSubject.forward_to}
                    onChange={(e) => setNewSubject({ ...newSubject, forward_to: e.target.value })}
                    className="bg-forest border-mint/20"
                  />
                </div>
              )}
              <Button
                onClick={handleAddSubject}
                className="self-end bg-mint text-forest hover:bg-mint/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-3 rounded-lg bg-forest-dark/30 hover:bg-forest-dark/40 transition-colors group"
              >
                <div className="flex items-center gap-6 flex-1">
                  <span className="text-white font-medium flex-1">{subject.subject}</span>
                  <div className="flex items-center gap-2 min-w-[200px]">
                    {subject.forward_type === 'selfcare' ? (
                      <span className="text-mint px-2 py-1 rounded-full bg-mint/10 text-sm">
                        Self-care Advice
                      </span>
                    ) : (
                      <span className="text-white/60 text-sm">→ {subject.forward_to}</span>
                    )}
                  </div>
                  {subject.forward_type === 'both' && (
                    <span className="text-mint px-2 py-1 rounded-full bg-mint/10 text-sm ml-2">
                      + Self-care
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(subject.id)}
                    className="text-mint hover:text-mint/80 hover:bg-mint/10"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => subject.id && handleRemoveSubject(subject.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-8 text-white/60">
              No subjects found. Add your first subject using the form above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Workflow;
