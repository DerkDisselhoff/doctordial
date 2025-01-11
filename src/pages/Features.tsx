import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeatureSection from "@/components/features/FeatureSection";
import ProcessFlow from "@/components/features/ProcessFlow";
import FeaturesCTA from "@/components/features/FeaturesCTA";
import { features } from "@/data/features";

const Features = () => {
  return (
    <div className="min-h-screen bg-forest">
      <Navbar />
      <FeaturesHero />

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
          
          {/* Process Flow Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Process Overview of DoctorDial
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                See how our AI-powered system efficiently manages and routes patient calls based on urgency levels
              </p>
            </div>
            <ProcessFlow />
          </div>
        </div>
      </section>

      <FeaturesCTA />
      <Footer />
    </div>
  );
};

export default Features;