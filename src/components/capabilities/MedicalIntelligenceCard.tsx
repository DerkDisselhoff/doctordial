import { motion } from "framer-motion";

const MedicalIntelligenceCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central Doctor Assistant Image with Hexagonal Training Pattern */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <img
            src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
            alt="Dr. Sarah - AI Medical Assistant"
            className="w-full h-full object-cover rounded-full border-2 border-mint/20"
          />
          {/* Hexagonal Pattern */}
          <motion.div
            className="absolute -inset-6 border border-mint/30"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Training Data Points */}
        <div className="absolute inset-0">
          {/* NHG Data Points with Staggered Fade */}
          <motion.div
            className="absolute left-[20%] top-[20%] flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-mint/5 p-2 rounded-lg">
              <div className="w-8 h-8 bg-mint/10 rounded-lg flex items-center justify-center text-mint text-xs font-medium">
                U1
              </div>
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-mint/20 to-transparent ml-2" />
          </motion.div>

          <motion.div
            className="absolute right-[20%] top-[30%] flex items-center flex-row-reverse"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="bg-blue/5 p-2 rounded-lg">
              <div className="w-8 h-8 bg-blue/10 rounded-lg flex items-center justify-center text-blue-dark text-xs font-medium">
                U2
              </div>
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-l from-blue/20 to-transparent mr-2" />
          </motion.div>

          <motion.div
            className="absolute left-[25%] bottom-[25%] flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="bg-mint/5 p-2 rounded-lg">
              <div className="w-8 h-8 bg-mint/10 rounded-lg flex items-center justify-center text-mint text-xs font-medium">
                U3
              </div>
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-mint/20 to-transparent ml-2" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalIntelligenceCard;