import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const TrainSarahCard = () => {
  return (
    <div className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="p-3 rounded-lg bg-mint/10">
            <BookOpen className="w-8 h-8 text-mint" />
          </div>
          {/* Training Progress Indicators */}
          <motion.div 
            className="absolute -right-4 top-0"
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
            className="absolute -left-4 bottom-0"
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
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-dark mb-4">
            Train Sarah on the care that you provide
          </h3>
          <p className="text-lg text-gray leading-relaxed">
            Customize Sarah's knowledge base to align perfectly with your practice's specific medical services and protocols. Our AI system learns from your input to provide accurate, practice-specific responses and recommendations. This ensures that all patient interactions reflect your unique approach to healthcare delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainSarahCard;