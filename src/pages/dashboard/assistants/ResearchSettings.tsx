
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResearchSettings as ResearchSettingsComponent } from "@/components/dashboard/assistants/settings/ResearchSettings";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ResearchSettingsPage() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data } = await supabase
            .from('assistant_status')
            .select('is_live')
            .eq('profile_id', session.user.id)
            .single();
          
          if (data) {
            setIsActive(data.is_live);
          }
        }
      } catch (error) {
        console.error("Error fetching assistant status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const handleStatusChange = async (status: boolean) => {
    // If trying to turn off the assistant, show confirmation dialog
    if (!status && isActive) {
      setShowConfirmDialog(true);
      return;
    }
    
    // If turning on or confirmation was accepted, proceed with the status change
    updateAssistantStatus(status);
  };
  
  const updateAssistantStatus = async (status: boolean) => {
    setIsActive(status);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('assistant_status')
          .update({ is_live: status })
          .eq('profile_id', session.user.id);

        if (error) throw error;

        toast({
          title: status ? "Assistent geactiveerd" : "Assistent gedeactiveerd",
          description: `De onderzoek assistent is nu ${status ? 'actief' : 'inactief'}.`,
          variant: status ? "default" : "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating assistant status:", error);
      toast({
        title: "Fout bij bijwerken",
        description: "Er is een fout opgetreden bij het bijwerken van de assistent status.",
        variant: "destructive",
      });
      setIsActive(!status); // Revert the state
    }
  };

  const handleSave = () => {
    toast({
      title: "Instellingen opgeslagen",
      description: "De onderzoek instellingen zijn succesvol bijgewerkt.",
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
            <h2 className="text-3xl font-bold text-gray-dark">Onderzoek Assistent Instellingen</h2>
          </div>
          <p className="text-gray">Beheer de instellingen en werkstroom van de Onderzoek Assistent</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${isActive ? 'text-mint-dark' : 'text-gray'}`}>
            {isActive ? 'Actief' : 'Inactief'}
          </span>
          <Switch 
            checked={isActive} 
            onCheckedChange={handleStatusChange} 
            className={`transition-all duration-300 border ${
              isActive 
                ? "bg-mint border-mint-dark data-[state=checked]:bg-mint/90 hover:bg-mint-dark" 
                : "bg-gray-muted border-gray-light hover:bg-gray-light/30"
            }`}
          />
        </div>
      </div>

      <Card className="border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle>Onderzoek Assistent Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <ResearchSettingsComponent onSettingChange={handleSettingChange} />
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
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-dark">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Assistent deactiveren?
            </DialogTitle>
            <DialogDescription className="text-gray">
              Weet je zeker dat je de onderzoek assistent wilt uitschakelen? 
              Dit zal alle geautomatiseerde gesprekken voor deze dienst stoppen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-muted text-gray-dark hover:bg-gray-50"
            >
              Annuleren
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowConfirmDialog(false);
                updateAssistantStatus(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Deactiveren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResearchSettingsPage;
