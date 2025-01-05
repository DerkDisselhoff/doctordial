import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Assistant = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-forest">AI Assistant Settings</h1>
      
      {/* Profile Card */}
      <Card className="bg-white border-mint/10">
        <CardHeader>
          <CardTitle className="text-forest">Assistant Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label className="text-forest font-medium">Voice</Label>
            <div className="text-sm text-forest/80">
              Sarah (Female) - Professional medical receptionist voice with a warm and caring tone
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-forest font-medium">Personality</Label>
            <div className="text-sm text-forest/80">
              Professional, empathetic, and efficient. Trained to handle medical inquiries with care while maintaining a friendly demeanor.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="bg-white border-mint/10">
        <CardHeader>
          <CardTitle className="text-forest">Verification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-1">
              <Label className="text-forest font-medium">Patient Identity Verification</Label>
              <div className="text-sm text-forest/80">
                Verify name and date of birth for each caller
              </div>
            </div>
            <Switch className="bg-mint/20" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-1">
              <Label className="text-forest font-medium">Urgency Assessment</Label>
              <div className="text-sm text-forest/80">
                Evaluate call urgency based on symptoms
              </div>
            </div>
            <Switch className="bg-mint/20" />
          </div>
        </CardContent>
      </Card>

      {/* Medical Knowledge Base */}
      <Card className="bg-white border-mint/10">
        <CardHeader>
          <CardTitle className="text-forest">Medical Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium text-forest">Training Data Sources</h3>
            <ul className="list-disc list-inside text-sm text-forest/80 space-y-2 ml-2">
              <li>NHG Guidelines (2024 Edition)</li>
              <li>Emergency Triage Protocols</li>
              <li>Common Medical Conditions Database</li>
              <li>Practice-Specific Protocols</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-forest">Specializations</h3>
            <ul className="list-disc list-inside text-sm text-forest/80 space-y-2 ml-2">
              <li>General Practice Triage</li>
              <li>Appointment Scheduling</li>
              <li>Medical Emergency Assessment</li>
              <li>Patient Information Management</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Example Interactions */}
      <Card className="bg-white border-mint/10">
        <CardHeader>
          <CardTitle className="text-forest">Example Interactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium text-forest">Identity Verification</h3>
              <div className="bg-forest-light/5 p-4 rounded-lg border border-mint/10">
                <p className="text-mint font-medium mb-2">Assistant:</p>
                <p className="text-forest/80 text-sm">
                  "Welcome to Dr. Smith's practice. Could you please confirm your full name and date of birth for verification?"
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-forest">Urgency Assessment</h3>
              <div className="bg-forest-light/5 p-4 rounded-lg border border-mint/10">
                <p className="text-mint font-medium mb-2">Assistant:</p>
                <p className="text-forest/80 text-sm">
                  "I understand you're experiencing chest pain. Could you tell me when this started and if you have any other symptoms? This will help me assess the urgency of your situation."
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-forest">Appointment Scheduling</h3>
              <div className="bg-forest-light/5 p-4 rounded-lg border border-mint/10">
                <p className="text-mint font-medium mb-2">Assistant:</p>
                <p className="text-forest/80 text-sm">
                  "Based on your symptoms, I recommend scheduling an appointment for today. I see there's an available slot at 14:30. Would that work for you?"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;