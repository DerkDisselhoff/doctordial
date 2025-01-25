import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookDemoForm } from "@/components/BookDemoForm";

const AIDoctorAssistant = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark">
              Meet Your Digital Doctor's Assistant
            </h2>
            
            <p className="text-gray text-lg leading-relaxed max-w-xl">
              Your dedicated digital medical assistant, available 24/7 to handle patient calls and triage cases with the precision of a trained professional.
            </p>

            <div className="flex items-center gap-3 text-gray">
              <Stethoscope className="w-5 h-5 text-mint" />
              <span>Trained on extensive medical protocols</span>
            </div>

            <div>
              <Link to="/sarah">
                <Button className="mt-4 bg-mint text-white hover:bg-mint-dark">
                  Learn more about Sarah
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-down lg:h-[500px]">
            <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-mint/10 h-full">
              <img
                src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
                alt="Professional AI Medical Assistant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
              
              {/* Stats Badge */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-white">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Patient Support</div>
                </div>
              </div>

              {/* Hire Button */}
              <div className="absolute top-6 right-6">
                <BookDemoForm>
                  <Button 
                    variant="secondary" 
                    className="bg-blue-dark hover:bg-blue-dark/90 text-white font-medium rounded-full px-6"
                  >
                    Hire Sarah
                  </Button>
                </BookDemoForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDoctorAssistant;