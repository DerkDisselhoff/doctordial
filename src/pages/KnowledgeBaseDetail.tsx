import { ArrowLeft, FileText, Flag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const TestScriptTriageContent = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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

      {/* Video Demonstration */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Video Demonstratie</h2>
        <p className="text-gray-700 mb-4">
          Bekijk onderstaande video voor een praktische demonstratie van hoe je de AI-triage-assistent kunt testen:
        </p>
        <div className="relative pb-[53.02083333333333%] h-0 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.loom.com/embed/d34ee032b79a4ee7b9b1caa60562ce14?sid=7a1db1f8-8302-473b-a696-cfcd7f47ba86" 
            frameBorder="0" 
            allowFullScreen 
            className="absolute top-0 left-0 w-full h-full shadow-md"
          ></iframe>
        </div>
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

      {/* Flagging Section - Moved to bottom */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Markeren van gesprekken (Flagging)</h2>
        <p className="text-gray-700 mb-4">
          Na het testen van de AI-triage-assistent kun je de kwaliteit van het gesprek beoordelen door de "Flag This Call" functie te gebruiken:
        </p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-forest mb-2">Hoe markeer je een gesprek?</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Ga naar de gespreksdetailpagina van het geteste gesprek.</li>
              <li>Klik op de knop <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"><Flag className="h-3 w-3 text-mint" /> Flag This Call</span> rechtsboven in het scherm.</li>
              <li>Kies in het dropdown menu een van de volgende opties:</li>
            </ol>
            
            <div className="mt-3 pl-5">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Wrong Urgency Level</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-orange-500" />
                  <span>Wrong Questions from AI</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-red-500" />
                  <span>Messy Conversation, Not Smooth</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-blue-500" />
                  <span>Other</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-forest mb-2">Bij het markeren:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Voor "Wrong Urgency Level": Geef het juiste urgentieniveau aan (U1-U5).</li>
                <li>Voor alle opties: Voeg aanvullende notities toe die het probleem beschrijven.</li>
                <li>Klik op "Submit Flag" om de markering te voltooien.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mt-4">
          Deze markeringen zijn essentieel om de AI-assistent te verbeteren. Ze worden regelmatig door ons team geanalyseerd om patronen te identificeren en aanpassingen te maken.
        </p>
      </div>
    </div>
  );
};

const TestScriptMedicatieContent = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-forest">Testinstructies voor de AI-medicatie-assistent (herhaalrecepten)</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Introductie</h2>
        <p className="text-gray-700">
          Met deze testinstructies kunnen medewerkers van de praktijk de AI-medicatie-assistent bellen en de functionaliteit voor herhaalrecepten testen. 
          Het doel is om te testen hoe de AI reageert op verschillende medicatieverzoeken, welke verificatievragen worden gesteld en hoe de verwerking van herhaalrecepten verloopt. 
          Volg onderstaande stappen om de test uit te voeren:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li><strong>Bel de AI-assistent:</strong> Gebruik het telefoonnummer of de toegangscode die is verstrekt voor de AI-medicatie-assistent.</li>
          <li><strong>Kies een medicatieverzoek:</strong> Selecteer een van de 10 voorbeeldmedicaties uit de tabel hieronder.</li>
          <li><strong>Start het gesprek:</strong> Begin met de voorgestelde openingszin (of een variatie daarop) om een herhaalrecept aan te vragen. Speel de rol van een patiënt en wees zo realistisch mogelijk.</li>
          <li><strong>Beantwoord de vragen:</strong> Reageer op de verificatievragen die de AI stelt. Gebruik logische antwoorden die passen bij het medicatieverzoek (bijv. geboortedatum, contactgegevens, laatste controle).</li>
          <li><strong>Noteer de uitkomst:</strong> Schrijf op hoe de AI reageert: welke vragen worden gesteld, hoe het verzoek wordt verwerkt, en of de reactie logisch en behulpzaam is.</li>
          <li><strong>Herhaal met andere medicaties:</strong> Test meerdere medicatieverzoeken om een breed beeld te krijgen van de AI's prestaties.</li>
          <li><strong>Rapporteer feedback:</strong> Geef eventuele opmerkingen of problemen door aan het ontwikkelteam (bijv. als de AI een medicatienaam verkeerd begrijpt of een onverwachte reactie geeft).</li>
        </ol>
      </div>

      {/* Video Demonstration */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Video Demonstratie</h2>
        <p className="text-gray-700 mb-4">
          Bekijk onderstaande video voor een praktische demonstratie van hoe je de AI-medicatie-assistent kunt testen:
        </p>
        <div className="relative pb-[53.02083333333333%] h-0 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.loom.com/embed/d34ee032b79a4ee7b9b1caa60562ce14?sid=7a1db1f8-8302-473b-a696-cfcd7f47ba86" 
            frameBorder="0" 
            allowFullScreen 
            className="absolute top-0 left-0 w-full h-full shadow-md"
          ></iframe>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Tips voor testers</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Spreek duidelijk en gebruik alledaagse taal, zoals een patiënt dat zou doen.</li>
          <li>Test verschillende scenario's (bijv. reguliere medicatie, medicatie die specifieke monitoring vereist).</li>
          <li>Test ook randgevallen zoals medicatie die langere tijd niet is gebruikt of net gewijzigde medicatie.</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Overzicht van 10 voorbeeldmedicaties met openingszinnen</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Medicatie</TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Voorbeeld patiëntverzoek</TableHead>
                <TableHead className="whitespace-nowrap">Suggestie voor openingszin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Metformine</TableCell>
                <TableCell>Diabetes medicatie</TableCell>
                <TableCell>"Ik heb een nieuw recept nodig voor mijn diabetes medicijnen."</TableCell>
                <TableCell>"Goedemorgen, ik wil graag een herhaalrecept aanvragen voor mijn metformine tabletten voor diabetes."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Simvastatine</TableCell>
                <TableCell>Cholesterol-verlager</TableCell>
                <TableCell>"Mijn cholesterolpillen zijn bijna op."</TableCell>
                <TableCell>"Hallo, ik heb nog maar voor 3 dagen aan simvastatine over en zou graag een herhaalrecept willen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Omeprazol</TableCell>
                <TableCell>Maagzuurremmer</TableCell>
                <TableCell>"Ik heb weer last van mijn maag en mijn medicijnen zijn op."</TableCell>
                <TableCell>"Goedemiddag, ik gebruik omeprazol voor mijn maagklachten en zou graag een nieuw recept ontvangen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Levothyroxine</TableCell>
                <TableCell>Schildklierhormoon</TableCell>
                <TableCell>"Ik heb nieuwe schildkliermedicatie nodig."</TableCell>
                <TableCell>"Hoi, ik neem dagelijks levothyroxine voor mijn schildklier en zou graag een herhaalrecept kunnen krijgen?"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Salbutamol</TableCell>
                <TableCell>Luchtwegverwijder</TableCell>
                <TableCell>"Mijn astma-inhalator is bijna leeg."</TableCell>
                <TableCell>"Goedemorgen, ik gebruik een salbutamol inhalator voor mijn astma en heb een nieuwe nodig."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Enalapril</TableCell>
                <TableCell>Bloeddrukverlager</TableCell>
                <TableCell>"Ik moet mijn bloeddrukpillen vernieuwen."</TableCell>
                <TableCell>"Hallo, zou ik een herhaalrecept kunnen krijgen voor mijn enalapril tabletten voor mijn bloeddruk?"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Diclofenac</TableCell>
                <TableCell>Pijnstiller/ontstekingsremmer</TableCell>
                <TableCell>"Ik heb weer pijnstillers nodig voor mijn gewrichten."</TableCell>
                <TableCell>"Hoi, ik zou graag diclofenac willen aanvragen voor mijn chronische gewrichtspijn."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Amoxicilline</TableCell>
                <TableCell>Antibioticum</TableCell>
                <TableCell>"Ik moet mijn antibioticakuur afmaken maar ben door mijn pillen heen."</TableCell>
                <TableCell>"Goedemiddag, ik ben bezig met een antibioticakuur met amoxicilline maar heb niet genoeg om de kuur af te maken."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Desloratadine</TableCell>
                <TableCell>Antihistaminicum</TableCell>
                <TableCell>"Mijn allergiemedicijnen zijn op en het pollenseizoen begint."</TableCell>
                <TableCell>"Goedemorgen, ik gebruik desloratadine voor mijn hooikoorts en zou graag een nieuw recept ontvangen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Acenocoumarol</TableCell>
                <TableCell>Antistollingsmiddel</TableCell>
                <TableCell>"Ik heb nieuwe bloedverdunners nodig."</TableCell>
                <TableCell>"Hallo, ik gebruik acenocoumarol als bloedverdunner en zou graag een herhaalrecept willen voor de komende periode."</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Flagging Section - Moved to bottom */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Markeren van gesprekken (Flagging)</h2>
        <p className="text-gray-700 mb-4">
          Na het testen van de AI-medicatie-assistent kun je de kwaliteit van het gesprek beoordelen door de "Flag This Call" functie te gebruiken:
        </p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-forest mb-2">Hoe markeer je een gesprek?</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Ga naar de gespreksdetailpagina van het geteste gesprek.</li>
              <li>Klik op de knop <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"><Flag className="h-3 w-3 text-mint" /> Flag This Call</span> rechtsboven in het scherm.</li>
              <li>Kies in het dropdown menu een van de volgende opties:</li>
            </ol>
            
            <div className="mt-3 pl-5">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Wrong questions from AI</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-orange-500" />
                  <span>Messy conversation, not smooth</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-blue-500" />
                  <span>Other issue</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-forest mb-2">Bij het markeren:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Voor alle opties: Voeg aanvullende notities toe die het probleem beschrijven.</li>
                <li>Wees zo specifiek mogelijk over wat er mis ging tijdens het gesprek.</li>
                <li>Klik op "Submit Flag" om de markering te voltooien.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mt-4">
          Deze markeringen zijn essentieel om de AI-assistent te verbeteren. Ze worden regelmatig door ons team geanalyseerd om patronen te identificeren en aanpassingen te maken in de gespreksstromen.
        </p>
      </div>
    </div>
  );
};

const TestScriptOnderzoekContent = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-forest">Testinstructies voor de AI-onderzoeksuitslagen-assistent (terugbelverzoek)</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Introductie</h2>
        <p className="text-gray-700">
          Met deze testinstructies kunnen medewerkers van de praktijk de AI-onderzoeksuitslagen-assistent bellen en de functionaliteit voor het opvragen van onderzoeksuitslagen testen. 
          Het doel is om te testen hoe de AI reageert op verschillende verzoeken om uitslagen, welke verificatievragen worden gesteld en hoe terugbelverzoeken worden verwerkt. 
          Volg onderstaande stappen om de test uit te voeren:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li><strong>Bel de AI-assistent:</strong> Gebruik het telefoonnummer of de toegangscode die is verstrekt voor de AI-onderzoeksuitslagen-assistent.</li>
          <li><strong>Kies een onderzoeksuitslag:</strong> Selecteer een van de 10 voorbeeldonderzoeken uit de tabel hieronder.</li>
          <li><strong>Start het gesprek:</strong> Begin met de voorgestelde openingszin (of een variatie daarop) om te vragen naar een onderzoeksuitslag. Speel de rol van een patiënt en wees zo realistisch mogelijk.</li>
          <li><strong>Beantwoord de vragen:</strong> Reageer op de verificatievragen die de AI stelt. Gebruik logische antwoorden die passen bij het verzoek (bijv. geboortedatum, datum van onderzoek).</li>
          <li><strong>Noteer de uitkomst:</strong> Schrijf op hoe de AI reageert: welke vragen worden gesteld, hoe het terugbelverzoek wordt verwerkt, en of de reactie logisch en behulpzaam is.</li>
          <li><strong>Herhaal met andere onderzoeken:</strong> Test meerdere onderzoeken om een breed beeld te krijgen van de AI's prestaties.</li>
          <li><strong>Rapporteer feedback:</strong> Geef eventuele opmerkingen of problemen door aan het ontwikkelteam (bijv. als de AI een onderzoek verkeerd begrijpt of een onverwachte reactie geeft).</li>
        </ol>
      </div>

      {/* Video Demonstration */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Video Demonstratie</h2>
        <p className="text-gray-700 mb-4">
          Bekijk onderstaande video voor een praktische demonstratie van hoe je de AI-onderzoeksuitslagen-assistent kunt testen:
        </p>
        <div className="relative pb-[53.02083333333333%] h-0 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.loom.com/embed/d34ee032b79a4ee7b9b1caa60562ce14?sid=7a1db1f8-8302-473b-a696-cfcd7f47ba86" 
            frameBorder="0" 
            allowFullScreen 
            className="absolute top-0 left-0 w-full h-full shadow-md"
          ></iframe>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-forest">Tips voor testers</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Spreek duidelijk en gebruik alledaagse taal, zoals een patiënt dat zou doen.</li>
          <li>Test verschillende scenario's (bijv. routine bloedonderzoek, specifiek onderzoek na verwijzing).</li>
          <li>Test ook scenario's waarbij een patiënt urgente uitslagen wil hebben versus routinematige uitslagen.</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Overzicht van 10 voorbeeldonderzoeken met openingszinnen</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Onderzoek</TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Voorbeeld patiëntverzoek</TableHead>
                <TableHead className="whitespace-nowrap">Suggestie voor openingszin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Bloedonderzoek</TableCell>
                <TableCell>Algemeen bloedbeeld</TableCell>
                <TableCell>"Ik wil graag de uitslag van mijn bloedonderzoek weten."</TableCell>
                <TableCell>"Goedemorgen, ik heb vorige week bloed laten prikken en zou graag de resultaten willen weten."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Urineonderzoek</TableCell>
                <TableCell>Urinekweek</TableCell>
                <TableCell>"Is mijn urine-onderzoek al bekend?"</TableCell>
                <TableCell>"Hallo, ik heb maandag een potje urine ingeleverd voor onderzoek en vraag me af of de resultaten al binnen zijn."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cholesteroltest</TableCell>
                <TableCell>Lipidenprofiel</TableCell>
                <TableCell>"Hoe zit het met mijn cholesterol?"</TableCell>
                <TableCell>"Goedemiddag, ik ben benieuwd naar de uitslag van mijn cholesteroltest die ik twee weken geleden heb gedaan."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Röntgenfoto</TableCell>
                <TableCell>Röntgen borstkas</TableCell>
                <TableCell>"Ik heb een longfoto laten maken en wil weten wat eruit kwam."</TableCell>
                <TableCell>"Hoi, ik ben vorige week naar het ziekenhuis geweest voor een röntgenfoto van mijn longen en wil graag weten wat daaruit is gekomen."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Echo</TableCell>
                <TableCell>Echografie buik</TableCell>
                <TableCell>"Ik wacht nog op de uitslag van mijn echo."</TableCell>
                <TableCell>"Goedemorgen, ik heb twee dagen geleden een echo van mijn buik gehad en vraag me af of de resultaten al bij u bekend zijn."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">COVID-19 test</TableCell>
                <TableCell>PCR-test</TableCell>
                <TableCell>"Ik moet weten of ik corona heb."</TableCell>
                <TableCell>"Hallo, ik heb gisteren een coronatest gedaan en zou graag de uitslag willen weten om te bepalen of ik in isolatie moet blijven."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Allergie-test</TableCell>
                <TableCell>Bepaling specifieke IgE</TableCell>
                <TableCell>"Kan ik de resultaten krijgen van mijn allergietest?"</TableCell>
                <TableCell>"Hoi, ik heb vorige maand een allergietest laten doen en zou graag weten waarvoor ik precies allergisch ben."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Schildklieronderzoek</TableCell>
                <TableCell>TSH en vrij T4</TableCell>
                <TableCell>"Heeft u de uitslagen van mijn schildklier al?"</TableCell>
                <TableCell>"Goedemiddag, ik ben afgelopen week geprikt voor schildklieronderzoek en ben benieuwd naar de resultaten."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Uitstrijkje</TableCell>
                <TableCell>Cervixcytologie</TableCell>
                <TableCell>"Ik wil graag weten of mijn uitstrijkje goed was."</TableCell>
                <TableCell>"Goedemorgen, ik heb twee weken geleden een uitstrijkje laten maken en zou graag de uitslag willen weten."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hartfilmpje</TableCell>
                <TableCell>ECG</TableCell>
                <TableCell>"Ik heb een hartfilmpje laten maken en wil weten wat er uit is gekomen."</TableCell>
                <TableCell>"Hallo, de huisarts heeft vorige week een ECG bij mij gemaakt en ik zou graag willen weten wat de resultaten zijn."</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Flagging Section - Moved to bottom */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Markeren van gesprekken (Flagging)</h2>
        <p className="text-gray-700 mb-4">
          Na het testen van de AI-onderzoeksuitslagen-assistent kun je de kwaliteit van het gesprek beoordelen door de "Flag This Call" functie te gebruiken:
        </p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-forest mb-2">Hoe markeer je een gesprek?</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Ga naar de gespreksdetailpagina van het geteste gesprek.</li>
              <li>Klik op de knop <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"><Flag className="h-3 w-3 text-mint" /> Flag This Call</span> rechtsboven in het scherm.</li>
              <li>Kies in het dropdown menu een van de volgende opties:</li>
            </ol>
            
            <div className="mt-3 pl-5">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Wrong questions from AI</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-orange-500" />
                  <span>Messy conversation, not smooth</span>
                </div>
                <div className="py-1 px-2 hover:bg-mint-light/20 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-blue-500" />
                  <span>Other issue</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-forest mb-2">Bij het markeren:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Voor alle opties: Voeg aanvullende notities toe die het probleem beschrijven.</li>
                <li>Wees zo specifiek mogelijk over wat er mis ging tijdens het gesprek.</li>
                <li>Klik op "Submit Flag" om de markering te voltooien.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mt-4">
          Deze markeringen zijn essentieel om de AI-assistent te verbeteren. Ze worden regelmatig door ons team geanalyseerd om patronen te identificeren en aanpassingen te maken in de gespreksstromen.
        </p>
      </div>
    </div>
  );
};

const KnowledgeBaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const goBack = () => {
    navigate('/dashboard/knowledge-base');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  let content;
  
  // Determine which content to display based on the ID parameter
  switch (id) {
    case 'test-script-triage':
      content = <TestScriptTriageContent />;
      break;
    case 'test-script-medicatie':
      content = <TestScriptMedicatieContent />;
      break;
    case 'test-script-onderzoek':
      content = <TestScriptOnderzoekContent />;
      break;
    default:
      content = <div className="p-6 max-w-4xl mx-auto">Document not found (ID: {id})</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* White menu bar */}
      <div className="bg-white shadow-sm py-4 px-6 flex items-center">
        <Button 
          onClick={goBack} 
          variant="ghost" 
          className="text-forest hover:text-forest/90 hover:bg-mint-light/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar Kennisbank
        </Button>
        <h2 className="ml-4 text-lg font-medium text-forest">AI Assistenten Kennisbank</h2>
      </div>
      
      {/* Content with gray background */}
      <div className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {content}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseDetail;

