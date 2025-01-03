import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PersonalDetails = {
  name: string;
  email: string;
  phone: string;
};

export const PersonalDetailsStep = ({
  data,
  onBack,
  onNext,
}: {
  data: PersonalDetails;
  onBack: () => void;
  onNext: (data: PersonalDetails) => void;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onNext({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-mint mb-2">Your Details</h2>
        <p className="text-gray-400">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={data.name}
            placeholder="Dr. Jane Smith"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={data.email}
            placeholder="jane.smith@practice.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={data.phone}
            placeholder="+31 6 12345678"
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
          Next Step
        </Button>
      </div>
    </form>
  );
};