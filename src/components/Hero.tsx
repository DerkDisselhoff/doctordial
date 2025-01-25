import HeroContent from "./hero/HeroContent";
import { Brain, Heart, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-mint-light/5">
      {/* Enhanced background with multiple gradients - optimized for mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_40%)] md:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.03),transparent_40%)] md:bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.05),transparent_50%)]" />
      
      {/* Decorative elements - reduced size on mobile */}
      <div className="absolute top-20 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-mint-light/5 md:bg-mint-light/10 rounded-full blur-2xl md:blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-light/5 md:bg-blue-light/10 rounded-full blur-2xl md:blur-3xl" />
      
      {/* Floating icons with optimized animations for mobile */}
      <div className="absolute top-1/3 left-10 md:left-20 text-mint/20 motion-safe:animate-float-slow-mobile md:motion-safe:animate-float-slow">
        <Brain className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className="absolute top-1/4 right-16 md:right-32 text-blue-dark/20 motion-safe:animate-float-delayed-mobile md:motion-safe:animate-float-delayed">
        <Heart className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div className="absolute bottom-1/3 right-12 md:right-24 text-mint/20 motion-safe:animate-float-mobile md:motion-safe:animate-float">
        <Shield className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div className="absolute bottom-1/4 left-16 md:left-32 text-blue-dark/20 motion-safe:animate-float-delayed-mobile md:motion-safe:animate-float-delayed">
        <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
      </div>
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>

      {/* Healthcare Network Graph Background - optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10 md:opacity-20">
          <defs>
            <pattern id="healthcare-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" className="md:w-[100px] md:h-[100px]">
              {/* Medical cross pattern - smaller on mobile */}
              <path d="M35,30 h8 v-8 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 z" className="text-mint/30 md:d-[M45,40 h10 v-10 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 z]" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#healthcare-grid)" />
          
          {/* Network Connections - optimized for mobile */}
          <g className="text-mint/20">
            {/* Patient-Symptom Network - adjusted for mobile */}
            <circle cx="20%" cy="30%" r="4" className="md:r-8" fill="currentColor" />
            <circle cx="40%" cy="20%" r="3" className="md:r-6" fill="currentColor" />
            <circle cx="60%" cy="40%" r="3.5" className="md:r-7" fill="currentColor" />
            <circle cx="80%" cy="25%" r="2.5" className="md:r-5" fill="currentColor" />
            <circle cx="30%" cy="60%" r="3" className="md:r-6" fill="currentColor" />
            <circle cx="50%" cy="70%" r="4" className="md:r-8" fill="currentColor" />
            <circle cx="70%" cy="80%" r="3.5" className="md:r-7" fill="currentColor" />
            
            {/* Connection Lines - thinner on mobile */}
            <line x1="20%" y1="30%" x2="40%" y2="20%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="40%" y1="20%" x2="60%" y2="40%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="60%" y1="40%" x2="80%" y2="25%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="30%" y1="60%" x2="50%" y2="70%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="50%" y1="70%" x2="70%" y2="80%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="40%" y1="20%" x2="30%" y2="60%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
            <line x1="60%" y1="40%" x2="50%" y2="70%" strokeWidth="1" className="md:stroke-width-2" stroke="currentColor" />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;