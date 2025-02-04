
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { AISection } from "@/components/home/AISection";
import { NHGTriageSection } from "@/components/home/NHGTriageSection";
import HomeSarahUseCases from "@/components/features/home/HomeSarahUseCases";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation - Full width with centered content */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      {/* Hero Section - Full width with centered content */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AISection />
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Features />
        </div>
      </div>

      {/* Sarah Use Cases Section */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/30 to-sage-light/20" />
            <div className="relative">
              <HomeSarahUseCases />
            </div>
          </div>
        </div>
      </div>

      {/* NHG Triage Section */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NHGTriageSection />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
