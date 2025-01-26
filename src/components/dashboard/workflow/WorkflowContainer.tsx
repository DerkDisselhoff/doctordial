import { UrgencyLevelForwarding } from "./UrgencyLevelForwarding";
import { SubjectForwarding } from "./SubjectForwarding";

export function WorkflowContainer() {
  return (
    <div className="space-y-8">
      <UrgencyLevelForwarding />
      <SubjectForwarding />
    </div>
  );
}