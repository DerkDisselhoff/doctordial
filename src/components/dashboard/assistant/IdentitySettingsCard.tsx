import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

interface IdentitySettingsCardProps {
  onSettingChange: () => void;
}

export const IdentitySettingsCard = ({ onSettingChange }: IdentitySettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-mint" />
          Identity Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">Assistant Name</Label>
            <Input 
              placeholder="Sarah" 
              className="bg-forest border-mint/20"
              onChange={onSettingChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white font-medium">Practice Phone Number</Label>
            <Select onValueChange={onSettingChange}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Select from active integrations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">+31 20 123 4567</SelectItem>
                <SelectItem value="2">+31 20 987 6543</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};