
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import SarahUseCases from "@/components/features/SarahUseCases";

const Index = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      <AISection />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/30 to-sage-light/20" />
        <div className="relative">
          <SarahUseCases />
        </div>
      </div>
      <NHGTriageSection />
      <Footer />
    </main>
  );
};

export default Index;

