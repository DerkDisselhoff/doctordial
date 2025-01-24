import { BarChart3, Clock, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Stats = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-surface-secondary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up p-6 rounded-lg hover:bg-primary-light/5 transition-colors">
            <div className="p-3 bg-primary-light/10 rounded-full">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-text-primary">60</h3>
            <p className="text-text-secondary">Simultaneous Calls per Assistant</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up p-6 rounded-lg hover:bg-primary-light/5 transition-colors" style={{ animationDelay: "150ms" }}>
            <div className="p-3 bg-primary-light/10 rounded-full">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-text-primary">2s</h3>
            <p className="text-text-secondary">{t("stats.handling")}</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up p-6 rounded-lg hover:bg-primary-light/5 transition-colors" style={{ animationDelay: "300ms" }}>
            <div className="p-3 bg-primary-light/10 rounded-full">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-text-primary">60%</h3>
            <p className="text-text-secondary">{t("stats.reduction")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;