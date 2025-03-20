
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [companyName, setCompanyName] = useState(data.company_name);
  const [role, setRole] = useState(data.role);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(companyName.trim() !== "" && role.trim() !== "");
  }, [companyName, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete && !isSubmitting) {
      // Log the data being passed back to parent
      console.log("CompanyDetailsStep submitting:", { company_name: companyName, role });
      onNext({ company_name: companyName, role });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-dark">{t("pricing.companyDetails.title")}</h2>
        <p className="text-gray">
          {t("pricing.companyDetails.subtitle")}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">{t("pricing.companyDetails.companyName")}</Label>
          <Input
            id="companyName"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={t("pricing.companyDetails.placeholder.company")}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="role">{t("pricing.companyDetails.role")}</Label>
          <Input
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={t("pricing.companyDetails.placeholder.role")}
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
          {t("pricing.buttons.back")}
        </Button>

        <Button
          type="submit"
          className="bg-mint text-forest hover:bg-mint-light flex items-center gap-2"
          disabled={!isComplete || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("pricing.submitting")}
            </>
          ) : (
            <>
              {t("pricing.buttons.submit")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
