import { useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'call',
    type: 'input',
    data: { 
      label: 'Incoming patient call',
    },
    position: { x: 0, y: 100 },
    className: 'workflow-node workflow-start'
  },
  {
    id: 'ai',
    data: { 
      label: 'AI Agent',
      subtitle: 'DoctorDial'
    },
    position: { x: 250, y: 100 },
    className: 'workflow-node workflow-ai'
  },
  {
    id: 'triage',
    data: { 
      label: 'Smart Triage',
      subtitle: 'Urgency Detection'
    },
    position: { x: 500, y: 100 },
    className: 'workflow-node workflow-triage'
  },
  {
    id: 'urgent',
    data: { 
      label: 'Urgent Cases',
      subtitle: 'U1/U2',
      urgency: 'high'
    },
    position: { x: 750, y: 0 },
    className: 'workflow-node workflow-urgent'
  },
  {
    id: 'medium',
    data: { 
      label: 'Regular Cases',
      subtitle: 'U3/U4',
      urgency: 'medium'
    },
    position: { x: 750, y: 100 },
    className: 'workflow-node workflow-medium'
  },
  {
    id: 'low',
    data: { 
      label: 'Non-Urgent',
      subtitle: 'U5',
      urgency: 'low'
    },
    position: { x: 750, y: 200 },
    className: 'workflow-node workflow-low'
  },
  {
    id: 'practice',
    data: { 
      label: 'Your Practice',
      subtitle: 'HIS Integration'
    },
    position: { x: 1000, y: 100 },
    className: 'workflow-node workflow-end'
  },
];

const initialEdges = [
  { 
    id: 'call-ai', 
    source: 'call', 
    target: 'ai', 
    animated: true,
    className: 'workflow-edge'
  },
  { 
    id: 'ai-triage', 
    source: 'ai', 
    target: 'triage',
    animated: true,
    className: 'workflow-edge'
  },
  { 
    id: 'triage-urgent', 
    source: 'triage', 
    target: 'urgent',
    animated: true,
    className: 'workflow-edge workflow-edge-urgent'
  },
  { 
    id: 'triage-medium', 
    source: 'triage', 
    target: 'medium',
    animated: true,
    className: 'workflow-edge workflow-edge-medium'
  },
  { 
    id: 'triage-low', 
    source: 'triage', 
    target: 'low',
    animated: true,
    className: 'workflow-edge workflow-edge-low'
  },
  { 
    id: 'urgent-practice', 
    source: 'urgent', 
    target: 'practice',
    animated: true,
    className: 'workflow-edge workflow-edge-urgent'
  },
  { 
    id: 'medium-practice', 
    source: 'medium', 
    target: 'practice',
    animated: true,
    className: 'workflow-edge workflow-edge-medium'
  },
  { 
    id: 'low-practice', 
    source: 'low', 
    target: 'practice',
    animated: true,
    className: 'workflow-edge workflow-edge-low'
  },
];

export const ProcessFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="w-full py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            How DoctorDial Integrates With Your Practice
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our AI seamlessly plugs into your existing workflow, enhancing efficiency without disrupting your established processes.
          </p>
        </div>
        
        <div className="relative w-full h-[600px] bg-forest-light/50 rounded-xl border border-mint/10 backdrop-blur-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeMouseEnter={(_, node) => setHoveredNode(node.id)}
            onNodeMouseLeave={() => setHoveredNode(null)}
            fitView
            className="workflow-container"
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.data?.urgency) {
                  case 'high':
                    return '#ea384c';
                  case 'medium':
                    return '#F97316';
                  case 'low':
                    return '#0EA5E9';
                  default:
                    return '#64FFDA';
                }
              }}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};