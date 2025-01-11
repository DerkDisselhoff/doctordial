import { useState } from "react";

type FlowNode = {
  id: string;
  title: string;
  subtitle?: string;
  type: "circle" | "rectangle";
};

type FlowConnection = {
  from: string;
  to: string;
  label?: string;
  direction: "horizontal" | "vertical";
};

const nodes: FlowNode[] = [
  { id: "call", title: "Incoming patient call", type: "circle" },
  { id: "ai", title: "AI Agent", subtitle: "DoctorDial", type: "circle" },
  { id: "assistant", title: "Your practice", subtitle: "Doctor's Assistent", type: "circle" },
  { id: "his", title: "Your practice", subtitle: "HIS system", type: "circle" },
  { id: "triage", title: "Triage", type: "rectangle" },
  { id: "scheduler", title: "Appointment scheduler", type: "rectangle" },
  { id: "callback", title: "Advise to call back later", subtitle: "and wait for symptoms to change", type: "rectangle" },
];

const connections: FlowConnection[] = [
  { from: "call", to: "ai", label: "Direct", direction: "horizontal" },
  { from: "call", to: "ai", label: "Queing", direction: "vertical" },
  { from: "ai", to: "triage", direction: "horizontal" },
  { from: "triage", to: "assistant", label: "U1/U2", direction: "vertical" },
  { from: "triage", to: "scheduler", label: "U3/U4", direction: "horizontal" },
  { from: "triage", to: "callback", label: "U5", direction: "vertical" },
  { from: "scheduler", to: "his", direction: "horizontal" },
];

export const ProcessFlow = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeStyle = (node: FlowNode) => {
    const isHovered = hoveredNode === node.id;
    const baseStyle = "transition-all duration-300 ease-in-out transform";
    const hoverStyle = isHovered ? "scale-105" : "";
    
    if (node.type === "circle") {
      return `${baseStyle} ${hoverStyle} w-40 h-40 rounded-full bg-forest-light border-2 border-mint/20 
              flex flex-col items-center justify-center p-4 text-center`;
    }
    return `${baseStyle} ${hoverStyle} w-48 h-32 border-2 border-mint/20 
            flex flex-col items-center justify-center p-4 text-center`;
  };

  const getConnectionStyle = (connection: FlowConnection) => {
    const isHighlighted = hoveredNode && 
      (connection.from === hoveredNode || connection.to === hoveredNode);
    
    return `transition-all duration-300 ${isHighlighted ? 'text-mint' : 'text-white/60'}`;
  };

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
        
        <div className="relative max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={getNodeStyle(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <h3 className="text-white font-medium mb-1">{node.title}</h3>
                {node.subtitle && (
                  <p className="text-white/70 text-sm">{node.subtitle}</p>
                )}
              </div>
            ))}
          </div>

          {/* Connections */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
            style={{ minHeight: '600px' }}
          >
            {connections.map((connection, index) => {
              const fromNode = document.getElementById(connection.from);
              const toNode = document.getElementById(connection.to);
              
              if (!fromNode || !toNode) return null;

              const fromRect = fromNode.getBoundingClientRect();
              const toRect = toNode.getBoundingClientRect();

              const startX = fromRect.x + fromRect.width / 2;
              const startY = fromRect.y + fromRect.height / 2;
              const endX = toRect.x + toRect.width / 2;
              const endY = toRect.y + toRect.height / 2;

              return (
                <g key={index} className={getConnectionStyle(connection)}>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="currentColor"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  {connection.label && (
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 10}
                      textAnchor="middle"
                      className="text-sm fill-current"
                    >
                      {connection.label}
                    </text>
                  )}
                </g>
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  className="fill-current"
                />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};