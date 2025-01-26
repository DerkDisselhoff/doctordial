import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Button } from "@/components/ui/button";
import SarahSymptomTags from "@/components/features/SarahSymptomTags";
import { CallDetailPreview } from "@/components/features/feature-previews/CallDetailPreview";
import SarahUseCases from "@/components/features/SarahUseCases";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import StatsBadge from "@/components/hero/StatsBadge";

const Sarah = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-forest">
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-mint/20 text-mint-light border-mint-light/20 px-4 py-1.5">
                  <Bot className="w-4 h-4 mr-1" />
                  AI-Powered Assistant
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Meet Sarah
              </h1>
              <p className="text-gray-muted text-lg md:text-xl max-w-2xl">
                Your AI-powered medical assistant, combining advanced technology with compassionate care
              </p>
              <div className="pt-4">
                <BookDemoForm>
                  <Button className="bg-mint hover:bg-mint-dark text-white">
                    Hire Sarah
                  </Button>
                </BookDemoForm>
              </div>
            </div>
            
            {/* Sarah's Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative lg:h-[600px]"
            >
              <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-visible shadow-2xl border border-mint/10 h-full bg-forest-light">
                <img
                  src="/lovable-uploads/8cc89b28-b673-4f32-92b9-ea395078b319.png"
                  alt="Sarah AI Medical Assistant"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                <StatsBadge value="24/7" label="Patient Support" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SarahUseCases />
        </div>
      </section>

      {/* Medical Conditions Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 border border-gray-muted/20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Trained on Thousands of Medical Conditions
              </h3>
            </div>
            <SarahSymptomTags />
          </div>
        </div>
      </section>

      {/* Call Detail Analysis Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-dark mb-8 text-center">
            Detailed Call Analysis
          </h2>
          <div className="bg-white rounded-xl border border-gray-muted shadow-lg overflow-hidden">
            <CallDetailPreview />
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-forest-light/5 rounded-2xl p-8 border border-mint/10">
            <h2 className="text-2xl font-bold text-gray-dark mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-gray mb-6">
              Join the growing number of medical practices that trust Sarah to handle their patient communications.
            </p>
            <BookDemoForm>
              <Button className="bg-blue-dark hover:bg-blue-dark/90 text-white">
                Book a Demo
              </Button>
            </BookDemoForm>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Sarah;