
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-white">
      {/* Animated grainy noise pattern overlay with gradient */}
      <div 
        className="absolute inset-0 opacity-20 animate-[move_8s_linear_infinite]" 
        style={{ 
          background: `linear-gradient(60deg, #0EA5E9 0%, #8B5CF6 100%)`,
          backgroundSize: '200% 200%',
          animation: 'gradient 8s ease infinite',
        }}
      />
      
      {/* Grainy noise pattern */}
      <div 
        className="absolute inset-0 mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(240%)',
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;

