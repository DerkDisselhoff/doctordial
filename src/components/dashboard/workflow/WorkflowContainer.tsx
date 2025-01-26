import { useState } from "react";
import { UrgencyLevelForwarding } from "./UrgencyLevelForwarding";
import { SubjectForwarding } from "./SubjectForwarding";
import { useWorkflowSettings } from "./hooks/useWorkflowSettings";

export function WorkflowContainer() {
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
  };

  const handleAddSubject = (newSubject: Omit<any, 'id'>) => {
    setSubjects([...subjects, { id: Date.now().toString(), ...newSubject }]);
  };

  const handleUpdateSubject = (id: string, updatedSubject: Omit<any, 'id'>) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, ...updatedSubject } : s
    ));
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
    </div>
  );
}