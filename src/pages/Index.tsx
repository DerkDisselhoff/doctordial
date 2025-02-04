
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import HomeSarahUseCases from "@/components/features/home/HomeSarahUseCases";
import HomeHowToWorkWithSarah from "@/components/features/home/HomeHowToWorkWithSarah";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="space-y-24">
        <AISection />
        <Features />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/30 to-sage-light/20" />
          <div className="relative">
            <div className="space-y-24">
              <HomeSarahUseCases />
              <HomeHowToWorkWithSarah />
            </div>
          </div>
        </div>
        <NHGTriageSection />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
