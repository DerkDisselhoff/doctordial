
import { BookOpen, ShieldCheck, Users } from "lucide-react";
import { Card } from "./ui/card";

const NHGTriage = () => {
  return (
    <section className="py-8 px-4 bg-[#1A1F2C]">
      <div className="container mx-auto max-w-6xl bg-blue/5 backdrop-blur-sm rounded-3xl p-8">
        <div className="bg-white/90 border border-gray-muted/20 shadow-lg rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
          {/* Decorative medical grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#F8FAFC_1px,transparent_1px),linear-gradient(to_bottom,#F8FAFC_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.04]" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
            {/* Main Title Column */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4 relative">
                Gebouwd op NHG Triage Standaarden
              </h2>
              <p className="text-gray text-base md:text-lg">
                Betrouwbare patiëntenzorg met evidence-based triageprotocollen
              </p>
            </div>

            {/* Features Column */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature Items */}
                <div className="group hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white to-mint-light/20 border border-mint/5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-mint-light/80 flex items-center justify-center flex-shrink-0 group-hover:bg-mint-light transition-colors">
                      <BookOpen className="w-5 h-5 text-mint" />
                    </div>
                    <div>
                      <p className="text-sm text-gray font-medium">
                        AI model getrained op NHG triage datasets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white to-mint-light/20 border border-mint/5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-mint-light/80 flex items-center justify-center flex-shrink-0 group-hover:bg-mint-light transition-colors">
                      <Users className="w-5 h-5 text-mint" />
                    </div>
                    <div>
                      <p className="text-sm text-gray font-medium">
                        Ontwikkeld met medische specialisten
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white to-mint-light/20 border border-mint/5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-mint-light/80 flex items-center justify-center flex-shrink-0 group-hover:bg-mint-light transition-colors">
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
          </div>

          <div className="mt-8 flex justify-start">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-white to-blue-light/30 border border-gray-muted/30 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
              <img src="/lovable-uploads/3db95113-2726-4ba8-8b57-5cb0843dff9a.png" alt="NHG Logo" className="w-[30px] h-[30px] object-contain flex-shrink-0" />
              <span className="text-sm text-gray">Officieel gebaseerd op NHG triagestandaarden</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NHGTriage;
