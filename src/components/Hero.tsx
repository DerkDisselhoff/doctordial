import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-white">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint-light/10 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-mint-light/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-light/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-mint rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-dark rounded-full animate-ping opacity-20" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;