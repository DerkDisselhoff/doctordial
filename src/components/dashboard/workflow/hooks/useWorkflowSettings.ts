import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

export type ForwardStep = "call_112" | "forward_to_assistant" | "provide_selfcare";
export type AdviceType = "simple" | "extensive";

export interface UrgencySettings {
  id?: string;
  profile_id: string;
  urgency_level: string;
  forward_step: ForwardStep;
  assistant_phone?: string;
  advice_type?: AdviceType;
}

export interface Subject {
  id?: string;
  profile_id: string;
  subject: string;
  forward_to: string;
}

export function useWorkflowSettings() {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [urgencySettings, setUrgencySettings] = useState<UrgencySettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

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

  useEffect(() => {
    fetchWorkflowSettings();
  }, []);

  return {
    subjects,
    setSubjects,
    urgencySettings,
    setUrgencySettings,
    loading,
    isLive,
    setIsLive
  };
}