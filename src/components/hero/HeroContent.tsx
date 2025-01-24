import { Phone } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up px-4 md:px-0">
      <div className="flex items-center gap-2 bg-mint/10 w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-mint/20 hover:border-mint/40 transition-colors">
        <Phone className="w-3 h-3 md:w-4 md:h-4 text-mint" />
        <span className="text-mint text-xs md:text-sm font-medium">{t("hero.aiPowered")}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        {t("hero.title")}
      </h1>
      <p className="text-sm md:text-lg text-text-secondary max-w-md leading-relaxed">
        Let our AI-driven Triage handle your practice's calls while maintaining the personal touch your patients expect.
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <BookDemoForm />
        <div className="text-xs md:text-sm text-text-secondary mt-2 sm:mt-0 animate-fade-in">
          {t("hero.trainedOn")}
        </div>
      </div>
    </div>
  );
};

export default HeroContent;