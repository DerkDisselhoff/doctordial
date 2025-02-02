
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import AIDoctorAssistant from "@/components/AIDoctorAssistant";
import NHGTriage from "@/components/NHGTriage";
import PracticeValue from "@/components/PracticeValue";

const Index = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      <AIDoctorAssistant />
      <Features />
      <PracticeValue />
      <NHGTriage />
      <Footer />
    </main>
  );
};

export default Index;
