import { WorkflowHeader } from "@/components/dashboard/workflow/WorkflowHeader";
import { WorkflowContainer } from "@/components/dashboard/workflow/WorkflowContainer";
import { LiveStatusCard } from "@/components/dashboard/assistant/LiveStatusCard";
import { AssistantSettingsCard } from "@/components/dashboard/assistant/AssistantSettingsCard";

export function Workflow() {
  return (
    <div className="p-8 space-y-8">
      <WorkflowHeader />
      <div className="space-y-8">
        <LiveStatusCard />
        <WorkflowContainer />
        <AssistantSettingsCard onSettingChange={() => {}} />
      </div>
    </div>
  );
}

export default Workflow;