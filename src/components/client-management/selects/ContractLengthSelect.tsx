import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContractLengthSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const contractLengths = [
  { id: "12", name: "12 months" },
  { id: "24", name: "24 months" },
  { id: "36", name: "36 months" },
];

export const ContractLengthSelect = ({ value, onChange }: ContractLengthSelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-forest">Contract Length</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger className="bg-white border-gray-200">
          <SelectValue placeholder="Select contract length" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
          {contractLengths.map((length) => (
            <SelectItem 
              key={length.id} 
              value={length.id}
              className="hover:bg-gray-100"
            >
              {length.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};