import HeroContent from "./hero/HeroContent";
import { Brain, Heart, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint/40 via-blue-dark/30 to-mint-light/30" />
      
      {/* Sharper flowing gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(16,185,129,0.3)_0%,rgba(37,99,235,0.2)_40%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(37,99,235,0.25)_0%,rgba(16,185,129,0.15)_40%,transparent_80%)]" />
      </div>
      
      {/* Enhanced wave overlays with sharper edges */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(16,185,129,0.3) 0%,
                rgba(37,99,235,0.2) 35%,
                transparent 70%
              )
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(
                -45deg,
                rgba(37,99,235,0.25) 0%,
                rgba(16,185,129,0.2) 40%,
                transparent 75%
              )
            `
          }}
        />
      </div>

      {/* Curved accent lines with enhanced contrast */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute w-full h-full opacity-[0.12]" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 Q250,250 500,300 T1000,300 V1000 H0 Z"
            fill="url(#mint-gradient)"
            className="text-mint"
          />
          <path
            d="M0,400 Q250,350 500,400 T1000,400 V1000 H0 Z"
            fill="url(#blue-gradient)"
            className="text-blue-dark"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="mint-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="blue-gradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37,99,235)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(37,99,235)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Floating icons */}
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
    </section>
  );
};

export default Hero;
