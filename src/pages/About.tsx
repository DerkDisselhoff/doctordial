import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import ChallengeSection from "@/components/about/ChallengeSection";
import SolutionSection from "@/components/about/SolutionSection";
import VisionSection from "@/components/about/VisionSection";
import CompanyStats from "@/components/about/CompanyStats";
import CompanyValues from "@/components/about/CompanyValues";
import Timeline from "@/components/about/Timeline";
import HealthcareStats from "@/components/about/HealthcareStats";

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AboutHero />

      {/* Main Content with consistent spacing */}
      <section className="py-12 px-4 bg-forest-light/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Market Context */}
            <HealthcareStats />
            <Timeline />
            
            {/* Problem and Solution */}
            <ChallengeSection />
            <SolutionSection />
            
            {/* Vision and Values */}
            <VisionSection />
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl font-bold text-white">
                Amsterdam-Based Innovation
              </h2>
              <p className="text-white/80 leading-relaxed">
                Founded in Amsterdam in 2025, DoctorDial combines Dutch healthcare excellence 
                with cutting-edge AI technology. Our team of medical professionals and 
                tech experts work together to create solutions that truly understand 
                and address the challenges faced by modern medical practices.
              </p>
            </div>

            <CompanyStats />
          </div>

          <div className="mt-12">
            <CompanyValues />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;