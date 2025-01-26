import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

const TakeCallsCard = () => {
  return (
    <div className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="p-3 rounded-lg bg-mint/10">
            <PhoneCall className="w-8 h-8 text-mint" />
          </div>
          {/* Pulse Animation */}
          <motion.div
            className="absolute -inset-3 border-2 border-mint/20 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Call Status Indicators */}
          <motion.div
            className="absolute -right-2 -top-2"
            animate={{ 
              scale: [1, 0.9, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </motion.div>
          <motion.div
            className="absolute -left-2 -bottom-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-dark mb-4">
            Let Sarah take your calls
          </h3>
          <p className="text-lg text-gray leading-relaxed">
            Activate Sarah to handle patient calls 24/7, providing professional and consistent care communication while following your established protocols. Sarah manages routine inquiries, schedules appointments, and intelligently escalates urgent matters, ensuring your patients receive immediate attention while optimizing your practice's efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TakeCallsCard;