import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { LiveStatusCard } from "@/components/dashboard/assistant/LiveStatusCard";
import { AssistantSettingsCard } from "@/components/dashboard/assistant/AssistantSettingsCard";

const Assistant = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your AI assistant settings have been updated successfully.",
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 p-8 relative pb-20">
      <h1 className="text-3xl font-semibold text-white">AI Assistant Settings</h1>
      
      <LiveStatusCard 
        isLive={isLive}
        onStatusChange={setIsLive}
      />
      
      <AssistantSettingsCard onSettingChange={handleSettingChange} />

      {hasChanges && (
        <div className="fixed bottom-8 right-8 flex gap-2 z-50">
          <Button
            onClick={() => setHasChanges(false)}
            variant="outline"
            className="bg-forest text-white hover:bg-forest-light"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-mint text-forest hover:bg-mint-light flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Assistant;