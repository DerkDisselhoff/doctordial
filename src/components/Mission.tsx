import { BookDemoForm } from "./BookDemoForm";

const Mission = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Waarom DoctorDial Bestaat
            </h2>
            <div className="w-20 h-1 bg-mint/30 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-xl font-semibold text-mint">De Uitdaging</h3>
              <p className="text-white/80 leading-relaxed">
                Huisartsenpraktijken worstelen met het beheren van grote belvolumes terwijl ze kwalitatieve patiëntenzorg willen behouden. Gemiste oproepen, lange wachttijden en overbelast personeel zijn veelvoorkomende uitdagingen die zowel de praktijkefficiëntie als de patiënttevredenheid beïnvloeden.
              </p>
            </div>
            
            <div className="space-y-4 p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-xl font-semibold text-mint">Onze Oplossing</h3>
              <p className="text-white/80 leading-relaxed">
                We hebben een AI-oplossing ontwikkeld die transformeert hoe praktijken patiëntcommunicatie afhandelen, waarbij we ervoor zorgen dat geen enkele oproep onbeantwoord blijft terwijl we de hoogste standaarden van de Nederlandse gezondheidszorg handhaven. Ons systeem is getraind op NHG-Triage data en voldoet aan NVDA-standaarden.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;