import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeatureSection from "@/components/features/FeatureSection";
import FeaturesCTA from "@/components/features/FeaturesCTA";
import { features } from "@/data/features";

const Features = () => {
  return (
    <div className="min-h-screen bg-forest">
      <Navbar />
      <FeaturesHero />
      <Stats />

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              {...feature}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      <FeaturesCTA />
      <Footer />
    </div>
  );
};

export default Features;