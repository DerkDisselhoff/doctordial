
import { Phone } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-up text-center">
      <div className="flex items-center justify-center gap-2 bg-mint-light/30 w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-mint/20 hover:border-mint/40 transition-colors mx-auto">
        <Phone className="w-3 h-3 md:w-4 md:h-4 text-mint" />
        <span className="text-mint text-xs md:text-sm font-medium">{t("hero.aiPowered")}</span>
      </div>
      
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-dark max-w-4xl mx-auto">
          {t("hero.titlePartOne")}
          <br />
          <span className="text-mint">
            {t("hero.titlePartTwo")}
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray max-w-xl leading-relaxed mx-auto">
          {t("hero.subtitle")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="z-10">
          <BookDemoForm />
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
          {t("hero.trainedOn")}
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
