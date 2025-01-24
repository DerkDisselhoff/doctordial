import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import AIDoctorAssistant from "@/components/AIDoctorAssistant";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AIDoctorAssistant />
      <Features />
      <Certifications />
      <Footer />
    </main>
  );
};

export default Index;