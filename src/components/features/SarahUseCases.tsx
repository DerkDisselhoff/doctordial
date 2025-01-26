import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  ArrowRightLeft, 
  HeartPulse, 
  Building2, 
  FileText, 
  SmilePlus
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

const SarahUseCases = () => {
  const { t } = useLanguage();

  const useCases = [
    {
      title: "Forward Urgent Cases",
      description: "Automatically identify and forward U2-U4 urgency cases to the doctor's assistant, ensuring timely response to medical needs.",
      icon: ArrowRightLeft,
      color: "bg-mint"
    },
    {
      title: "Self-Care Guidance",
      description: "Provide personalized self-care advice based on symptoms and medical history, empowering patients with reliable healthcare information.",
      icon: HeartPulse,
      color: "bg-sage"
    },
    {
      title: "Smart Care Routing",
      description: "Efficiently redirect non-relevant care requests to appropriate clinics, optimizing healthcare resource allocation.",
      icon: Building2,
      color: "bg-emerald"
    },
    {
      title: "Conversation Intelligence",
      description: "Transcribe and summarize all conversations, creating detailed records while extracting key medical insights.",
      icon: FileText,
      color: "bg-forest"
    },
    {
      title: "Adaptive Communication",
      description: "Dynamically adjust tone and emotion based on conversation context, ensuring empathetic patient interactions.",
      icon: SmilePlus,
      color: "bg-mint"
    },
    {
      title: "High-Volume Support",
      description: "Handle up to 60 simultaneous calls with consistent quality and personalized attention to each patient.",
      icon: Phone,
      color: "bg-sage"
    }
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-dark">
            Use Cases
          </h2>
          <p className="text-gray max-w-2xl mx-auto">
            Discover how Sarah enhances your medical practice with intelligent call management and patient care coordination.
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
      </div>
    </section>
  );
};

export default SarahUseCases;