import { motion } from "framer-motion";
import { Activity, Clock, BrainCog } from "lucide-react";

const PracticeValue = () => {
  return (
    <section className="py-16 px-4 bg-[#D3E4FD]">
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

        {/* New Modern Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative"
          >
            <div className="p-8 bg-white/50 backdrop-blur-sm border border-blue-muted/20 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
              <h3 className="text-xl font-semibold text-gray-dark mb-3 text-center">
                Verminder Werkdruk
              </h3>
              <p className="text-gray text-center">
                Focus op U2, U3 en U4 gevallen terwijl AI de eerste screening doet. Efficiëntere triage leidt tot betere zorgverdeling.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative"
          >
            <div className="p-8 bg-white/50 backdrop-blur-sm border border-blue-muted/20 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-24 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Clock className="w-12 h-12 text-emerald" />
                    <motion.div
                      className="absolute -inset-4 border-2 border-emerald/20 rounded-full"
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
              <h3 className="text-xl font-semibold text-gray-dark mb-3 text-center">
                24/7 Beschikbaar
              </h3>
              <p className="text-gray text-center">
                Bied uw patiënten continue zorg met een AI-assistent die altijd beschikbaar is voor eerste triage en hulp.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group relative"
          >
            <div className="p-8 bg-white/50 backdrop-blur-sm border border-blue-muted/20 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-24 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <BrainCog className="w-12 h-12 text-forest" />
                    <motion.div
                      className="absolute -inset-4 border-2 border-dashed border-forest/40 rounded-full"
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
              <h3 className="text-xl font-semibold text-gray-dark mb-3 text-center">
                Doorlopende Verbetering
              </h3>
              <p className="text-gray text-center">
                Ons AI-model leert continu van nieuwe interacties, wat zorgt voor steeds betere en nauwkeurigere triageresultaten.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PracticeValue;
