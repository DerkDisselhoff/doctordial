import React from 'react';

interface WorkflowHeaderProps {
  title?: string;
  description?: string;
}

export function WorkflowHeader({ 
  title = "Workflow Configuration",
  description = "Configure how incoming calls are handled"
}: WorkflowHeaderProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-dark">{title}</h2>
      <p className="text-body-sm text-gray">{description}</p>
    </div>
  );
}