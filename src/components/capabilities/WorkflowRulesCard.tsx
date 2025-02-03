
import { motion } from "framer-motion";

const WorkflowRulesCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central Medical Intelligence Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <div className="w-full h-full rounded-full border-2 border-mint/20 flex items-center justify-center bg-mint/5">
            <svg className="w-8 h-8 text-mint" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Rotating Ring */}
          <motion.div
            className="absolute -inset-4 border-2 border-mint/20 rounded-full"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Learning Feedback Points */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-[20%] top-[30%]"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
          >
            <div className="bg-mint/10 p-1.5 rounded-full">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center text-mint text-xs font-medium">
                +1
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
                +1
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
                +1
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkflowRulesCard;
