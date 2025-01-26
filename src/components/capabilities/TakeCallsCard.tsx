import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const TakeCallsCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central Phone Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-mint" />
            </div>
            
            {/* Pulsing Ring */}
            <motion.div
              className="absolute -inset-4 border-2 border-mint/20 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Call Status Indicators */}
        <div className="absolute inset-0">
          {[
            { text: "Active", color: "mint", delay: 0 },
            { text: "Connected", color: "blue-dark", delay: 1 },
            { text: "24/7", color: "mint", delay: 2 }
          ].map((status, i) => (
            <motion.div
              key={i}
              className={`absolute ${i === 0 ? 'left-[20%] top-[30%]' : i === 1 ? 'right-[25%] top-[40%]' : 'left-[30%] bottom-[35%]'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: status.delay,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <div className={`bg-${status.color}/10 px-3 py-1 rounded-full`}>
                <span className={`text-${status.color} text-sm font-medium`}>
                  {status.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TakeCallsCard;