
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicationSettings as MedicationSettingsComponent } from "@/components/dashboard/assistants/settings/MedicationSettings";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function MedicationSettingsPage() {
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Instellingen opgeslagen",
      description: "De medicatie instellingen zijn succesvol bijgewerkt.",
    });
    setHasChanges(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/dashboard/assistants")}
              className="h-8 w-8 text-gray"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold text-gray-dark">Medicatie Assistent Instellingen</h2>
          </div>
          <p className="text-gray">Beheer de instellingen en werkstroom van de Medicatie Assistent</p>
        </div>
      </div>

      <Card className="border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle>Medicatie Assistent Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <MedicationSettingsComponent onSettingChange={handleSettingChange} />
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

export default MedicationSettingsPage;
