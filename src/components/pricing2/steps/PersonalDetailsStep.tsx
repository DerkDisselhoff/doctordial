import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

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
        <p className="text-sm text-gray-500 mb-2">Step 2 of 3</p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your details</h2>
        <p className="text-gray-500">Please enter your name and contact information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700">Full Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={data.name}
            placeholder="Dr. Jane Smith"
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-gray-700">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={data.email}
            placeholder="jane.smith@practice.com"
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={data.phone}
            placeholder="+31 6 12345678"
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
          Next Step
        </Button>
      </div>
    </form>
  );
};