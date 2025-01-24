import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";
import { Phone, Heart, Brain, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-white">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint-light/10 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-mint-light/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-light/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-mint rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-dark rounded-full animate-ping opacity-20" />
      
      {/* Floating icons with subtle animations */}
      <div className="absolute top-1/3 left-20 text-mint/20 animate-float-slow">
        <Phone className="w-8 h-8" />
      </div>
      <div className="absolute top-1/4 right-32 text-blue-dark/20 animate-float-delayed">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-1/4 left-32 text-mint/20 animate-float">
        <Brain className="w-7 h-7" />
      </div>
      <div className="absolute bottom-1/3 right-24 text-blue-dark/20 animate-float-slow">
        <Shield className="w-5 h-5" />
      </div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;