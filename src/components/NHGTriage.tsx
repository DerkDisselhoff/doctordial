
import { BookOpen, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { Card } from "./ui/card";

const NHGTriage = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-light/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark">
            Gebouwd op NHG Triage Standaarden
          </h2>
          <p className="text-gray text-lg md:text-xl max-w-2xl mx-auto">
            Betrouwbare patiëntenzorg met evidence-based triageprotocollen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-muted">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-mint-light flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-semibold text-gray-dark">NHG Standaarden</h3>
              <p className="text-gray text-sm">
                Volledig gebaseerd op de officiële NHG triagerichtlijnen voor betrouwbare zorgverlening
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-muted">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-light flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-dark" />
              </div>
              <h3 className="font-semibold text-gray-dark">Medische Training</h3>
              <p className="text-gray text-sm">
                AI model getrained op uitgebreide NHG triage datasets voor accurate beoordeling
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-muted">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-mint-light flex items-center justify-center">
                <Users className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-semibold text-gray-dark">Specialist Samenwerking</h3>
              <p className="text-gray text-sm">
                Ontwikkeld in nauwe samenwerking met ervaren medische specialisten
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-muted">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-light flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-dark" />
              </div>
              <h3 className="font-semibold text-gray-dark">Continue Verbetering</h3>
              <p className="text-gray text-sm">
                Voortdurende ontwikkeling met feedback van medische professionals
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-muted rounded-full px-6 py-2">
            <img src="/assets/nhg-logo.svg" alt="NHG Logo" className="w-6 h-6" />
            <span className="text-sm text-gray">Officieel gebaseerd op NHG triagestandaarden</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NHGTriage;
