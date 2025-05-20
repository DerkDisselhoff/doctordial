
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-mint-light/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-dark">
            {t("testimonials.title")}
          </h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-muted/20">
            <Quote className="absolute text-mint/20 w-16 h-16 -top-6 left-6" />
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/4 flex justify-center">
                <img 
                  src="/lovable-uploads/9c31cf7d-d44e-4c3a-9362-ab5bf5a1daeb.png" 
                  alt="Medi-Mere Logo" 
                  className="w-32 md:w-full max-w-[150px] object-contain"
                />
              </div>
              
              <div className="md:w-3/4">
                <p className="text-gray mb-6 italic relative z-10">
                  {t("testimonials.mediMere.quote")}
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/8d7ff7a5-5223-47f8-92fc-16d1a2ef93d2.png" 
                    alt="Annabelle Wit" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-mint-light"
                  />
                  <div>
                    <p className="font-semibold text-gray-dark">Annabelle Wit</p>
                    <p className="text-sm text-gray">Leidinggevende Communicatie Centrum</p>
                    <p className="text-sm text-mint">Huisartsenpraktijken Medi-Mere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
