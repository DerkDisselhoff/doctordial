
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-dark">
            Hoe Sarah jouw Praktijk Helpt
          </h2>
          <SarahUseCases />
        </div>
      </section>
      <Features />
      <NHGTriageSection />
      <Footer />
    </main>
  );
};

export default Index;

