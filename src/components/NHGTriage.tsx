
import { BookOpen, ShieldCheck, Users } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const NHGTriage = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 md:py-32 -mb-32">
      {/* Extended gradient background that connects with footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/80 to-[rgb(209,251,229)]" />
      
      {/* Medical Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, #10B981 1px, transparent 0)',
             backgroundSize: '24px 24px'
           }} 
      />
      
      <div className="container relative mx-auto px-4 max-w-6xl">
        {/* Updated gradient to match NHG Triage logo colors */}
        <div className="relative bg-gradient-to-br from-[#E8F1FE] to-[#D1FAE5] backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-mint-dark/10 overflow-hidden">
          {/* Shine effect overlay */}
          <div 
            className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shine 3s infinite linear'
            }}
          />
          
          <div className="relative bg-white/95 backdrop-blur-sm border border-mint/20 shadow-sm rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Medical Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0" 
                   style={{
                     backgroundImage: 'radial-gradient(circle at 1px 1px, #10B981 1px, transparent 0)',
                     backgroundSize: '32px 32px'
                   }} 
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-mint-light/10 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Main Title Column */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4 tracking-tight">
                    {t("nhgTriage.title")}
                  </h2>
                  <p className="text-gray text-base md:text-lg mb-4">
                    {t("nhgTriage.subtitle")}
                  </p>
                  <div className="flex justify-start">
                    <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm border border-gray-muted rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img 
                        src="/lovable-uploads/3db95113-2726-4ba8-8b57-5cb0843dff9a.png" 
                        alt="NHG Logo" 
                        className="w-[40px] h-[40px] object-contain flex-shrink-0" 
                      />
                      <span className="text-sm text-gray">{t("nhgTriage.based")}</span>
                    </div>
                  </div>
                </div>

                {/* Features Column */}
                <div className="lg:col-span-1 flex flex-col justify-center py-12 space-y-8">
                  <div className="flex items-center space-x-4 group transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5 text-mint" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray font-medium">
                        {t("nhgTriage.trained")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5 text-mint" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray font-medium">
                        {t("nhgTriage.developed")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5 text-mint" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray font-medium">
                        {t("nhgTriage.feedback")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NHGTriage;
