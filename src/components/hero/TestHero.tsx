
import HeroContent from "./HeroContent";
import PulseMeter from "../animations/PulseMeter";

const TestHero = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden min-h-[600px] flex items-center">
      {/* Pulse Meter Animation as background */}
      <div className="absolute inset-0 h-full w-full">
        <PulseMeter />
      </div>
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative z-10">
        <HeroContent />
      </div>
    </section>
  );
};

export default TestHero;
