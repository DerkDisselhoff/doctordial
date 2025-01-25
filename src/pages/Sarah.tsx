import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Bot, Stethoscope, Clock, Brain } from "lucide-react";

const DrSarah = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark">
                Meet Sarah
              </h1>
              <p className="text-gray text-lg md:text-xl max-w-2xl mx-auto">
                Your AI-powered medical assistant, combining advanced technology with compassionate care
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 py-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-mint" />
                  <h3 className="text-xl font-semibold text-gray-dark">AI-Powered Intelligence</h3>
                </div>
                <p className="text-gray">
                  Trained on extensive medical protocols and best practices to provide accurate, 
                  consistent support for your practice.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-mint" />
                  <h3 className="text-xl font-semibold text-gray-dark">Medical Expertise</h3>
                </div>
                <p className="text-gray">
                  Capable of understanding and triaging a wide range of medical conditions with 
                  professional accuracy.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-mint" />
                  <h3 className="text-xl font-semibold text-gray-dark">24/7 Availability</h3>
                </div>
                <p className="text-gray">
                  Always ready to assist your patients, manage calls, and handle urgent cases at 
                  any time of day.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-mint" />
                  <h3 className="text-xl font-semibold text-gray-dark">Continuous Learning</h3>
                </div>
                <p className="text-gray">
                  Constantly improving through each interaction while maintaining consistent quality 
                  of care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DrSarah;