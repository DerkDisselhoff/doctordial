
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-[800px] mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 text-mint mb-8 hover:bg-mint/20 transition-colors">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 tracking-tight">
              Privacybeleid
            </h1>
            <p className="text-lg sm:text-xl text-gray">
              Bij DoctorDial hechten we veel waarde aan de bescherming van uw persoonsgegevens. In deze privacyverklaring leggen we uit welke gegevens we verzamelen, waarom we dat doen en hoe we uw privacy waarborgen.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-[800px] mx-auto space-y-12">
              {/* Contact Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">1. Contactgegevens</h2>
                <p className="text-gray">DoctorDial</p>
              </div>

              {/* Personal Data Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">2. Persoonsgegevens die wij verwerken</h2>
                <p className="text-gray mb-4">
                  Wij verwerken uw persoonsgegevens doordat u gebruikmaakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij mogelijk verwerken:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray ml-4">
                  <li>Voor- en achternaam</li>
                  <li>Adresgegevens</li>
                  <li>Telefoonnummer</li>
                  <li>E-mailadres</li>
                  <li>IP-adres</li>
                  <li>Gegevens over uw activiteiten op onze website</li>
                  <li>Internetbrowser en apparaat type</li>
                </ul>
              </div>

              {/* Processing Purposes Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">3. Doeleinden en rechtsgronden voor de verwerking</h2>
                <p className="text-gray mb-4">Wij verwerken uw persoonsgegevens voor de volgende doeleinden:</p>
                <ul className="list-disc list-inside space-y-2 text-gray ml-4 mb-6">
                  <li>Het afhandelen van uw betaling</li>
                  <li>Verzenden van onze nieuwsbrief en/of reclamefolder</li>
                  <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
                  <li>U te informeren over wijzigingen van onze diensten en producten</li>
                  <li>Om goederen en diensten bij u af te leveren</li>
                  <li>DoctorDial analyseert uw gedrag op de website om daarmee de website te verbeteren en het aanbod van producten en diensten af te stemmen op uw voorkeuren</li>
                </ul>
                <p className="text-gray mb-4">De verwerking van uw persoonsgegevens is gebaseerd op de volgende rechtsgronden:</p>
                <ul className="list-disc list-inside space-y-2 text-gray ml-4">
                  <li>Uw toestemming</li>
                  <li>Uitvoering van een overeenkomst</li>
                  <li>Wettelijke verplichting</li>
                  <li>Gerechtvaardigd belang</li>
                </ul>
              </div>

              {/* Third Party Sharing Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">4. Delen van persoonsgegevens met derden</h2>
                <p className="text-gray">
                  Wij verstrekken uw gegevens uitsluitend aan derden als dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens.
                </p>
              </div>

              {/* Cookies Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">5. Cookies, of vergelijkbare technieken, die wij gebruiken</h2>
                <p className="text-gray">
                  DoctorDial gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van uw computer, tablet of smartphone. Bij uw eerste bezoek aan onze website hebben wij u al geïnformeerd over deze cookies en toestemming gevraagd voor het plaatsen ervan.
                </p>
              </div>

              {/* Data Rights Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">6. Gegevens inzien, aanpassen of verwijderen</h2>
                <p className="text-gray">
                  U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door DoctorDial en heeft u het recht op gegevensoverdraagbaarheid. U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@doctordial.io.
                </p>
              </div>

              {/* Security Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-muted/30">
                <h2 className="text-2xl font-semibold text-gray-dark mb-4">7. Hoe wij persoonsgegevens beveiligen</h2>
                <p className="text-gray">
                  DoctorDial neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@doctordial.io.
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

export default Privacy;
