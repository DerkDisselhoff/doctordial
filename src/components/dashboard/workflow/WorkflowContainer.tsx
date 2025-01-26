import React from 'react';

interface WorkflowContainerProps {
  children: React.ReactNode;
}

export function WorkflowContainer({ children }: WorkflowContainerProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}