import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentFrequencySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const paymentFrequencies = [
  { id: "monthly", name: "Monthly" },
  { id: "quarterly", name: "Quarterly" },
  { id: "annually", name: "Annually" },
];

export const PaymentFrequencySelect = ({ value, onChange }: PaymentFrequencySelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-forest font-medium">Payment Frequency</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger className="bg-white border-gray-200 text-forest">
          <SelectValue placeholder="Select payment frequency" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          {paymentFrequencies.map((frequency) => (
            <SelectItem 
              key={frequency.id} 
              value={frequency.id}
              className="text-forest hover:bg-mint/10"
            >
              {frequency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};