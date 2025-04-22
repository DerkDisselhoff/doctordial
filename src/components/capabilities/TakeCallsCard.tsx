
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 border border-mint/20 rounded-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-dark">EHR</div>
                  <div className="text-sm text-gray-dark">System</div>
                </div>
              </div>
            </div>
            
            {/* Integration Pattern */}
            <motion.div
              className="absolute -inset-4 border border-mint/20 rounded-md"
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
        </div>

        {/* Integration Points */}
        <div className="absolute inset-0">
          {/* API Node */}
          <motion.div
            className="absolute left-[30%] top-[30%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-mint/10 p-1.5 rounded-full">
              <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center text-mint text-sm font-medium">
                API
              </div>
            </div>
          </motion.div>

          {/* HIS Node */}
          <motion.div
            className="absolute right-[30%] top-[25%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="bg-blue/10 p-1.5 rounded-full">
              <div className="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center text-blue-dark text-sm font-medium">
                HIS
              </div>
            </div>
          </motion.div>

          {/* EPD Node */}
          <motion.div
            className="absolute left-[45%] bottom-[22%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="bg-mint/10 p-1.5 rounded-full">
              <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center text-mint text-sm font-medium">
                EPD
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TakeCallsCard;
