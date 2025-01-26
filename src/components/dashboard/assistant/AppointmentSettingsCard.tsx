import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "lucide-react";

interface AppointmentSettingsCardProps {
  onSettingChange: () => void;
}

export const AppointmentSettingsCard = ({ onSettingChange }: AppointmentSettingsCardProps) => {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-mint" />
          Appointment Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-white font-medium">Allowed Appointment Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                className="data-[state=checked]:bg-mint data-[state=checked]:border-mint/20 bg-forest-light/50 border-mint/20 hover:bg-mint/10" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-white/70">Regular Consultations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="data-[state=checked]:bg-mint data-[state=checked]:border-mint/20 bg-forest-light/50 border-mint/20 hover:bg-mint/10" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-white/70">Vaccinations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="data-[state=checked]:bg-mint data-[state=checked]:border-mint/20 bg-forest-light/50 border-mint/20 hover:bg-mint/10" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-white/70">Follow-up Appointments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="data-[state=checked]:bg-mint data-[state=checked]:border-mint/20 bg-forest-light/50 border-mint/20 hover:bg-mint/10" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-white/70">Blood Tests</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};