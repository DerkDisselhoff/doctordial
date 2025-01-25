import { motion } from "framer-motion";
import { Stethoscope, Activity, Pill } from "lucide-react";

const MedicalIntelligenceCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central Doctor Assistant Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <img
            src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
            alt="Dr. Sarah - AI Medical Assistant"
            className="w-full h-full object-cover rounded-full border-2 border-mint/20"
          />
        </div>

        {/* Urgency Level Badges in Semi-circle */}
        <div className="absolute inset-0">
          {/* U1 Badge - Top */}
          <motion.div
            className="absolute left-1/2 top-[15%] -translate-x-1/2 flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-red-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500 text-xs font-medium">
                U1
              </div>
            </div>
          </motion.div>

          {/* U2 Badge - Top Right */}
          <motion.div
            className="absolute right-[25%] top-[30%] flex items-center"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 text-xs font-medium">
                U2
              </div>
            </div>
          </motion.div>

          {/* U3 Badge - Bottom Right */}
          <motion.div
            className="absolute right-[30%] bottom-[25%] flex items-center"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500 text-xs font-medium">
                U3
              </div>
            </div>
          </motion.div>

          {/* U4 Badge - Bottom Left */}
          <motion.div
            className="absolute left-[30%] bottom-[25%] flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-green-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 text-xs font-medium">
                U4
              </div>
            </div>
          </motion.div>

          {/* U5 Badge - Top Left */}
          <motion.div
            className="absolute left-[25%] top-[30%] flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 text-xs font-medium">
                U5
              </div>
            </div>
          </motion.div>

          {/* Medical Icons */}
          <motion.div 
            className="absolute left-[15%] top-[50%] -translate-y-1/2 text-mint"
            animate={{ 
              y: [-5, 5, -5],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Stethoscope className="w-6 h-6" />
          </motion.div>

          <motion.div 
            className="absolute right-[15%] top-[50%] -translate-y-1/2 text-mint"
            animate={{ 
              y: [5, -5, 5],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Activity className="w-6 h-6" />
          </motion.div>

          <motion.div 
            className="absolute left-1/2 bottom-[15%] -translate-x-1/2 text-mint"
            animate={{ 
              y: [-3, 3, -3],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Pill className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalIntelligenceCard;