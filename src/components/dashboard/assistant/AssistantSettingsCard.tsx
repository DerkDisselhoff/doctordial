import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { AvailabilitySettingsCard } from "./AvailabilitySettingsCard";
import { IdentitySettingsCard } from "./IdentitySettingsCard";
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
        <IdentitySettingsCard onSettingChange={onSettingChange} />
        <AvailabilitySettingsCard onSettingChange={onSettingChange} />
        <GreetingSettingsCard onSettingChange={onSettingChange} />
        <VoiceSettingsCard onSettingChange={onSettingChange} />
      </CardContent>
    </Card>
  );
};