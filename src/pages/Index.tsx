
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import { PracticeValueSection } from "@/components/home/PracticeValueSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      <AISection />
      <Features />
      <PracticeValueSection />
      <NHGTriageSection />
      <Footer />
    </main>
  );
};

export default Index;
