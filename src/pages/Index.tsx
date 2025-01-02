import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import DashboardPreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhoWeServe from "@/components/WhoWeServe";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <WhoWeServe />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;