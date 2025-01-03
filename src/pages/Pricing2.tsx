import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MultiStepPricingForm } from "@/components/pricing2/MultiStepPricingForm";

const Pricing2 = () => {
  return (
    <div className="min-h-screen bg-forest-light">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-mint mb-4">Get Started with DoctorDial</h1>
            <p className="text-lg text-gray-300">
              Let us help you find the perfect plan for your practice
            </p>
          </div>
          <MultiStepPricingForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing2;