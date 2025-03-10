import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrgencyLevelForwarding } from "../../workflow/UrgencyLevelForwarding";
import { SubjectForwarding } from "../../workflow/SubjectForwarding";
import { useWorkflowSettings } from "../../workflow/hooks/useWorkflowSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface TriageSettingsProps {
  onSettingChange: () => void;
}

export function TriageSettings({ onSettingChange }: TriageSettingsProps) {
  const {
    subjects,
    setSubjects,
    urgencySettings,
    setUrgencySettings,
    loading,
  } = useWorkflowSettings();

  const handleUrgencySettingChange = (level: string, setting: any) => {
    const updatedSettings = urgencySettings.map(s => 
      s.urgency_level === level ? { ...s, ...setting } : s
    );
    setUrgencySettings(updatedSettings);
    onSettingChange();
  };

  const handleAddSubject = async (newSubject: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const subjectToAdd = {
        id: Date.now().toString(),
        profile_id: session.user.id,
        subject: newSubject.subject,
        forward_to: newSubject.forward_to
      };
      setSubjects([...subjects, subjectToAdd]);
      onSettingChange();
    }
  };

  const handleUpdateSubject = (id: string, updatedSubject: any) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, ...updatedSubject } : s
    ));
    onSettingChange();
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    onSettingChange();
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Triage instellingen</AlertTitle>
        <AlertDescription>
          Deze instellingen bepalen hoe de triage assistent omgaat met urgente gevallen en 
          specifieke onderwerpen. Pas deze aan op basis van jouw praktijk richtlijnen.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Urgentieniveau doorverwijzingen</CardTitle>
        </CardHeader>
        <CardContent>
          <UrgencyLevelForwarding 
            settings={urgencySettings}
            onSettingChange={handleUrgencySettingChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Onderwerp doorverwijzingen</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectForwarding
            subjects={subjects}
            onAddSubject={handleAddSubject}
            onUpdateSubject={handleUpdateSubject}
            onRemoveSubject={handleRemoveSubject}
          />
        </CardContent>
      </Card>
    </div>
  );
}
