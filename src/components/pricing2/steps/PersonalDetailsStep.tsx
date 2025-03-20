
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

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
        <p className="text-sm text-gray-500 mb-2">{t("pricing.step").replace("{number}", "2")}</p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("pricing.personalDetails.title")}</h2>
        <p className="text-gray-500">{t("pricing.personalDetails.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700">{t("pricing.personalDetails.fullName")}</Label>
          <Input
            id="name"
            name="name"
            defaultValue={data.name}
            placeholder={t("pricing.personalDetails.placeholder.name")}
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-gray-700">{t("pricing.personalDetails.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={data.email}
            placeholder={t("pricing.personalDetails.placeholder.email")}
            className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-gray-700">{t("pricing.personalDetails.phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={data.phone}
            placeholder={t("pricing.personalDetails.placeholder.phone")}
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
          {t("pricing.buttons.back")}
        </Button>
        <Button type="submit" className="bg-forest hover:bg-forest-light text-white">
          {t("pricing.buttons.next")}
        </Button>
      </div>
    </form>
  );
};
