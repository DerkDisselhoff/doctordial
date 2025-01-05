import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AssistantSettings() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-forest">Assistant Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-forest">Verify Patient Identity</Label>
              <p className="text-sm text-gray-500">
                Confirm name and date of birth
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-forest">Urgency Assessment</Label>
              <p className="text-sm text-gray-500">
                Evaluate call urgency based on symptoms
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-forest">Appointment Scheduling</Label>
              <p className="text-sm text-gray-500">
                Allow assistant to schedule appointments
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-forest">Call Recording</Label>
              <p className="text-sm text-gray-500">
                Record calls for quality assurance
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}