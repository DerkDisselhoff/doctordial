import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DemoSuccessStep = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-primary-light/10 rounded-full flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-text-primary mb-4">{t("demo.success.title")}</h2>
      <p className="text-text-secondary mb-6">
        {t("demo.success.message")}
      </p>
    </div>
  );
};