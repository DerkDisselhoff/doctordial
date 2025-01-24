import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GitBranch, Plus, Trash2, Save, Edit2 } from "lucide-react";

interface Subject {
  id?: string;
  subject: string;
  forward_to: string;
}

interface Props {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onUpdateSubject: (id: string, subject: Omit<Subject, 'id'>) => void;
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
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-mint" />
          Subject Forwarding Externally Rules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 p-3 rounded-lg bg-forest-dark/30 mb-4">
          <div className="grid gap-3 md:grid-cols-[1fr,1fr,auto]">
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

        <div className="space-y-2">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between p-3 rounded-lg bg-forest-dark/30 hover:bg-forest-dark/40 transition-colors"
            >
              {editingSubject === subject.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editedValues.subject}
                    onChange={(e) => setEditedValues({ ...editedValues, subject: e.target.value })}
                    className="bg-forest border-mint/20 flex-1"
                  />
                  <span className="text-mint">→</span>
                  <Input
                    value={editedValues.forward_to}
                    onChange={(e) => setEditedValues({ ...editedValues, forward_to: e.target.value })}
                    className="bg-forest border-mint/20 flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => subject.id && handleSaveEdit(subject.id)}
                    className="text-mint hover:text-mint/80 hover:bg-mint/10"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{subject.subject}</span>
                    <span className="text-mint">→</span>
                    <span className="text-white/60">{subject.forward_to}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSubject(subject)}
                      className="text-mint hover:text-mint/80 hover:bg-mint/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => subject.id && onRemoveSubject(subject.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
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