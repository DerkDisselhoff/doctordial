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

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </section>
  );
};

export default Hero;