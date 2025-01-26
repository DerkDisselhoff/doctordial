import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Bot, Stethoscope, Clock, Brain, Phone, MessageSquare, Shield, ChevronRight } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Button } from "@/components/ui/button";
import SymptomTags from "@/components/features/SymptomTags";
import { ActivityListPreview } from "@/components/features/feature-previews/ActivityListPreview";
import { DailyCallsPreview } from "@/components/features/feature-previews/DailyCallsPreview";
import { CallDetailPreview } from "@/components/features/feature-previews/CallDetailPreview";
import { useLanguage } from "@/contexts/LanguageContext";

const Sarah = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="bg-mint/10 text-mint border-mint/20 px-4 py-1.5">
                <Bot className="w-4 h-4 mr-1" />
                AI-Powered Assistant
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark">
              Meet Sarah
            </h1>
            <p className="text-gray text-lg md:text-xl max-w-2xl mx-auto">
              Your AI-powered medical assistant, combining advanced technology with compassionate care
            </p>
            <div className="pt-4">
              <BookDemoForm />
            </div>
          </div>

          {/* Dashboard Preview Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-forest p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-6">Real-time Call Management</h3>
              <DailyCallsPreview />
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-muted shadow-lg">
              <h3 className="text-xl font-semibold text-gray-dark mb-6">Recent Activity</h3>
              <ActivityListPreview />
            </div>
          </div>

          {/* Symptom Recognition Section - Updated Background */}
          <div className="bg-forest-light/5 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Trained on Thousands of Medical Conditions
              </h3>
            </div>
            <SymptomTags />
          </div>

          {/* Core Features Grid */}
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

          {/* Call Detail Preview Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-dark mb-8 text-center">
              Detailed Call Analysis
            </h2>
            <div className="bg-white rounded-xl border border-gray-muted shadow-lg overflow-hidden">
              <CallDetailPreview />
            </div>
          </div>

          {/* Capabilities Section */}
          <div className="py-16 border-t border-gray-muted/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-dark mb-4">
                Comprehensive Healthcare Support
              </h2>
              <p className="text-gray text-lg max-w-2xl mx-auto">
                Sarah handles a wide range of patient interactions with precision and care
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-forest-light/5 rounded-xl border border-mint/10 hover:border-mint/20 transition-all">
                <Phone className="w-8 h-8 text-mint mb-4" />
                <h3 className="text-lg font-semibold text-gray-dark mb-2">Smart Call Management</h3>
                <p className="text-gray text-sm">
                  Efficiently handles incoming calls, prioritizes urgent cases, and ensures no patient goes unattended.
                </p>
              </div>

              <div className="p-6 bg-forest-light/5 rounded-xl border border-mint/10 hover:border-mint/20 transition-all">
                <MessageSquare className="w-8 h-8 text-mint mb-4" />
                <h3 className="text-lg font-semibold text-gray-dark mb-2">Natural Conversations</h3>
                <p className="text-gray text-sm">
                  Engages in human-like dialogue while gathering essential medical information.
                </p>
              </div>

              <div className="p-6 bg-forest-light/5 rounded-xl border border-mint/10 hover:border-mint/20 transition-all">
                <Shield className="w-8 h-8 text-mint mb-4" />
                <h3 className="text-lg font-semibold text-gray-dark mb-2">Medical Protocol Adherence</h3>
                <p className="text-gray text-sm">
                  Strictly follows NHG guidelines and medical best practices for patient safety.
                </p>
              </div>
            </div>
          </div>

          {/* Demo CTA Section */}
          <div className="py-16 text-center">
            <div className="max-w-3xl mx-auto bg-forest-light/5 rounded-2xl p-8 border border-mint/10">
              <h2 className="text-2xl font-bold text-gray-dark mb-4">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-gray mb-6">
                Join the growing number of medical practices that trust Sarah to handle their patient communications.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookDemoForm>
                  <Button className="bg-blue-dark hover:bg-blue-dark/90 text-white">
                    Book a Demo
                  </Button>
                </BookDemoForm>
                <Button variant="outline" className="group">
                  Learn More About Pricing
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Sarah;