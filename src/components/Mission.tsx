import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 px-4 relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 to-transparent opacity-50" />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark animate-fade-up">
              Why DoctorDial
            </h2>
            <div className="w-16 md:w-20 h-1 bg-mint mx-auto rounded-full animate-fade-up delay-100" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-left">
            <div className="card card-interactive bg-white hover:bg-mint-light/5 animate-fade-up delay-200">
              <h3 className="text-lg md:text-xl font-semibold text-gray-dark mb-3">{t("mission.challenge.title")}</h3>
              <p className="text-sm md:text-base text-gray leading-relaxed">
                {t("mission.challenge.description")}
              </p>
            </div>
            
            <div className="card card-interactive bg-white hover:bg-mint-light/5 animate-fade-up delay-300">
              <h3 className="text-lg md:text-xl font-semibold text-gray-dark mb-3">{t("mission.solution.title")}</h3>
              <p className="text-sm md:text-base text-gray leading-relaxed">
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