
import { motion } from "framer-motion";

const TakeCallsCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central EHR Integration Visualization */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <img
            src="/lovable-uploads/system-integrations.png"
            alt="EHR System Integration"
            className="w-full h-full object-cover rounded-full border-2 border-mint/20"
          />
          {/* Integration Pattern */}
          <motion.div
            className="absolute -inset-8 border border-mint/20"
            style={{
              background: "radial-gradient(circle at center, transparent 50%, rgba(16, 185, 129, 0.05) 80%)",
            }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.2)",
                "0 0 0 10px rgba(16, 185, 129, 0)",
                "0 0 0 0 rgba(16, 185, 129, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Integration Points */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-[20%] top-[30%]"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
          >
            <div className="bg-mint/10 p-1.5 rounded-full">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center text-mint text-xs font-medium">
                HIS
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-[25%] top-[40%]"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
          >
            <div className="bg-blue/10 p-1.5 rounded-full">
              <div className="w-6 h-6 bg-blue/20 rounded-full flex items-center justify-center text-blue-dark text-xs font-medium">
                EPD
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-[30%] bottom-[35%]"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, delay: 2.2, repeat: Infinity, repeatDelay: 1 }}
          >
            <div className="bg-mint/10 p-1.5 rounded-full">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center text-mint text-xs font-medium">
                API
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TakeCallsCard;
