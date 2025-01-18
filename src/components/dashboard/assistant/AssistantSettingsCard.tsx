import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { IdentitySettingsCard } from "./IdentitySettingsCard";
import { AvailabilitySettingsCard } from "./AvailabilitySettingsCard";
import { GreetingSettingsCard } from "./GreetingSettingsCard";
import { VoiceSettingsCard } from "./VoiceSettingsCard";

interface AssistantSettingsCardProps {
  onSettingChange: () => void;
}

export const AssistantSettingsCard = ({ onSettingChange }: AssistantSettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-mint" />
          Assistant Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-white font-medium">Identity Settings</h3>
            <IdentitySettingsCard onSettingChange={onSettingChange} />
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Availability Settings</h3>
            <AvailabilitySettingsCard onSettingChange={onSettingChange} />
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Greeting Settings</h3>
            <GreetingSettingsCard onSettingChange={onSettingChange} />
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Voice Settings</h3>
            <VoiceSettingsCard onSettingChange={onSettingChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};