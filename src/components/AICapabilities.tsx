import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import MedicalIntelligenceCard from "./capabilities/MedicalIntelligenceCard";
import ContinuousLearningCard from "./capabilities/ContinuousLearningCard";
import SeamlessIntegrationCard from "./capabilities/SeamlessIntegrationCard";
import WorkerCustomizationCard from "./capabilities/WorkerCustomizationCard";
import HumanExperienceCard from "./capabilities/HumanExperienceCard";
import CapabilityCard from "./capabilities/CapabilityCard";

const AICapabilities = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      title: t("capabilities.medicalIntelligence.title"),
      description: t("capabilities.medicalIntelligence.description"),
      illustration: <MedicalIntelligenceCard />,
    },
    {
      title: t("capabilities.workerCustomization.title"),
      description: t("capabilities.workerCustomization.description"),
      illustration: <WorkerCustomizationCard />,
    },
    {
      title: t("capabilities.humanExperience.title"),
      description: t("capabilities.humanExperience.description"),
      illustration: <HumanExperienceCard />,
    },
    {
      title: t("capabilities.seamlessIntegration.title"),
      description: t("capabilities.seamlessIntegration.description"),
      illustration: <SeamlessIntegrationCard />,
    },
    {
      title: t("capabilities.continuousLearning.title"),
      description: t("capabilities.continuousLearning.description"),
      illustration: <ContinuousLearningCard />,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-100/80 to-blue-light/50 overflow-hidden">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="relative">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-10 left-10 w-32 h-32 bg-mint/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue/20 rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              <motion.path
                d="M100,100 C150,150 250,150 300,100"
                stroke="rgba(16, 185, 129, 0.1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M300,200 C250,250 150,250 100,200"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </svg>
          </motion.div>

          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("capabilities.title")}
            </motion.h2>
            <motion.p 
              className="text-gray max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("capabilities.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative px-8"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {capabilities.map((capability, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <CapabilityCard {...capability} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;