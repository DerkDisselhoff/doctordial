import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Bot } from "lucide-react";

interface GreetingSettingsCardProps {
  onSettingChange: () => void;
}

export const GreetingSettingsCard = ({ onSettingChange }: GreetingSettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-mint" />
          Greeting Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white font-medium">Use Greeting Variations</Label>
            <Switch 
              className="bg-mint/20 data-[state=checked]:bg-mint data-[state=checked]:border-mint hover:bg-mint/30" 
              onCheckedChange={onSettingChange} 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white font-medium">Default Greeting</Label>
            <Input 
              placeholder="Welcome to [Practice Name], this is Sarah, how may I help you?"
              className="bg-forest border-mint/20"
              onChange={onSettingChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};