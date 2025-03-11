
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

interface CompanyDetailsStepProps {
  data: {
    company_name: string;
    role: string;
  };
  onBack: () => void;
  onNext: (data: { company_name: string; role: string }) => void;
  isSubmitting?: boolean;
}

export const CompanyDetailsStep = ({
  data,
  onBack,
  onNext,
  isSubmitting = false,
}: CompanyDetailsStepProps) => {
  const [companyName, setCompanyName] = useState(data.company_name);
  const [role, setRole] = useState(data.role);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(companyName.trim() !== "" && role.trim() !== "");
  }, [companyName, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete && !isSubmitting) {
      onNext({ company_name: companyName, role });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-dark">Bedrijfsgegevens</h2>
        <p className="text-gray">
          Laat ons weten over uw organisatie zodat we u beter kunnen helpen.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Praktijk / Organisatie naam</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Voer uw bedrijfsnaam in"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="role">Uw rol</Label>
          <Input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Bijv. Huisarts, Praktijkmanager, etc."
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="bg-white border-gray-muted text-gray-dark flex items-center gap-2"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          Terug
        </Button>

        <Button
          type="submit"
          className="bg-mint text-forest hover:bg-mint-light flex items-center gap-2"
          disabled={!isComplete || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Versturen...
            </>
          ) : (
            <>
              Versturen
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
