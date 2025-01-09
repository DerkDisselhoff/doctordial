import { useLanguage } from "@/contexts/LanguageContext";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Phone, Calendar, Brain, Stethoscope, Clock, Hospital } from "lucide-react";

const initialNodes = [
  {
    id: 'incoming',
    type: 'input',
    data: { 
      label: 'Incoming Patient Call',
      icon: Phone,
    },
    position: { x: 0, y: 100 },
    className: 'process-node incoming'
  },
  {
    id: 'doctordial',
    data: { 
      label: 'AI Agent DoctorDial',
      icon: Brain,
    },
    position: { x: 250, y: 100 },
    className: 'process-node assistant'
  },
  {
    id: 'assistant',
    data: { 
      label: "Doctor's Assistant",
      icon: Stethoscope,
    },
    position: { x: 250, y: 0 },
    className: 'process-node assistant'
  },
  {
    id: 'triage',
    data: { 
      label: 'Triage',
      icon: Hospital,
    },
    position: { x: 500, y: 100 },
    className: 'process-node triage'
  },
  {
    id: 'scheduler',
    data: { 
      label: 'Appointment Scheduler',
      icon: Calendar,
    },
    position: { x: 750, y: 100 },
    className: 'process-node scheduler'
  },
  {
    id: 'his',
    data: { 
      label: 'HIS System',
      icon: Brain,
    },
    position: { x: 750, y: 0 },
    className: 'process-node his'
  },
  {
    id: 'callback',
    data: { 
      label: 'Advise to call back later',
      icon: Clock,
    },
    position: { x: 500, y: 200 },
    className: 'process-node callback'
  },
];

const initialEdges = [
  {
    id: 'incoming-doctordial',
    source: 'incoming',
    target: 'doctordial',
    animated: true,
    label: 'Direct',
    className: 'process-edge',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'doctordial-triage',
    source: 'doctordial',
    target: 'triage',
    animated: true,
    className: 'process-edge',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'triage-scheduler',
    source: 'triage',
    target: 'scheduler',
    animated: true,
    label: 'U3/U4',
    className: 'process-edge process-edge-u34',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'triage-callback',
    source: 'triage',
    target: 'callback',
    animated: true,
    label: 'U5',
    className: 'process-edge process-edge-u5',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'triage-assistant',
    source: 'triage',
    target: 'assistant',
    animated: true,
    label: 'U1/U2',
    className: 'process-edge process-edge-u12',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'scheduler-his',
    source: 'scheduler',
    target: 'his',
    animated: true,
    className: 'process-edge',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'his-scheduler',
    source: 'his',
    target: 'scheduler',
    animated: true,
    className: 'process-edge',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const ProcessOverview = () => {
  const { t } = useLanguage();
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            {t("process.title")}
          </h2>
          <p className="max-w-[700px] text-mint/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("process.subtitle")}
          </p>
        </div>
        <div className="mt-16 h-[500px] w-full border border-mint/20 rounded-xl bg-forest-light/5 shadow-xl">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            className="process-flow"
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
