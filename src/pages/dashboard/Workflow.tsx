
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriageSettings } from "@/components/dashboard/assistants/settings/TriageSettings";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Workflow() {
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Instellingen opgeslagen",
      description: "De triage instellingen zijn succesvol bijgewerkt.",
    });
    setHasChanges(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-dark">Triage Werkstroom</h2>
          <p className="text-gray">Beheer de werkstroom van de Triage Assistent</p>
        </div>
      </div>

      <Card className="border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle>Triage Assistent Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <TriageSettings onSettingChange={handleSettingChange} />
        </CardContent>
      </Card>

      {hasChanges && (
        <div className="fixed bottom-8 right-8 flex gap-2 z-50">
          <Button
            onClick={() => setHasChanges(false)}
            variant="outline"
            className="bg-white border-gray-muted text-gray-dark"
          >
            Annuleren
          </Button>
          <Button
            onClick={handleSave}
            className="bg-mint text-forest hover:bg-mint-light flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Wijzigingen opslaan
          </Button>
        </div>
      )}
    </div>
  );
}

export default Workflow;
