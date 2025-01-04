import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhoWeServe from "@/components/WhoWeServe";
import VapiCallsList from "@/components/VapiCallsList";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <Certifications />
      <WhoWeServe />
      <Features />
      <VapiCallsList />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;