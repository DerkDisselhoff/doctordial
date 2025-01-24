import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "lucide-react";

interface AppointmentSettingsCardProps {
  onSettingChange: () => void;
}

export const AppointmentSettingsCard = ({ onSettingChange }: AppointmentSettingsCardProps) => {
  return (
    <Card className="bg-surface-secondary/50 border-primary/10">
      <CardHeader>
        <CardTitle className="text-text-primary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Appointment Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-text-primary font-medium">Allowed Appointment Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-text-secondary">Regular Consultations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-text-secondary">Vaccinations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-text-secondary">Follow-up Appointments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                className="bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:bg-primary/30" 
                onCheckedChange={onSettingChange} 
              />
              <Label className="text-text-secondary">Blood Tests</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};