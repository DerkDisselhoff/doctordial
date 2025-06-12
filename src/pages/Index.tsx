
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import HomeAIAssistants from "@/components/features/home/HomeAIAssistants";
import TestimonialSection from "@/components/home/TestimonialSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      
      <AISection />
      <HomeAIAssistants />
      <TestimonialSection />
      <NHGTriageSection />
      <Footer />
    </main>
  );
};

export default Index;
