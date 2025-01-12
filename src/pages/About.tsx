import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import ChallengeSection from "@/components/about/ChallengeSection";
import SolutionSection from "@/components/about/SolutionSection";
import VisionSection from "@/components/about/VisionSection";
import Timeline from "@/components/about/Timeline";
import HealthcareStats from "@/components/about/HealthcareStats";

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AboutHero />

      {/* Main Content with consistent spacing */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 mb-12">
              {/* Problem and Solution */}
              <ChallengeSection />
              <SolutionSection />
              <VisionSection />
            </div>

            {/* Two-column layout for Healthcare Evolution and Market Insights */}
            <div className="grid md:grid-cols-2 gap-12">
              <Timeline />
              <HealthcareStats />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;