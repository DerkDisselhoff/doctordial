import HeroContent from "./hero/HeroContent";
import { Brain, Heart, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-mint-light/5">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.05),transparent_50%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-mint-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-light/10 rounded-full blur-3xl" />
      
      {/* Floating icons with subtle animations */}
      <div className="absolute top-1/3 left-20 text-mint/20 animate-float-slow">
        <Brain className="w-8 h-8" />
      </div>
      <div className="absolute top-1/4 right-32 text-blue-dark/20 animate-float-delayed">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-1/3 right-24 text-mint/20 animate-float">
        <Shield className="w-5 h-5" />
      </div>
      <div className="absolute bottom-1/4 left-32 text-blue-dark/20 animate-float-delayed">
        <Sparkles className="w-4 h-4" />
      </div>
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>

      {/* Graph database style background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="graph-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-gray-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#graph-pattern)" />
          {/* Connection lines */}
          <g className="text-gray-300">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="70%" y1="50%" x2="90%" y2="40%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="40%" y1="80%" x2="60%" y2="70%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="60%" y1="70%" x2="80%" y2="90%" stroke="currentColor" strokeWidth="0.5" />
          </g>
          {/* Nodes */}
          <g className="text-mint">
            <circle cx="10%" cy="20%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="30%" cy="40%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="50%" cy="30%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="70%" cy="50%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="90%" cy="40%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="20%" cy="60%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="40%" cy="80%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="60%" cy="70%" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="80%" cy="90%" r="4" fill="currentColor" opacity="0.3" />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;