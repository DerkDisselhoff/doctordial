
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-up text-center relative z-10">
      <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30 hover:border-white/40 transition-colors mx-auto">
        <Phone className="w-3 h-3 md:w-4 md:h-4 text-white" />
        <span className="text-white text-xs md:text-sm font-medium">{t("hero.aiPowered")}</span>
      </div>
      
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white max-w-4xl mx-auto">
          {t("hero.titlePartOne")}
          <br />
          <span className="text-mint-light">
            {t("hero.titlePartTwo")}
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed mx-auto">
          {t("hero.subtitle")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="z-10">
          <Link 
            to="/demo-request"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white hover:bg-white/90 text-forest font-medium transition-colors shadow-xl hover:shadow-2xl hover:shadow-mint/20"
          >
            {t("hero.bookDemo")}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
          <div className="w-2 h-2 rounded-full bg-mint-light animate-pulse"></div>
          {t("hero.trainedOn")}
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
