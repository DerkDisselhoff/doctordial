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
        {/* Urgency Level Badges in Horizontal Layout */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* U1 Badge */}
          <motion.div
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

          {/* U2 Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 text-xs font-medium">
                U2
              </div>
            </div>
          </motion.div>

          {/* U3 Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500 text-xs font-medium">
                U3
              </div>
            </div>
          </motion.div>

          {/* U4 Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-green-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 text-xs font-medium">
                U4
              </div>
            </div>
          </motion.div>

          {/* U5 Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 text-xs font-medium">
                U5
              </div>
            </div>
          </motion.div>
        </div>

        {/* Medical Icons */}
        <motion.div 
          className="absolute left-[5%] top-[50%] -translate-y-1/2 text-mint"
          animate={{ 
            y: [-5, 5, -5]
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
          className="absolute right-[5%] top-[50%] -translate-y-1/2 text-mint"
          animate={{ 
            y: [5, -5, 5]
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
          className="absolute left-1/2 bottom-[2%] -translate-x-1/2 text-mint"
          animate={{ 
            y: [-3, 3, -3]
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
      </motion.div>
    </div>
  );
};

export default MedicalIntelligenceCard;