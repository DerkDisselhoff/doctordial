import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Assistant = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-forest">AI Assistant Settings</h1>
      
      {/* Profile Card */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Assistant Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label>Voice</Label>
            <div className="text-sm text-gray-600">
              Sarah (Female) - Professional medical receptionist voice with a warm and caring tone
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Personality</Label>
            <div className="text-sm text-gray-600">
              Professional, empathetic, and efficient. Trained to handle medical inquiries with care while maintaining a friendly demeanor.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Verification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Patient Identity Verification</Label>
              <div className="text-sm text-gray-600">
                Verify name and date of birth for each caller
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Urgency Assessment</Label>
              <div className="text-sm text-gray-600">
                Evaluate call urgency based on symptoms
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Medical Knowledge Base */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Medical Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Training Data Sources</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>NHG Guidelines (2024 Edition)</li>
              <li>Emergency Triage Protocols</li>
              <li>Common Medical Conditions Database</li>
              <li>Practice-Specific Protocols</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Specializations</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>General Practice Triage</li>
              <li>Appointment Scheduling</li>
              <li>Medical Emergency Assessment</li>
              <li>Patient Information Management</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Example Interactions */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Example Interactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Identity Verification</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="text-mint mb-2">Assistant:</p>
                "Welcome to Dr. Smith's practice. Could you please confirm your full name and date of birth for verification?"
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Urgency Assessment</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="text-mint mb-2">Assistant:</p>
                "I understand you're experiencing chest pain. Could you tell me when this started and if you have any other symptoms? This will help me assess the urgency of your situation."
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Appointment Scheduling</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="text-mint mb-2">Assistant:</p>
                "Based on your symptoms, I recommend scheduling an appointment for today. I see there's an available slot at 14:30. Would that work for you?"
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;