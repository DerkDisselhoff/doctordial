import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { LiveStatusCard } from "@/components/dashboard/assistant/LiveStatusCard";
import { AssistantSettingsCard } from "@/components/dashboard/assistant/AssistantSettingsCard";
import { UrgencyLevelForwarding } from "@/components/dashboard/workflow/UrgencyLevelForwarding";
import { SubjectForwarding } from "@/components/dashboard/workflow/SubjectForwarding";

type ForwardStep = "call_112" | "forward_to_assistant" | "provide_selfcare";
type AdviceType = "simple" | "extensive";

interface UrgencySettings {
  id?: string;
  profile_id: string;
  urgency_level: string;
  forward_step: ForwardStep;
  assistant_phone?: string;
  advice_type?: AdviceType;
}

interface Subject {
  id?: string;
  profile_id: string;
  subject: string;
  forward_to: string;
}

export function Workflow() {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [urgencySettings, setUrgencySettings] = useState<UrgencySettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

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
          forward_step: currentSetting.forward_step
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

  const handleAddSubject = async (newSubject: Omit<Subject, 'id' | 'profile_id'>) => {
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

  const handleUpdateSubject = async (id: string, updatedSubject: Omit<Subject, 'id' | 'profile_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('workflow_unsuitable_subjects')
        .update({
          subject: updatedSubject.subject,
          forward_to: updatedSubject.forward_to,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('profile_id', user.id);

      if (error) throw error;

      setSubjects(subjects.map(s => 
        s.id === id 
          ? { ...s, ...updatedSubject }
          : s
      ));
      
      toast({
        title: "Subject updated",
        description: "The subject has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating subject:', error);
      toast({
        title: "Error updating subject",
        description: "Failed to update the subject",
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
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Configuration</h2>
        <p className="text-body-sm text-white/60">Configure how incoming calls are handled</p>
      </div>

      <div className="content-spacing">
        <LiveStatusCard 
          isLive={isLive}
          onStatusChange={setIsLive}
        />

        <UrgencyLevelForwarding 
          settings={urgencySettings}
          onSettingChange={handleUrgencySettingChange}
        />

        <SubjectForwarding
          subjects={subjects}
          onAddSubject={handleAddSubject}
          onUpdateSubject={handleUpdateSubject}
          onRemoveSubject={handleRemoveSubject}
        />

        <AssistantSettingsCard onSettingChange={() => {}} />
      </div>
    </div>
  );
}

export default Workflow;
