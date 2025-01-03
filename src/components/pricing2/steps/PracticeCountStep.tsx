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
        <p className="text-sm text-gray-500 mb-2">Step 1 of 3</p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">How many practices do you have?</h2>
        <p className="text-gray-500">Select the option that best describes your organization</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {practices.map((practice) => (
          <Card
            key={practice.value}
            className={`p-4 cursor-pointer transition-all hover:border-blue-500 ${
              value === practice.value ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => onNext(practice.value)}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{practice.label}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};