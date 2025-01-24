import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import WhoWeServe from "@/components/WhoWeServe";

const Index = () => {
  return (
    <main className="min-h-screen bg-forest text-text-primary">
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <Features />
      <WhoWeServe />
      <Certifications />
      <Footer />
    </main>
  );
};

export default Index;