import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const practices = [
  { value: "1", label: "Single Practice" },
  { value: "2-3", label: "2-3 Practices" },
  { value: "4-10", label: "4-10 Practices" },
  { value: "10+", label: "10+ Practices" },
];

export const PracticeCountStep = ({
  value,
  onNext,
}: {
  value: string;
  onNext: (value: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-mint mb-2">How many practices do you have?</h2>
        <p className="text-gray-400">Select the option that best describes your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practices.map((practice) => (
          <Card
            key={practice.value}
            className={`p-6 cursor-pointer transition-all hover:border-mint ${
              value === practice.value ? "border-mint bg-forest-light" : "border-mint/20"
            }`}
            onClick={() => onNext(practice.value)}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-mint/10">
                <Building2 className="h-6 w-6 text-mint" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{practice.label}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};