import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export function AssistantExamples() {
  const examples = [
    {
      scenario: "Identity Verification",
      assistant: "Good morning! Could you please confirm your name and date of birth?",
      patient: "Yes, I'm John Smith, born on May 15, 1980.",
      outcome: "Identity verified successfully"
    },
    {
      scenario: "Urgency Assessment",
      assistant: "Can you describe your symptoms and when they started?",
      patient: "I've had severe chest pain for the last hour.",
      outcome: "Classified as U1 - Immediate emergency response"
    },
    {
      scenario: "Appointment Scheduling",
      assistant: "Based on your symptoms, I recommend seeing a doctor. Would tomorrow at 10:00 work for you?",
      patient: "Yes, that would be perfect.",
      outcome: "Appointment scheduled successfully"
    }
  ];

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-forest">Example Interactions</CardTitle>
        <MessageSquare className="h-5 w-5 text-mint" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {examples.map((example, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-forest">{example.scenario}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-mint"><span className="font-medium">Assistant:</span> {example.assistant}</p>
                <p className="text-gray-600"><span className="font-medium">Patient:</span> {example.patient}</p>
                <p className="text-forest/80"><span className="font-medium">Outcome:</span> {example.outcome}</p>
              </div>
              {index < examples.length - 1 && (
                <div className="my-4 border-b border-gray-100" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}