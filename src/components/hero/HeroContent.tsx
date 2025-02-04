
import { Phone } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroContent = () => {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const fullText = t("hero.titlePartTwo");
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 text-center"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 bg-mint-light/30 w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-mint/20 hover:border-mint/40 transition-colors mx-auto"
      >
        <Phone className="w-3 h-3 md:w-4 md:h-4 text-mint" />
        <span className="text-mint text-xs md:text-sm font-medium">{t("hero.aiPowered")}</span>
      </motion.div>
      
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-dark max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("hero.titlePartOne")}
          </motion.span>
          <br />
          <motion.span 
            className="text-mint relative inline-block after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-mint/20"
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base md:text-lg text-gray max-w-xl leading-relaxed mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <div className="relative z-10 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-mint to-blue-dark rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <BookDemoForm />
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
          {t("hero.trainedOn")}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
