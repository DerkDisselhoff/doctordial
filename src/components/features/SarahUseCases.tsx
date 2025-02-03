
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  ArrowRightLeft, 
  HeartPulse, 
  Building2, 
  FileText, 
  SmilePlus,
  Pointer,
  Settings,
  PhoneCall
} from "lucide-react";

const UseCaseCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  color: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative p-6 rounded-xl border border-gray-muted/20 bg-white shadow-sm transition-all duration-300 h-full group hover:shadow-lg`}
    >
      <div className={`absolute inset-0 opacity-5 pointer-events-none rounded-xl ${color}`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-dark group-hover:text-mint transition-colors">
          {title}
        </h3>
        <p className="text-gray">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
        <div className={`absolute inset-0 ${color} rounded-tl-[100px]`} />
      </div>
    </motion.div>
  );
};

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
    <div className="flex flex-col items-start space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint text-white font-semibold">
          {step}
        </div>
        <div className="w-12 h-12 rounded-lg bg-mint bg-opacity-10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-mint" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-dark">
        {title}
      </h3>
      <p className="text-gray text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const SarahUseCases = () => {
  const { t } = useLanguage();

  const useCases = [
    {
      title: t("sarah.useCases.forward.title"),
      description: t("sarah.useCases.forward.description"),
      icon: ArrowRightLeft,
      color: "bg-mint"
    },
    {
      title: t("sarah.useCases.selfCare.title"),
      description: t("sarah.useCases.selfCare.description"),
      icon: HeartPulse,
      color: "bg-sage"
    },
    {
      title: t("sarah.useCases.routing.title"),
      description: t("sarah.useCases.routing.description"),
      icon: Building2,
      color: "bg-emerald"
    },
    {
      title: t("sarah.useCases.conversation.title"),
      description: t("sarah.useCases.conversation.description"),
      icon: FileText,
      color: "bg-forest"
    },
    {
      title: t("sarah.useCases.communication.title"),
      description: t("sarah.useCases.communication.description"),
      icon: SmilePlus,
      color: "bg-mint"
    },
    {
      title: t("sarah.useCases.support.title"),
      description: t("sarah.useCases.support.description"),
      icon: Phone,
      color: "bg-sage"
    }
  ];

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
    <section className="w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {t("sarah.useCases.title")}
          </h2>
          <p className="text-mint-light/80 max-w-2xl mx-auto">
            {t("sarah.useCases.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UseCaseCard {...useCase} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-white"
          >
            {t("sarah.howToWork")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
    </section>
  );
};

export default SarahUseCases;

