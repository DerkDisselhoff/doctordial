import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";

const Hero = () => {
  return (
    <section className="section-lg pt-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;