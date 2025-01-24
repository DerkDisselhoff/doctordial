import { BarChart3, Clock, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Stats = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-mint-light/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up bg-white p-8 rounded-xl border border-gray-muted hover:border-mint transition-colors shadow-sm hover:shadow-md">
            <div className="p-3 bg-mint-light rounded-full">
              <UserCheck className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-gray-dark">60</h3>
            <p className="text-gray">Simultaneous Calls per Assistant</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up bg-white p-8 rounded-xl border border-gray-muted hover:border-mint transition-colors shadow-sm hover:shadow-md" style={{ animationDelay: "150ms" }}>
            <div className="p-3 bg-mint-light rounded-full">
              <Clock className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-gray-dark">2s</h3>
            <p className="text-gray">{t("stats.handling")}</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-up bg-white p-8 rounded-xl border border-gray-muted hover:border-mint transition-colors shadow-sm hover:shadow-md" style={{ animationDelay: "300ms" }}>
            <div className="p-3 bg-mint-light rounded-full">
              <BarChart3 className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-4xl font-bold text-gray-dark">60%</h3>
            <p className="text-gray">{t("stats.reduction")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;