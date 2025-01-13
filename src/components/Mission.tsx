import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Why DoctorDial
            </h2>
            <div className="w-16 md:w-20 h-1 bg-mint/30 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-left">
            <div className="space-y-3 md:space-y-4 p-4 md:p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-lg md:text-xl font-semibold text-mint">{t("mission.challenge.title")}</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {t("mission.challenge.description")}
              </p>
            </div>
            
            <div className="space-y-3 md:space-y-4 p-4 md:p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-lg md:text-xl font-semibold text-mint">{t("mission.solution.title")}</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {t("mission.solution.description")}
              </p>
            </div>
          </div>

          <div className="pt-6 md:pt-8">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;