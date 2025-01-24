import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import WhoWeServe from "@/components/WhoWeServe";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <WhoWeServe />
      <Certifications />
      <Footer />
    </main>
  );
};

export default Index;