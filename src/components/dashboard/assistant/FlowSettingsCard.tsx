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
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-dark flex items-center gap-2">
          <ArrowUp className="w-5 h-5 text-blue-dark" />
          Flow Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-gray-dark font-medium">Trigger Conditions</Label>
          <RadioGroup defaultValue="direct" onValueChange={onSettingChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="direct" id="direct" />
              <Label htmlFor="direct" className="text-gray">Answer calls directly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="queue" id="queue" />
              <Label htmlFor="queue" className="text-gray">Answer when queue exceeds</Label>
              <Input 
                type="number" 
                className="w-20 ml-2 bg-white border-gray-muted" 
                placeholder="2"
                onChange={onSettingChange}
              />
              <span className="text-gray">callers</span>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};