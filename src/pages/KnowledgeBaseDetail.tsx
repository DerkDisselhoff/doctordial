
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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
        <h2 className="text-xl font-semibold text-forest mb-4">Overzicht van 10 voorbeeldonderwerpen met openingszinnen</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Onderwerp</TableHead>
                <TableHead className="whitespace-nowrap">Beschrijving</TableHead>
                <TableHead className="whitespace-nowrap">Voorbeeld patiëntvraag/klacht</TableHead>
                <TableHead className="whitespace-nowrap">Suggestie voor openingszin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">General Malaise in Adults</TableCell>
                <TableCell>Gevoel van algemene ongemak of vermoeidheid, mogelijk door infectie of ziekte.</TableCell>
                <TableCell>"Ik voel me al een paar dagen niet lekker."</TableCell>
                <TableCell>"Hallo, ik voel me sinds een paar dagen echt niet goed en weet niet wat er aan de hand is."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Allergic Reaction/Insect Bite</TableCell>
                <TableCell>Reacties variërend van jeuk tot ernstige allergische klachten na een beet.</TableCell>
                <TableCell>"Ik ben gestoken door een insect en het zwelt op."</TableCell>
                <TableCell>"Hoi, ik ben net door iets gestoken en mijn arm begint te jeuken en op te zwellen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Arm Complaints</TableCell>
                <TableCell>Pijn of zwelling in arm/schouder zonder duidelijke oorzaak.</TableCell>
                <TableCell>"Mijn arm doet pijn en ik weet niet waarom."</TableCell>
                <TableCell>"Goedemiddag, ik heb sinds gisteren pijn in mijn arm en ik maak me een beetje zorgen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stroke</TableCell>
                <TableCell>Plotselinge neurologische symptomen zoals een scheef gezicht of spraakproblemen.</TableCell>
                <TableCell>"Mijn mond hangt scheef en ik kan niet goed praten."</TableCell>
                <TableCell>"Hallo, ik denk dat er iets mis is, mijn gezicht voelt raar en ik kan niet normaal praten."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Blood in the Stool</TableCell>
                <TableCell>Bloed bij de ontlasting, variërend van licht tot ernstig.</TableCell>
                <TableCell>"Ik zie bloed in mijn ontlasting."</TableCell>
                <TableCell>"Hoi, ik heb net naar het toilet geweest en zag bloed, ik weet niet wat ik moet doen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nosebleed</TableCell>
                <TableCell>Een bloedneus die niet stopt ondanks pogingen.</TableCell>
                <TableCell>"Mijn neus bloedt al een tijdje en stopt niet."</TableCell>
                <TableCell>"Goedemorgen, mijn neus blijft maar bloeden en ik krijg het niet gestopt."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bone Fracture</TableCell>
                <TableCell>Mogelijke breuk na een val, met pijn en bewegingsbeperking.</TableCell>
                <TableCell>"Ik ben gevallen en mijn been doet erg pijn."</TableCell>
                <TableCell>"Hallo, ik ben net gevallen en mijn been doet zo'n pijn dat ik bijna niet kan lopen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Burn</TableCell>
                <TableCell>Verbranding door hitte of chemicaliën, met onzekerheid over ernst.</TableCell>
                <TableCell>"Ik heb me verbrand en weet niet hoe erg het is."</TableCell>
                <TableCell>"Hoi, ik heb me net verbrand aan de oven en het ziet er niet goed uit, wat moet ik doen?"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Vomiting</TableCell>
                <TableCell>Braken met mogelijk bloed of ernstige pijn.</TableCell>
                <TableCell>"Ik moet steeds overgeven en voel me beroerd."</TableCell>
                <TableCell>"Goedendag, ik blijf maar overgeven en voel me echt niet lekker, kunt u me helpen?"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Abdominal Pain in Child</TableCell>
                <TableCell>Buikpijn bij een kind, mogelijk met koorts of ander zorgelijk gedrag.</TableCell>
                <TableCell>"Mijn kind heeft buikpijn en ik maak me zorgen."</TableCell>
                <TableCell>"Hallo, mijn zoontje heeft al de hele dag buikpijn en ik weet niet of het ernstig is."</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
