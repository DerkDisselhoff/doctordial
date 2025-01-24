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
    <Card className="bg-surface-secondary/50 border-primary/10">
      <CardHeader>
        <CardTitle className="text-text-primary flex items-center gap-2">
          <PhoneForwarded className="w-5 h-5 text-primary" />
          Call Forwarding Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-4">
            <Label className="text-text-primary font-medium">Doctor's Assistant Forwarding</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-text-secondary">Assistant Name</Label>
                <Input 
                  placeholder="Enter assistant name"
                  className="bg-surface border-primary/20"
                  onChange={onSettingChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-text-secondary">Phone Number</Label>
                <Input 
                  placeholder="+31 20 123 4567"
                  className="bg-surface border-primary/20"
                  onChange={onSettingChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-text-primary font-medium">General Practitioner Forwarding</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-text-secondary">GP Name</Label>
                <Input 
                  placeholder="Enter GP name"
                  className="bg-surface border-primary/20"
                  onChange={onSettingChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-text-secondary">Phone Number</Label>
                <Input 
                  placeholder="+31 20 123 4567"
                  className="bg-surface border-primary/20"
                  onChange={onSettingChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-text-primary font-medium">Forwarding Rules</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                  onCheckedChange={onSettingChange}
                />
                <Label className="text-text-secondary">Forward to Assistant first</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                  onCheckedChange={onSettingChange}
                />
                <Label className="text-text-secondary">Forward to GP for urgent cases</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};