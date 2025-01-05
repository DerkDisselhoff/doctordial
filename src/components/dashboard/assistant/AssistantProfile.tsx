import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, User } from "lucide-react";

export function AssistantProfile() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-forest">Assistant Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-full bg-mint/10 flex items-center justify-center">
            <User className="h-6 w-6 text-mint" />
          </div>
          <div>
            <h3 className="font-medium text-forest">Sarah</h3>
            <p className="text-sm text-gray-500">Professional Medical Assistant</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mic className="h-4 w-4 text-mint" />
            <div>
              <p className="text-sm font-medium text-forest">Voice Profile</p>
              <p className="text-sm text-gray-500">Female, Professional, Clear Pronunciation</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-forest">Language</p>
            <p className="text-sm text-gray-500">Dutch (Primary), English (Secondary)</p>
          </div>

          <div>
            <p className="text-sm font-medium text-forest">Personality</p>
            <p className="text-sm text-gray-500">Professional, empathetic, and patient-focused</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}