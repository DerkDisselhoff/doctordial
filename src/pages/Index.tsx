
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import HomeSarahUseCases from "@/components/features/home/HomeSarahUseCases";
import HomeAIAssistants from "@/components/features/home/HomeAIAssistants";

const Index = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      
      {/* Disclaimer text */}
      <div className="w-full bg-sage-light/10 py-4">
        <div className="container mx-auto px-4">
          <p className="text-gray-dark/80 text-sm md:text-base italic text-center max-w-3xl mx-auto">
            DoctorDial is momenteel in pilot fase, en voldoet nog niet aan de MDR wetgeving. 
            DoctorDial valt niet onder de verboden van de EU AI Act, wel moet het voldoen aan 
            verschillende eisen uit de AI Act, waaronder risicomanagement, datagovernance, 
            technische documentatie en transparantie en gebruikersinstructies.
          </p>
        </div>
      </div>
      
      <AISection />
      <HomeAIAssistants />
      <Features />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/30 to-sage-light/20" />
        <div className="relative">
          <HomeSarahUseCases />
        </div>
      </div>
      <NHGTriageSection />
      <Footer />
    </main>
  );
};

export default Index;
