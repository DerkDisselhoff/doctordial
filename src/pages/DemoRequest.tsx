
import { MultiStepPricingForm } from "@/components/pricing2/MultiStepPricingForm";
import { Logo } from "@/components/Logo";
import { Quote } from "lucide-react";
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
              <Logo className="text-mint mb-8 w-48" />
              <p className="text-sm font-medium text-mint mb-4 tracking-wide uppercase">{t("demo.title")}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-xl">{t("demo.subtitle")}</h1>
              <p className="text-lg text-gray-200 max-w-xl leading-relaxed">
                {t("capabilities.title")}
              </p>
            </div>

            {/* Featured testimonial */}
            <div className="bg-forest-dark/50 rounded-xl border border-mint/10 p-8 shadow-lg backdrop-blur-sm">
              <Quote className="text-mint w-10 h-10 mb-6" />
              <p className="text-gray-200 text-xl leading-relaxed mb-8">
                "DoctorDial has transformed how we handle patient calls. The AI system is incredibly accurate and has significantly reduced the workload on our staff. It's been a game-changer for our practice."
              </p>
              <div className="flex items-center gap-5">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt="Dr. Sarah Chen"
                  className="w-14 h-14 rounded-full object-cover border-2 border-mint/20"
                />
                <div>
                  <p className="font-medium text-white text-lg">Dr. Sarah Chen</p>
                  <p className="text-mint/80 font-medium">GP Practice Lead</p>
                </div>
              </div>
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
