
import HeroContent from "./hero/HeroContent";
import HealthcareNetworkAnimation from "./animations/HealthcareNetworkAnimation";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Healthcare Network Animation */}
      <div className="absolute inset-0 h-full w-full">
        <HealthcareNetworkAnimation />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-mint-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-light/10 rounded-full blur-3xl" />
      
      {/* Centered content */}
      <div className="container mx-auto max-w-4xl relative">
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
