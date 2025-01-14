import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";

interface AvailabilitySettingsCardProps {
  onSettingChange: () => void;
}

export const AvailabilitySettingsCard = ({ onSettingChange }: AvailabilitySettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-mint" />
          Availability Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-white font-medium">Active Outside Work Hours</Label>
            <p className="text-white/70">Enable AI assistant during non-business hours</p>
          </div>
          <Switch 
            className="bg-mint/20 data-[state=checked]:bg-mint data-[state=checked]:border-mint hover:bg-mint/30" 
            onCheckedChange={onSettingChange} 
          />
        </div>
      </CardContent>
    </Card>
  );
};