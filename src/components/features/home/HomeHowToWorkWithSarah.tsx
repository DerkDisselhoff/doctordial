
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pointer, Settings, PhoneCall } from "lucide-react";
import TrainSarahCard from "../../capabilities/TrainSarahCard";
import WorkflowRulesCard from "../../capabilities/WorkflowRulesCard";
import TakeCallsCard from "../../capabilities/TakeCallsCard";
import { Link } from "react-router-dom";

const StepCard = ({
  step,
  title,
  description,
  icon: Icon,
  animationType
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  animationType: "train" | "workflow" | "calls" | null;
}) => {
  const renderAnimation = () => {
    switch (animationType) {
      case "train":
        return <TrainSarahCard />;
      case "workflow":
        return <WorkflowRulesCard />;
      case "calls":
        return <TakeCallsCard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="w-full bg-white rounded-xl border border-mint/10 hover:border-mint/20 transition-all duration-300 h-[200px] overflow-hidden">
        <div className="w-full h-full">
          {renderAnimation()}
        </div>
      </div>
      <div className="flex items-center space-x-2 px-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint text-white font-semibold">
            {step}
          </div>
          <h3 className="text-xl font-semibold text-gray-dark text-left">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-gray-dark text-sm leading-relaxed text-left line-clamp-4 overflow-hidden px-2">
        {description}
      </p>
    </div>
  );
};

const HomeHowToWorkWithSarah = () => {
  const { t } = useLanguage();

  const steps = [
    {
      title: `${t("sarah.step1Title")}`,
      description: t("sarah.step1Description"),
      icon: Pointer,
      animationType: "train" as const
    },
    {
      title: `${t("sarah.step2Title")}`,
      description: t("sarah.step2Description"),
      icon: Settings,
      animationType: "workflow" as const
    },
    {
      title: `${t("sarah.step3Title")}`,
      description: t("sarah.step3Description"),
      icon: PhoneCall,
      animationType: "calls" as const
    }
  ];

  return (
    <div className="bg-gradient-to-br from-mint-light/90 to-blue-light/90 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-mint/20">
      <div className="flex flex-col space-y-2">
        <h2 className="text-[1.875rem] font-semibold text-gray-dark text-left">
          {t("sarah.howToWork")}
        </h2>
        <p className="text-gray-dark/80 text-lg text-left">
          {t("sarah.howToWorkSubtitle")}
        </p>
        <div className="flex justify-start mt-4">
          <Link
            to="/demo-request"
            className="px-6 py-3 bg-blue hover:bg-blue/90 text-gray-dark font-medium rounded-full transition-colors duration-300"
          >
            {t("sarah.requestDemo")}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-8">
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
              animationType={step.animationType}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeHowToWorkWithSarah;
