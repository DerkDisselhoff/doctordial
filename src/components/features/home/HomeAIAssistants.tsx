
import { Phone, Pill, Microscope, Calendar, Heart, HelpCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AssistantCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const AssistantCard = ({ title, description, icon, color, delay }: AssistantCardProps) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`h-full border-gray-muted/20 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-${color}/5 overflow-hidden`}>
        <CardContent className="p-6 h-full flex flex-col">
          <div className={`w-14 h-14 rounded-full bg-${color}/10 flex items-center justify-center mb-4`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-gray-dark">{title}</h3>
          <p className="text-gray flex-grow mb-4">{description}</p>
          
          <Link to="/demo-request" className="mt-auto">
            <Button 
              variant="outline" 
              className={`border-${color} text-${color}-dark hover:bg-${color}/10 w-full`}
            >
              {t("assistants.moreInfo")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HomeAIAssistants = () => {
  const { t } = useLanguage();
  
  const assistants = [
    {
      title: t("assistants.triage.title"),
      description: t("assistants.triage.description"),
      icon: <Phone className="h-7 w-7 text-mint" />,
      color: "mint",
      delay: 0.1
    },
    {
      title: t("assistants.medication.title"),
      description: t("assistants.medication.description"),
      icon: <Pill className="h-7 w-7 text-sage" />,
      color: "sage",
      delay: 0.15
    },
    {
      title: t("assistants.research.title"),
      description: t("assistants.research.description"),
      icon: <Microscope className="h-7 w-7 text-forest" />,
      color: "forest",
      delay: 0.2
    },
    {
      title: t("assistants.appointments.title"),
      description: t("assistants.appointments.description"),
      icon: <Calendar className="h-7 w-7 text-mint" />,
      color: "mint",
      delay: 0.25
    },
    {
      title: t("assistants.followUp.title"),
      description: t("assistants.followUp.description"),
      icon: <Heart className="h-7 w-7 text-sage" />,
      color: "sage",
      delay: 0.3
    },
    {
      title: t("assistants.faq.title"),
      description: t("assistants.faq.description"),
      icon: <HelpCircle className="h-7 w-7 text-forest" />,
      color: "forest",
      delay: 0.35
    },
    {
      title: t("assistants.administrative.title"),
      description: t("assistants.administrative.description"),
      icon: <FileText className="h-7 w-7 text-mint" />,
      color: "mint",
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-mint-light/10 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-dark">
            {t("assistants.title")}
          </h2>
          <p className="text-gray max-w-2xl mx-auto">
            {t("assistants.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assistants.map((assistant, index) => (
            <AssistantCard key={index} {...assistant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAIAssistants;
