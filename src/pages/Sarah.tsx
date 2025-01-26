import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Bot, ChevronRight } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Button } from "@/components/ui/button";
import SarahSymptomTags from "@/components/features/SarahSymptomTags";
import { CallDetailPreview } from "@/components/features/feature-previews/CallDetailPreview";
import SarahUseCases from "@/components/features/SarahUseCases";
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

          {/* Symptom Recognition Section */}
          <div className="bg-white rounded-xl p-8 mb-16 border border-gray-muted/20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Trained on Thousands of Medical Conditions
              </h3>
            </div>
            <SarahSymptomTags />
          </div>

          {/* Use Cases Section */}
          <SarahUseCases />

          {/* Call Detail Preview Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-dark mb-8 text-center">
              Detailed Call Analysis
            </h2>
            <div className="bg-white rounded-xl border border-gray-muted shadow-lg overflow-hidden">
              <CallDetailPreview />
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