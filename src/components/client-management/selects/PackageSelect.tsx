import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PackageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const packages = [
  { id: "starter", name: "Starter" },
  { id: "growth", name: "Growth" },
  { id: "scale", name: "Scale" },
  { id: "enterprise", name: "Enterprise" },
];

export const PackageSelect = ({ value, onChange }: PackageSelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-forest">Package</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger className="bg-white border-gray-200">
          <SelectValue placeholder="Select a package" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
          {packages.map((pkg) => (
            <SelectItem 
              key={pkg.id} 
              value={pkg.id}
              className="hover:bg-gray-100"
            >
              {pkg.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};