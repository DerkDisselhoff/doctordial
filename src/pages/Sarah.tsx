import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Button } from "@/components/ui/button";
import SarahSymptomTags from "@/components/features/SarahSymptomTags";
import SarahUseCases from "@/components/features/SarahUseCases";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import StatsBadge from "@/components/hero/StatsBadge";
import TrainSarahCard from "@/components/capabilities/TrainSarahCard";
import WorkflowRulesCard from "@/components/capabilities/WorkflowRulesCard";
import TakeCallsCard from "@/components/capabilities/TakeCallsCard";
import PracticeValue from "@/components/PracticeValue";

const Sarah = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="bg-forest">
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-mint/20 text-mint-light border-mint-light/20 px-4 py-1.5">
                  <Bot className="w-4 h-4 mr-1" />
                  {t('sarah.aiPowered')}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {t('sarah.title')}
              </h1>
              <p className="text-gray-muted text-lg md:text-xl max-w-2xl">
                {t('sarah.subtitle')}
              </p>
              <div className="pt-4">
                <BookDemoForm>
                  <Button className="bg-blue-dark hover:bg-blue-dark/90 text-white">
                    {t('sarah.hire')}
                  </Button>
                </BookDemoForm>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative lg:h-[600px]"
            >
              <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-visible shadow-2xl border border-mint/10 h-full bg-forest-light">
                <img
                  src="/lovable-uploads/8cc89b28-b673-4f32-92b9-ea395078b319.png"
                  alt={t('sarah.imageAlt')}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                <StatsBadge value="24/7" label={t('assistant.support')} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SarahUseCases />
        </div>
      </section>

      <section className="bg-gray-dark py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {t('sarah.howToWork')}
          </h2>
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-lg bg-mint/10">
                  <span className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-mint">1</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-dark mb-4">
                      {t('sarah.step1Title')}
                    </h3>
                    <p className="text-lg text-gray leading-relaxed">
                      {t('sarah.step1Description')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <TrainSarahCard />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-lg bg-mint/10">
                  <span className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-mint">2</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-dark mb-4">
                      {t('sarah.step2Title')}
                    </h3>
                    <p className="text-lg text-gray leading-relaxed">
                      {t('sarah.step2Description')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <WorkflowRulesCard />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-10 border border-gray-muted/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-lg bg-mint/10">
                  <span className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-mint">3</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-dark mb-4">
                      {t('sarah.step3Title')}
                    </h3>
                    <p className="text-lg text-gray leading-relaxed">
                      {t('sarah.step3Description')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <TakeCallsCard />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <PracticeValue />

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 border border-gray-muted/20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                {t('sarah.conditionsTitle')}
              </h3>
            </div>
            <SarahSymptomTags />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-forest-light/5 rounded-2xl p-8 border border-mint/10">
            <h2 className="text-2xl font-bold text-gray-dark mb-4">
              {t('sarah.readyTitle')}
            </h2>
            <p className="text-gray mb-6">
              {t('sarah.readyDescription')}
            </p>
            <BookDemoForm>
              <Button className="bg-blue-dark hover:bg-blue-dark/90 text-white">
                {t('demo.submit')}
              </Button>
            </BookDemoForm>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Sarah;
