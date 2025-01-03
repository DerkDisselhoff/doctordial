import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

type CompanyDetails = {
  company_name: string;
  role: string;
};

export const CompanyDetailsStep = ({
  data,
  onBack,
  onNext,
}: {
  data: CompanyDetails;
  onBack: () => void;
  onNext: (data: CompanyDetails) => void;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onNext({
      company_name: formData.get('company_name') as string,
      role: formData.get('role') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500 mb-2">Step 3 of 3</p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Practice Details</h2>
        <p className="text-gray-500">Tell us about your medical practice</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="company_name" className="text-gray-700">Practice Name</Label>
          <Input
            id="company_name"
            name="company_name"
            defaultValue={data.company_name}
            placeholder="Smith Medical Group"
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="role" className="text-gray-700">Your Role</Label>
          <Input
            id="role"
            name="role"
            defaultValue={data.role}
            placeholder="General Practitioner"
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button type="submit" className="bg-forest hover:bg-forest-light text-white">
          Complete
        </Button>
      </div>
    </form>
  );
};