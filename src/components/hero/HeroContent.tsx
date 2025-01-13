import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "../ui/button";
import { BookDemoForm } from "../BookDemoForm";
import StatsBadge from "./StatsBadge";
import AIDemoButton from "./AIDemoButton";
import { useState } from "react";

const HeroContent = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
    // Add audio playback logic here if needed
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-start space-y-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-mint/10 border border-mint/20">
          <span className="text-mint text-sm font-medium">
            {t("hero.aiPowered")}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {t("hero.title")}
        </h1>

        <p className="text-lg text-white/80 max-w-xl">
          Let our AI-driven Triage handle your practice's calls while maintaining the personal touch your patients expect.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <BookDemoForm />
          <AIDemoButton 
            isPlaying={isPlaying}
            onPlayDemo={handlePlayDemo}
          />
        </div>

        <StatsBadge 
          value="95%"
          label="Patient Satisfaction Rate"
        />

        <p className="text-sm text-white/60">
          {t("hero.trainedOn")}
        </p>
      </div>
    </div>
  );
};

export default HeroContent;