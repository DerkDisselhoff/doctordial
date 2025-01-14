import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { LiveStatusCard } from "@/components/dashboard/assistant/LiveStatusCard";
import { FlowSettingsCard } from "@/components/dashboard/assistant/FlowSettingsCard";
import { AvailabilitySettingsCard } from "@/components/dashboard/assistant/AvailabilitySettingsCard";
import { IdentitySettingsCard } from "@/components/dashboard/assistant/IdentitySettingsCard";
import { GreetingSettingsCard } from "@/components/dashboard/assistant/GreetingSettingsCard";
import { AppointmentSettingsCard } from "@/components/dashboard/assistant/AppointmentSettingsCard";
import { CallForwardingCard } from "@/components/dashboard/assistant/CallForwardingCard";
import { VoiceSettingsCard } from "@/components/dashboard/assistant/VoiceSettingsCard";

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
      
      <FlowSettingsCard onSettingChange={handleSettingChange} />
      
      <AvailabilitySettingsCard onSettingChange={handleSettingChange} />
      
      <IdentitySettingsCard onSettingChange={handleSettingChange} />
      
      <GreetingSettingsCard onSettingChange={handleSettingChange} />
      
      <AppointmentSettingsCard onSettingChange={handleSettingChange} />
      
      <CallForwardingCard onSettingChange={handleSettingChange} />
      
      <VoiceSettingsCard onSettingChange={handleSettingChange} />

      {/* Floating Save Button */}
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