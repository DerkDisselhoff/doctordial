
import HeroContent from "./hero/HeroContent";
import { Brain, Heart, Shield, Sparkles } from "lucide-react";
import HealthcareNetworkAnimation from "./animations/HealthcareNetworkAnimation";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Healthcare Network Animation */}
      <div className="absolute inset-0 h-full w-full">
        <HealthcareNetworkAnimation />
      </div>
      
      {/* Decorative elements - using more subtle colors */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-mint-light/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-light/5 rounded-full blur-3xl" />
      
      {/* Floating icons with subtle animations - using more subtle colors */}
      <div className="absolute top-1/3 left-20 text-white/10 animate-float-slow">
        <Brain className="w-8 h-8" />
      </div>
      <div className="absolute top-1/4 right-32 text-white/10 animate-float-delayed">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-1/3 right-24 text-white/10 animate-float">
        <Shield className="w-5 h-5" />
      </div>
      <div className="absolute bottom-1/4 left-32 text-white/10 animate-float-delayed">
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
