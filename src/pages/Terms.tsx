
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-[800px] mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 text-mint mb-8 hover:bg-mint/20 transition-colors">
              <ScrollText className="w-4 h-4" />
              <span className="text-sm font-medium">Servicevoorwaarden</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 tracking-tight">
              Servicevoorwaarden
            </h1>
            <p className="text-lg sm:text-xl text-gray">
              Laatste update: 25 april 2025
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-[800px] mx-auto space-y-12">
              {/* General Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">1. Algemeen</h2>
                <p className="text-gray">
                  Deze servicevoorwaarden zijn van toepassing op alle diensten van DoctorDial. Door gebruik te maken van onze diensten stemt u in met deze voorwaarden.
                </p>
              </div>

              {/* Service Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">2. Dienstverlening</h2>
                <p className="text-gray">
                  DoctorDial biedt een AI-gestuurde telefonische assistent aan voor huisartsenpraktijken, bedoeld voor triage van inkomende patiëntgesprekken. DoctorDial streeft naar een hoge kwaliteit en beschikbaarheid van diensten, maar biedt geen garanties ten aanzien van foutloze werking of ononderbroken beschikbaarheid.
                </p>
              </div>

              {/* User Obligations Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">3. Verplichtingen gebruiker</h2>
                <p className="text-gray">
                  De gebruiker is verplicht correcte en actuele informatie aan te leveren. DoctorDial is niet aansprakelijk voor eventuele gevolgen die voortvloeien uit het gebruik van incorrecte of onvolledige informatie.
                </p>
              </div>

              {/* Privacy Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">4. Privacy en gegevensverwerking</h2>
                <p className="text-gray">
                  DoctorDial verwerkt persoonsgegevens in overeenstemming met onze privacyverklaring. De gebruiker is verantwoordelijk voor het informeren van patiënten over het gebruik van DoctorDial conform de AVG-wetgeving.
                </p>
              </div>

              {/* Payment Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">5. Betalingen en tarieven</h2>
                <p className="text-gray">
                  Gebruikers dienen facturen binnen 14 dagen na ontvangst te voldoen. DoctorDial behoudt het recht voor tarieven periodiek aan te passen, waarbij gebruikers hierover vooraf worden geïnformeerd.
                </p>
              </div>

              {/* Liability Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">6. Aansprakelijkheid</h2>
                <p className="text-gray">
                  DoctorDial aanvaardt geen aansprakelijkheid voor directe of indirecte schade die voortvloeit uit het gebruik van haar diensten, behoudens gevallen van opzet of grove schuld.
                </p>
              </div>

              {/* Intellectual Property Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">7. Intellectueel eigendom</h2>
                <p className="text-gray">
                  Alle intellectuele eigendomsrechten met betrekking tot de diensten en technologie van DoctorDial blijven eigendom van DoctorDial.
                </p>
              </div>

              {/* Changes to Terms Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">8. Wijzigingen voorwaarden</h2>
                <p className="text-gray">
                  DoctorDial behoudt zich het recht voor deze voorwaarden te wijzigen. Wijzigingen worden minstens 14 dagen vooraf aan gebruikers bekendgemaakt via e-mail of de website.
                </p>
              </div>

              {/* Applicable Law Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">9. Toepasselijk recht en geschillen</h2>
                <p className="text-gray">
                  Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden exclusief voorgelegd aan de bevoegde rechter te Amsterdam.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
