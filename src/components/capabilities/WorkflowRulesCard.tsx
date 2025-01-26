import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";

const WorkflowRulesCard = () => {
  return (
    <div className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="p-3 rounded-lg bg-mint/10">
            <Settings2 className="w-8 h-8 text-mint" />
          </div>
          {/* Rotating Settings Ring */}
          <motion.div
            className="absolute -inset-3 border-2 border-dashed border-mint/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Workflow Connection Points */}
          <motion.div
            className="absolute -inset-6 border border-mint/20 rounded-full"
            style={{
              background: "radial-gradient(circle at center, transparent 50%, rgba(16, 185, 129, 0.05) 80%)",
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-dark mb-4">
            Build your workflow and forwarding rules
          </h3>
          <p className="text-lg text-gray leading-relaxed">
            Set up custom workflows and rules to ensure proper handling of different types of patient inquiries and urgency levels. Define specific protocols for various medical situations, establish escalation pathways, and customize response patterns based on your practice's requirements and standards of care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowRulesCard;