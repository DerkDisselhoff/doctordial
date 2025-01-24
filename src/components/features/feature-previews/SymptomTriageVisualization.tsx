import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  AlertTriangle, 
  Activity, 
  Users, 
  Filter, 
  ChevronDown,
  Circle,
  Square,
  Diamond
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mockup data
const mockupData = {
  patients: [
    { id: 1, name: "John Doe", age: 35, gender: "M", symptoms: [1, 3] },
    { id: 2, name: "Jane Smith", age: 28, gender: "F", symptoms: [2, 4] },
    { id: 3, name: "Alice Brown", age: 42, gender: "F", symptoms: [1, 5] },
    { id: 4, name: "Robert Chen", age: 55, gender: "M", symptoms: [3, 6] },
  ],
  symptoms: [
    { id: 1, name: "Chest Pain", severity: "High", triageLevel: "Emergent" },
    { id: 2, name: "Fever", severity: "Medium", triageLevel: "Urgent" },
    { id: 3, name: "Shortness of Breath", severity: "High", triageLevel: "Emergent" },
    { id: 4, name: "Headache", severity: "Low", triageLevel: "Non-Urgent" },
    { id: 5, name: "Abdominal Pain", severity: "Medium", triageLevel: "Urgent" },
    { id: 6, name: "Dizziness", severity: "Medium", triageLevel: "Urgent" },
  ],
  triageLevels: [
    { id: 1, name: "Emergent", color: "red" },
    { id: 2, name: "Urgent", color: "yellow" },
    { id: 3, name: "Non-Urgent", color: "green" },
  ],
};

export const SymptomTriageVisualization = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getTriageColor = (level: string) => {
    switch (level) {
      case "Emergent":
        return "from-red-500/20 to-red-600/30 border-red-500/30";
      case "Urgent":
        return "from-yellow-500/20 to-yellow-600/30 border-yellow-500/30";
      case "Non-Urgent":
        return "from-green-500/20 to-green-600/30 border-green-500/30";
      default:
        return "from-blue-500/20 to-blue-600/30 border-blue-500/30";
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            AI-Powered Symptom Analysis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Advanced triage visualization powered by machine learning algorithms
          </motion.p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>
              
              {["all", "emergent", "urgent", "non-urgent"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors",
                    selectedFilter === filter
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-600"
                  )}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Visualization Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-9"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[600px] relative overflow-hidden">
              {/* Visualization Canvas */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white">
                {/* Nodes */}
                <AnimatePresence>
                  {mockupData.symptoms.map((symptom, index) => (
                    <motion.div
                      key={symptom.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: 100 + Math.cos(index * Math.PI / 3) * 200,
                        y: 300 + Math.sin(index * Math.PI / 3) * 200
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1
                      }}
                      className={cn(
                        "absolute w-24 h-24 rounded-full bg-gradient-to-br border-2",
                        getTriageColor(symptom.triageLevel)
                      )}
                      onMouseEnter={() => setHoveredNode(symptom.name)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-center p-2">
                        <span className="text-sm font-medium text-gray-700">
                          {symptom.name}
                        </span>
                      </div>
                      
                      {/* Tooltip */}
                      {hoveredNode === symptom.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-10 w-48"
                        >
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 mb-1">{symptom.name}</div>
                            <div className="text-gray-500">Severity: {symptom.severity}</div>
                            <div className="text-gray-500">Triage: {symptom.triageLevel}</div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Animated Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                    </linearGradient>
                  </defs>
                  {mockupData.symptoms.map((symptom, index) => {
                    const x1 = 100 + Math.cos(index * Math.PI / 3) * 200;
                    const y1 = 300 + Math.sin(index * Math.PI / 3) * 200;
                    const x2 = 300; // Center point
                    const y2 = 300;
                    
                    return (
                      <motion.path
                        key={`line-${symptom.id}`}
                        d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 50} ${x2} ${y2}`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          {[
            { icon: Users, label: "Total Patients", value: "2,847" },
            { icon: Activity, label: "Avg. Triage Time", value: "3.2 min" },
            { icon: AlertTriangle, label: "Critical Cases", value: "12%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-blue-50">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};