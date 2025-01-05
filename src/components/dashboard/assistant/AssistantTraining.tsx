import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle } from "lucide-react";

export function AssistantTraining() {
  const trainingData = [
    "NHG Guidelines for General Practice",
    "Dutch Medical Triage System",
    "Emergency Response Protocols",
    "Common Medical Conditions",
    "Medication Information",
    "Patient Communication Best Practices"
  ];

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-forest">Medical Knowledge Base</CardTitle>
        <BookOpen className="h-5 w-5 text-mint" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainingData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-mint" />
              <span className="text-sm text-forest">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}