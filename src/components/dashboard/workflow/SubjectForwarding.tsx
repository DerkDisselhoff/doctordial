import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GitBranch, Plus, Trash2, Save, Edit2 } from "lucide-react";
import { Subject } from "@/integrations/supabase/types/tables";

interface Props {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id' | 'profile_id'>) => void;
  onUpdateSubject: (id: string, subject: Omit<Subject, 'id' | 'profile_id'>) => void;
  onRemoveSubject: (id: string) => void;
}

export function SubjectForwarding({ 
  subjects, 
  onAddSubject, 
  onUpdateSubject, 
  onRemoveSubject 
}: Props) {
  const [newSubject, setNewSubject] = useState({ subject: "", forward_to: "" });
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{ subject: string; forward_to: string }>({
    subject: "",
    forward_to: ""
  });

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject.id || null);
    setEditedValues({
      subject: subject.subject,
      forward_to: subject.forward_to
    });
  };

  const handleSaveEdit = (id: string) => {
    onUpdateSubject(id, editedValues);
    setEditingSubject(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-dark" />
          <CardTitle className="text-gray-dark">Subject Forwarding Rules</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg border border-gray-muted/20 bg-gray-muted/5">
          <div className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
            <div className="space-y-2">
              <Label className="text-gray-dark">Subject</Label>
              <Input
                placeholder="Enter subject"
                value={newSubject.subject}
                onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                className="bg-white border-gray-muted"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-dark">Forward To</Label>
              <Input
                placeholder="Enter destination"
                value={newSubject.forward_to}
                onChange={(e) => setNewSubject({ ...newSubject, forward_to: e.target.value })}
                className="bg-white border-gray-muted"
              />
            </div>
            <Button
              onClick={() => {
                onAddSubject(newSubject);
                setNewSubject({ subject: "", forward_to: "" });
              }}
              className="self-end"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-4 rounded-lg border border-gray-muted/20 bg-gray-muted/5"
            >
              {editingSubject === subject.id ? (
                <div className="flex items-center gap-4">
                  <Input
                    value={editedValues.subject}
                    onChange={(e) => setEditedValues({ ...editedValues, subject: e.target.value })}
                    className="bg-white border-gray-muted flex-1"
                  />
                  <span className="text-blue-dark">→</span>
                  <Input
                    value={editedValues.forward_to}
                    onChange={(e) => setEditedValues({ ...editedValues, forward_to: e.target.value })}
                    className="bg-white border-gray-muted flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => subject.id && handleSaveEdit(subject.id)}
                    className="text-blue-dark hover:text-blue-dark/80"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-dark">{subject.subject}</span>
                    <span className="text-blue-dark">→</span>
                    <span className="text-gray">{subject.forward_to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSubject(subject)}
                      className="text-blue-dark hover:text-blue-dark/80"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => subject.id && onRemoveSubject(subject.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}