import { WorkflowHeader } from "@/components/dashboard/workflow/WorkflowHeader";
import { WorkflowContainer } from "@/components/dashboard/workflow/WorkflowContainer";
import { LiveStatusCard } from "@/components/dashboard/assistant/LiveStatusCard";
import { AssistantSettingsCard } from "@/components/dashboard/assistant/AssistantSettingsCard";

export function Workflow() {
  return (
    <div className="content-spacing">
      <WorkflowHeader />
      <LiveStatusCard />
      <WorkflowContainer />
      <AssistantSettingsCard onSettingChange={() => {}} />
    </div>
  );
}

export default Workflow;