import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssistantProfile } from "@/components/dashboard/assistant/AssistantProfile";
import { AssistantSettings } from "@/components/dashboard/assistant/AssistantSettings";
import { AssistantExamples } from "@/components/dashboard/assistant/AssistantExamples";
import { AssistantTraining } from "@/components/dashboard/assistant/AssistantTraining";

const Assistant = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-forest">AI Assistant</h2>
          <p className="text-gray-500 mt-1">
            Configure and learn about your virtual medical assistant
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AssistantProfile />
        <AssistantSettings />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AssistantTraining />
        <AssistantExamples />
      </div>
    </div>
  );
};

export default Assistant;