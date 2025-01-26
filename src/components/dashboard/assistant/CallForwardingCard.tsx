import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PhoneForwarded } from "lucide-react";

interface CallForwardingCardProps {
  onSettingChange: () => void;
}

export const CallForwardingCard = ({ onSettingChange }: CallForwardingCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PhoneForwarded className="w-5 h-5 text-mint" />
          Call Forwarding Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-4">
            <Label className="text-white font-medium">Doctor's Assistant Forwarding</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">Assistant Name</Label>
                <Input 
                  placeholder="Enter assistant name"
                  className="bg-forest border-mint/20"
                  onChange={onSettingChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Phone Number</Label>
                <Input 
                  placeholder="+31 20 123 4567"
                  className="bg-forest border-mint/20"
                  onChange={onSettingChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-white font-medium">General Practitioner Forwarding</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">GP Name</Label>
                <Input 
                  placeholder="Enter GP name"
                  className="bg-forest border-mint/20"
                  onChange={onSettingChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Phone Number</Label>
                <Input 
                  placeholder="+31 20 123 4567"
                  className="bg-forest border-mint/20"
                  onChange={onSettingChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-white font-medium">Forwarding Rules</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  className="bg-forest-light/50 hover:bg-mint/10 data-[state=checked]:bg-mint data-[state=checked]:hover:bg-mint/90" 
                  onCheckedChange={onSettingChange}
                />
                <Label className="text-white/70">Forward to Assistant first</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  className="bg-forest-light/50 hover:bg-mint/10 data-[state=checked]:bg-mint data-[state=checked]:hover:bg-mint/90" 
                  onCheckedChange={onSettingChange}
                />
                <Label className="text-white/70">Forward to GP for urgent cases</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};