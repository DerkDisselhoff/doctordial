
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";

const TestScriptTriageContent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-forest">Testinstructies voor de AI-triage-assistent</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Introductie</h2>
        <p className="text-gray-700">
          Met deze testinstructies kunnen medewerkers van de praktijk de AI-triage-assistent bellen en de functionaliteit testen. 
          Het doel is om te testen hoe de AI reageert op verschillende klachten, welke triagevragen het stelt en welk urgentieniveau wordt bepaald. 
          Volg onderstaande stappen om de test uit te voeren:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li><strong>Bel de AI-assistent:</strong> Gebruik het telefoonnummer of de toegangscode die is verstrekt voor de AI-triage-assistent.</li>
          <li><strong>Kies een onderwerp:</strong> Selecteer een van de 10 voorbeeldonderwerpen uit de tabel hieronder.</li>
          <li><strong>Start het gesprek:</strong> Begin met de voorgestelde openingszin (of een variatie daarop) om de klacht te introduceren. Speel de rol van een patiënt en wees zo realistisch mogelijk.</li>
          <li><strong>Beantwoord de vragen:</strong> Reageer op de triagevragen die de AI stelt. Gebruik logische antwoorden die passen bij de klacht (bijv. "Ja, ik heb koorts van 39 graden" of "Nee, ik kan mijn arm normaal bewegen"). Je kunt variëren in antwoorden om verschillende urgentieniveaus te testen (U1 t/m U5).</li>
          <li><strong>Noteer de uitkomst:</strong> Schrijf op hoe de AI reageert: welke vragen worden gesteld, welk urgentieniveau wordt toegewezen, en of de reactie logisch en behulpzaam is.</li>
          <li><strong>Herhaal met andere onderwerpen:</strong> Test meerdere onderwerpen om een breed beeld te krijgen van de AI's prestaties.</li>
          <li><strong>Rapporteer feedback:</strong> Geef eventuele opmerkingen of problemen door aan het ontwikkelteam (bijv. als de AI een vraag verkeerd begrijpt of een onverwachte reactie geeft).</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Tips voor testers</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Spreek duidelijk en gebruik alledaagse taal, zoals een patiënt dat zou doen.</li>
          <li>Test zowel eenvoudige als complexe scenario's (bijv. milde klachten vs. ernstige symptomen).</li>
          <li>Als je onzeker bent over antwoorden, baseer je dan op de triagevragen en urgentieniveaus uit de kennisbank.</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Voorbeeldonderwerpen voor testen</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onderwerp</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voorbeeldopening</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Te testen scenario's</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hoesten</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">"Ik hoest al een paar dagen en voel me niet lekker."</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Milde hoest, hoest met koorts, hoest met benauwdheid</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Buikpijn</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">"Ik heb al twee dagen buikpijn."</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Milde buikpijn, acute buikpijn, buikpijn met koorts</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hoofdpijn</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">"Ik heb een erge hoofdpijn die niet weggaat."</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Milde hoofdpijn, migraine, acute ernstige hoofdpijn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KnowledgeBaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle back button 
  const handleBack = () => {
    window.close();
  };

  // Render content based on ID
  const renderContent = () => {
    switch (id) {
      case "test-script-triage":
        return <TestScriptTriageContent />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700">Content niet gevonden</h2>
            <p className="text-gray-500 mt-2">Het gevraagde kennisbank item bestaat niet of is verwijderd.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logo and back button */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-mint/10 text-mint">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-semibold text-forest">AI Assistenten Kennisbank</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleBack} className="text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sluiten
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white p-8">
          {renderContent()}
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI Assistenten - Alle rechten voorbehouden
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeBaseDetail;
