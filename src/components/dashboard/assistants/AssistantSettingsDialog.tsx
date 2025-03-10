
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TriageSettings } from "./settings/TriageSettings";
import { MedicationSettings } from "./settings/MedicationSettings";
import { ResearchSettings } from "./settings/ResearchSettings";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface AssistantSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assistantType: 'triage' | 'medication' | 'research';
  title: string;
}

export function AssistantSettingsDialog({ 
  open, 
  onOpenChange, 
  assistantType, 
  title 
}: AssistantSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      // Here we would save the settings to the database
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // In a production app, we would save the actual settings here
        // For this demo, we'll just show a success message
        
        toast({
          title: "Instellingen opgeslagen",
          description: "De instellingen zijn succesvol bijgewerkt.",
        });
        
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Fout bij opslaan",
        description: "Er is een fout opgetreden bij het opslaan van de instellingen.",
        variant: "destructive",
      });
    }
  };

  const renderSettingsComponent = () => {
    switch (assistantType) {
      case 'triage':
        return <TriageSettings onSettingChange={handleSettingChange} />;
      case 'medication':
        return <MedicationSettings onSettingChange={handleSettingChange} />;
      case 'research':
        return <ResearchSettings onSettingChange={handleSettingChange} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{title} Instellingen</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">Algemeen</TabsTrigger>
            <TabsTrigger value="behavior">Gedrag</TabsTrigger>
            <TabsTrigger value="schedule">Schema</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            {renderSettingsComponent()}
          </TabsContent>
          
          <TabsContent value="behavior">
            <div className="space-y-4">
              <h3 className="text-md font-medium">Gespreksparameters</h3>
              <p className="text-sm text-gray">
                Deze instellingen bepalen hoe de assistent reageert tijdens gesprekken.
              </p>
              {/* More behavior settings would go here */}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="space-y-4">
              <h3 className="text-md font-medium">Beschikbaarheid</h3>
              <p className="text-sm text-gray">
                Bepaal wanneer deze assistent beschikbaar is voor gesprekken.
              </p>
              {/* Schedule settings would go here */}
            </div>
          </TabsContent>
        </Tabs>
        
        {hasChanges && (
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => {
                setHasChanges(false);
                onOpenChange(false);
              }}
              variant="outline"
              className="mr-2"
            >
              Annuleren
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-mint text-forest hover:bg-mint-light flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Wijzigingen opslaan
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
