import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 to-transparent" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;