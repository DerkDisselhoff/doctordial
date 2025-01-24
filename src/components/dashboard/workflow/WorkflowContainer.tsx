import React from 'react';

interface WorkflowContainerProps {
  children: React.ReactNode;
}

export function WorkflowContainer({ children }: WorkflowContainerProps) {
  return (
    <div className="section-spacing">
      {children}
      <div className="content-spacing">
        {/* This div wraps the workflow content with proper spacing */}
      </div>
    </div>
  );
}