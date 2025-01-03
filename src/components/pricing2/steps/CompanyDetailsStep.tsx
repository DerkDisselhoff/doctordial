import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CompanyDetails = {
  companyName: string;
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
      companyName: formData.get('companyName') as string,
      role: formData.get('role') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-mint mb-2">Practice Details</h2>
        <p className="text-gray-400">Tell us about your medical practice</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Practice Name</Label>
          <Input
            id="companyName"
            name="companyName"
            defaultValue={data.companyName}
            placeholder="Smith Medical Group"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="role">Your Role</Label>
          <Input
            id="role"
            name="role"
            defaultValue={data.role}
            placeholder="General Practitioner"
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-mint text-mint hover:bg-mint/10"
        >
          Back
        </Button>
        <Button type="submit" className="bg-mint hover:bg-mint/90 text-forest">
          Complete
        </Button>
      </div>
    </form>
  );
};