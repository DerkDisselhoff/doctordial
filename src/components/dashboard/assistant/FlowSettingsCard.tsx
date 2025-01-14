import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUp } from "lucide-react";

interface FlowSettingsCardProps {
  onSettingChange: () => void;
}

export const FlowSettingsCard = ({ onSettingChange }: FlowSettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUp className="w-5 h-5 text-mint" />
          Flow Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-white font-medium">Trigger Conditions</Label>
          <RadioGroup defaultValue="direct" onValueChange={onSettingChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="direct" id="direct" />
              <Label htmlFor="direct" className="text-white/70">Answer calls directly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="queue" id="queue" />
              <Label htmlFor="queue" className="text-white/70">Answer when queue exceeds</Label>
              <Input 
                type="number" 
                className="w-20 ml-2 bg-forest border-mint/20" 
                placeholder="2"
                onChange={onSettingChange}
              />
              <span className="text-white/70">callers</span>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};