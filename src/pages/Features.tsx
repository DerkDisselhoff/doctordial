import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeatureSection from "@/components/features/FeatureSection";
import FeaturesCTA from "@/components/features/FeaturesCTA";
import { features } from "@/data/features";
import { EnhancedUrgencyDashboard } from "@/components/features/feature-previews/EnhancedUrgencyDashboard";

const Features = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fcfcfc" }}>
      <Navbar />
      <FeaturesHero />

      {/* Enhanced Dashboard Preview - Hidden on mobile, visible from md breakpoint up */}
      <section className="hidden md:block py-20 px-4">
        <div className="container mx-auto">
          <EnhancedUrgencyDashboard />
        </div>
      </section>

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