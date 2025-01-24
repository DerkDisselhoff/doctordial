import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 px-4 relative bg-gradient-to-b from-mint-light/5 to-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark animate-fade-up font-sans">
              Why DoctorDial
            </h2>
            <div className="w-16 md:w-20 h-1 bg-mint mx-auto rounded-full animate-fade-up delay-100" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
            <div className="card bg-white hover:bg-mint-light/5 animate-fade-up delay-200 p-8 rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-dark mb-4">{t("mission.challenge.title")}</h3>
              <p className="text-base md:text-lg text-gray leading-relaxed">
                {t("mission.challenge.description")}
              </p>
            </div>
            
            <div className="card bg-white hover:bg-mint-light/5 animate-fade-up delay-300 p-8 rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-dark mb-4">{t("mission.solution.title")}</h3>
              <p className="text-base md:text-lg text-gray leading-relaxed">
                {t("mission.solution.description")}
              </p>
            </div>
          </div>

          <div className="pt-6 md:pt-8 animate-fade-up delay-400">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;