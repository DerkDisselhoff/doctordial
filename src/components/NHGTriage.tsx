
import { BookOpen, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { Card } from "./ui/card";

const NHGTriage = () => {
  return (
    <section className="py-16 px-4 bg-blue-light">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Title Column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4">
              Gebouwd op NHG Triage Standaarden
            </h2>
            <p className="text-gray text-base md:text-lg">
              Betrouwbare patiëntenzorg met evidence-based triageprotocollen
            </p>
          </div>

          {/* Features Column */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <p className="text-sm text-gray font-medium">
                    AI model getrained op NHG triage datasets
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <p className="text-sm text-gray font-medium">
                    Ontwikkeld met medische specialisten
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <p className="text-sm text-gray font-medium">
                    Continue verbetering met feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-muted rounded-full px-6 py-2">
            <img src="/assets/nhg-logo.svg" alt="NHG Logo" className="w-6 h-6" />
            <span className="text-sm text-gray">Officieel gebaseerd op NHG triagestandaarden</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NHGTriage;

