
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const PracticeCountStep = ({
  value,
  onNext,
}: {
  value: string;
  onNext: (value: string) => void;
}) => {
  const { t } = useLanguage();
  
  const practices = [
    { value: "1", label: t("pricing.practiceCount.single") },
    { value: "2-3", label: t("pricing.practiceCount.small") },
    { value: "4-10", label: t("pricing.practiceCount.medium") },
    { value: "10+", label: t("pricing.practiceCount.large") },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-mint mb-2">{t("pricing.step").replace("{number}", "1")}</p>
        <h2 className="text-2xl font-semibold text-forest mb-2">{t("demo.practiceCount.title")}</h2>
        <p className="text-gray-600">{t("demo.practiceCount.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {practices.map((practice) => (
          <Card
            key={practice.value}
            className={`p-4 cursor-pointer transition-all hover:bg-mint/5 ${
              value === practice.value ? "border-mint bg-mint/10" : "border-gray-200"
            }`}
            onClick={() => onNext(practice.value)}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-mint/10">
                <Building2 className="h-5 w-5 text-mint" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-forest">{practice.label}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
