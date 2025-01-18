import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  name: string;
  forwardTo: string;
}

const Workflow = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "Vaccinations", forwardTo: "GGZ, GGD, vaccinatiecentrum of bedrijfsarts" },
    { name: "Tandheelkundige problemen", forwardTo: "Tandarts of tandarts-spoeddienst" },
    { name: "Psychische aandoeningen", forwardTo: "GGZ-instelling of psychiater" },
  ]);
  const [newSubject, setNewSubject] = useState({ name: "", forwardTo: "" });

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.forwardTo) {
      toast({
        title: "Missing information",
        description: "Please fill in both the subject and forward to fields",
        variant: "destructive",
      });
      return;
    }
    setSubjects([...subjects, newSubject]);
    setNewSubject({ name: "", forwardTo: "" });
    toast({
      title: "Subject added",
      description: "The new subject has been added to the workflow",
    });
  };

  const handleRemoveSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    toast({
      title: "Subject removed",
      description: "The subject has been removed from the workflow",
    });
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
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-mint" />
              Care Demand Suitable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 p-4 rounded-lg bg-forest-dark/30">
              <div className="flex items-center gap-4 text-white/90 border-l-4 border-red-500 pl-4">
                <span className="font-semibold">U1</span>
                <span className="text-sm">→</span>
                <span>Advice to call 112 directly</span>
              </div>
              <div className="flex items-center gap-4 text-white/90 border-l-4 border-orange-500 pl-4">
                <span className="font-semibold">U2, U3, U4</span>
                <span className="text-sm">→</span>
                <span>Forward to Doctor's Assistant directly</span>
              </div>
              <div className="flex items-center gap-4 text-white/90 border-l-4 border-green-500 pl-4">
                <span className="font-semibold">U5</span>
                <span className="text-sm">→</span>
                <span>Provide selfcare advice</span>
              </div>
            </div>
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
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-forest-dark/30"
                >
                  <div className="grid gap-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{subject.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSubject(index)}
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