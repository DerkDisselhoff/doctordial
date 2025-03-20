
import HeroContent from "./HeroContent";
import PulseMeter from "../animations/PulseMeter";

const TestHero = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden min-h-[600px] flex items-center">
      {/* Pulse Meter Animation (replacing the Healthcare Network Animation) */}
      <div className="absolute inset-0 h-full w-full">
        <PulseMeter />
      </div>
      
      {/* Minimal decorative elements - just one subtle background element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-mint-light/5 rounded-full blur-3xl" />
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>
    </section>
  );
};

export default TestHero;
