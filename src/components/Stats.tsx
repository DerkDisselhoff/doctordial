import { BarChart3, Clock, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Stats = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-forest-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up">
            <div className="p-3 bg-mint/10 rounded-full">
              <UserCheck className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-white">95%</h3>
            <p className="text-white/80">{t("stats.satisfaction")}</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="p-3 bg-mint/10 rounded-full">
              <Clock className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-white">24/7</h3>
            <p className="text-white/80">{t("stats.availability")}</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="p-3 bg-mint/10 rounded-full">
              <BarChart3 className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-white">30%</h3>
            <p className="text-white/80">{t("stats.reduction")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;