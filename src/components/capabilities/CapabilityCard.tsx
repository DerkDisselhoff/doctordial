import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CapabilityCardProps {
  title: string;
  description: string;
  illustration: ReactNode;
}

const CapabilityCard = ({ title, description, illustration }: CapabilityCardProps) => {
  return (
    <div className="group h-full">
      <div className="relative h-full p-6 bg-white rounded-xl border border-gray-muted shadow-sm transition-all duration-300 hover:shadow-xl hover:border-mint/20">
        {/* Connection dots */}
        <div className="absolute -left-2 top-1/2 w-4 h-4 bg-mint/10 rounded-full" />
        <div className="absolute -right-2 top-1/2 w-4 h-4 bg-blue/10 rounded-full" />
        
        {/* Enhanced content */}
        <div className="relative z-10">
          {illustration}
          <h3 className="text-xl font-semibold mb-3 text-gray-dark group-hover:text-mint transition-colors">
            {title}
          </h3>
          <p className="text-gray">
            {description}
          </p>
        </div>

        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-20 h-20 bg-gradient-to-br from-mint/10 to-blue/10 rounded-tl-3xl" />
        </div>
      </div>
    </div>
  );
};

export default CapabilityCard;