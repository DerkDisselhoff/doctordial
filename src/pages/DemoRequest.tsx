
import { MultiStepPricingForm } from "@/components/pricing2/MultiStepPricingForm";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const DemoRequest = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side content */}
          <div className="lg:sticky lg:top-8">          
            <div className="mb-12">
              <Logo className="text-white mb-8" linkClassName="items-center" />
              <p className="text-sm font-medium text-mint mb-4 tracking-wide uppercase">{t("demo.title")}</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-[90%] lg:max-w-[600px]">
                {t("demo.subtitle")}
              </h2>
              <p className="text-xl text-gray-200 max-w-xl leading-relaxed">
                {t("capabilities.title")}
              </p>
            </div>
          </div>

          {/* Right side form */}
          <div className="bg-forest-dark/50 rounded-xl border border-mint/10 p-8 backdrop-blur-sm">
            <MultiStepPricingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequest;

