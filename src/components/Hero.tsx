
import HeroContent from "./hero/HeroContent";
import { Brain, Heart, Shield, Sparkles, Stethoscope, UserRound } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-mint-light/5">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.05),transparent_50%)]" />
      
      {/* DNA Helix Animation Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full animate-slide">
          <div className="absolute top-0 left-0 w-full h-full transform rotate-45">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-8 w-1 bg-mint-dark/30"
                style={{
                  left: `${i * 8}%`,
                  top: `${(i % 2) * 4}rem`,
                  animation: `float ${3 + i % 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Particle Effect Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-mint rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      
      {/* Floating Medical Icons */}
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
      <div className="absolute top-1/2 right-40 text-mint/20 animate-float">
        <Stethoscope className="w-6 h-6" />
      </div>
      <div className="absolute bottom-1/3 left-40 text-blue-dark/20 animate-float-delayed">
        <UserRound className="w-5 h-5" />
      </div>
      
      {/* Trust Indicators */}
      <div className="absolute top-20 right-20 flex items-center space-x-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2"
        >
          <div className="w-2 h-2 bg-mint rounded-full animate-pulse" />
          <span className="text-sm text-gray-dark">Active Now</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-sm text-gray-dark">
            <span className="font-bold">10,000+</span>
            <span className="ml-1">Patients Helped</span>
          </div>
        </motion.div>
      </div>
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-mint/10"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
