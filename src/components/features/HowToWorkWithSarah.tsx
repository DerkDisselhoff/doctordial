
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pointer, Settings, PhoneCall } from "lucide-react";

const StepCard = ({
  step,
  title,
  description,
  icon: Icon
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex flex-col items-start space-y-4 bg-white p-6 rounded-xl border border-mint/10 hover:border-mint/20 transition-all duration-300 h-[280px]">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint text-white font-semibold">
          {step}
        </div>
        <div className="w-12 h-12 rounded-lg bg-mint bg-opacity-10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-mint" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-dark text-left">
        {title}
      </h3>
      <p className="text-gray-dark text-sm leading-relaxed text-left line-clamp-4 overflow-hidden">
        {description}
      </p>
    </div>
  );
};

const HowToWorkWithSarah = () => {
  const { t } = useLanguage();

  const steps = [
    {
      title: t("sarah.step1Title"),
      description: t("sarah.step1Description"),
      icon: Pointer
    },
    {
      title: t("sarah.step2Title"),
      description: t("sarah.step2Description"),
      icon: Settings
    },
    {
      title: t("sarah.step3Title"),
      description: t("sarah.step3Description"),
      icon: PhoneCall
    }
  ];

  return (
    <div className="px-4">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center mb-12 text-white"
      >
        {t("sarah.howToWork")}
      </motion.h3>
      <div className="container mx-auto max-w-7xl bg-gradient-to-br from-mint-light/90 to-blue-light/90 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-mint/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <StepCard
                step={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToWorkWithSarah;

