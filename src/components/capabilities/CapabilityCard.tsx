import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CapabilityCardProps {
  title: string;
  description: string;
  illustration: ReactNode;
  isActive?: boolean;
}

const CapabilityCard = ({ title, description, illustration, isActive = false }: CapabilityCardProps) => {
  return (
    <div className="group h-full">
      <motion.div 
        className={`relative h-full p-6 rounded-xl border transition-all duration-300 ${
          isActive 
            ? "bg-white border-mint/20 shadow-lg" 
            : "bg-white/80 border-gray-muted/50 hover:bg-white hover:border-mint/20 hover:shadow-lg"
        }`}
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: isActive ? 1 : 0.8,
          scale: isActive ? 1.02 : 1
        }}
        whileHover={{ 
          opacity: 1,
          scale: 1.02
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Connection dots */}
        <div className={`absolute -left-2 top-1/2 w-4 h-4 rounded-full transition-colors duration-300 ${
          isActive ? "bg-mint/10" : "bg-mint/5"
        }`} />
        <div className={`absolute -right-2 top-1/2 w-4 h-4 rounded-full transition-colors duration-300 ${
          isActive ? "bg-blue/10" : "bg-blue/5"
        }`} />
        
        {/* Enhanced content */}
        <div className="relative z-10">
          {illustration}
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
            isActive ? "text-mint" : "text-gray-dark group-hover:text-mint"
          }`}>
            {title}
          </h3>
          <p className={`text-gray transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
          }`}>
            {description}
          </p>
        </div>

        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-20 h-20 bg-gradient-to-br from-mint/10 to-blue/10 rounded-tl-3xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default CapabilityCard;