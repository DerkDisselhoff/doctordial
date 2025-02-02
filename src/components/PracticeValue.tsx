
import { motion } from "framer-motion";
import { Clock, Activity, BrainCog } from "lucide-react";
import CapabilityCard from "./capabilities/CapabilityCard";

const PracticeValue = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              Maximaliseer de Waarde van Uw Praktijk
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              Optimaliseer uw praktijkefficiëntie met AI-gestuurde triagesystemen
            </p>
          </motion.div>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CapabilityCard
              title="Verminder Werkdruk"
              description="Focus op U2, U3 en U4 gevallen terwijl AI de eerste screening doet. Efficiëntere triage leidt tot betere zorgverdeling."
              illustration={
                <div className="relative h-24 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <Activity className="w-12 h-12 text-mint" />
                      <motion.div
                        className="absolute -inset-4 border-2 border-mint/20 rounded-full"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 0.3, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CapabilityCard
              title="24/7 Beschikbaar"
              description="Bied uw patiënten continue zorg met een AI-assistent die altijd beschikbaar is voor eerste triage en hulp."
              illustration={
                <div className="relative h-24 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <Clock className="w-12 h-12 text-mint" />
                      <motion.div
                        className="absolute -inset-4 border-2 border-mint/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CapabilityCard
              title="Doorlopende Verbetering"
              description="Ons AI-model leert continu van nieuwe interacties, wat zorgt voor steeds betere en nauwkeurigere triageresultaten."
              illustration={
                <div className="relative h-24 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <BrainCog className="w-12 h-12 text-mint" />
                      <motion.div
                        className="absolute -inset-4 border-2 border-dashed border-mint/40 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>

        {/* Bottom Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-white border border-blue-muted/20 rounded-2xl p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-mint mb-2">30%</p>
              <p className="text-gray">Werkdruk Vermindering</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-mint mb-2">24/7</p>
              <p className="text-gray">Beschikbaarheid</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-mint mb-2">95%</p>
              <p className="text-gray">Triage Nauwkeurigheid</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PracticeValue;
