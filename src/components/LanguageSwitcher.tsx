import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
      className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
    >
      <span className="text-sm font-medium">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageSwitcher;