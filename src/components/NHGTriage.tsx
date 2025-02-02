
import { BookOpen, ShieldCheck, Users } from "lucide-react";
import { Card } from "./ui/card";

const NHGTriage = () => {
  return (
    <section className="py-8 px-4 bg-[#1A1F2C]">
      <div className="container mx-auto max-w-6xl bg-blue/5 backdrop-blur-sm rounded-3xl p-8">
        <div className="bg-white border border-blue-muted shadow-sm rounded-2xl p-8">
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

          <div className="mt-8 flex justify-start">
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-muted rounded-full px-6 py-2">
              <img src="/lovable-uploads/3db95113-2726-4ba8-8b57-5cb0843dff9a.png" alt="NHG Logo" className="w-[30px] h-[30px]" />
              <span className="text-sm text-gray">Officieel gebaseerd op NHG triagestandaarden</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NHGTriage;

