
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabaseClient";

interface ResearchSettingsProps {
  onSettingChange: () => void;
}

export function ResearchSettings({ onSettingChange }: ResearchSettingsProps) {
  const [explainationLevel, setExplainationLevel] = useState("moderate");
  const [showNormalRanges, setShowNormalRanges] = useState(true);
  const [simplifyTerminology, setSimplifyTerminology] = useState(true);
  const [detailLevel, setDetailLevel] = useState([75]);
  const [allowedTestTypes, setAllowedTestTypes] = useState({
    bloodTests: true,
    imagingResults: true,
    pathologyReports: true,
    geneticTests: false
  });

  const handleExplainationChange = (value: string) => {
    setExplainationLevel(value);
    onSettingChange();
  };

  const handleNormalRangesChange = (checked: boolean) => {
    setShowNormalRanges(checked);
    onSettingChange();
  };

  const handleTerminologyChange = (checked: boolean) => {
    setSimplifyTerminology(checked);
    onSettingChange();
  };

  const handleDetailLevelChange = (value: number[]) => {
    setDetailLevel(value);
    onSettingChange();
  };

  const handleTestTypeChange = (key: keyof typeof allowedTestTypes, checked: boolean) => {
    setAllowedTestTypes(prev => ({
      ...prev,
      [key]: checked
    }));
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Onderzoek uitslagen assistent instellingen</AlertTitle>
        <AlertDescription>
          Deze instellingen bepalen hoe de onderzoek assistent omgaat met het uitleggen van 
          laboratorium- en andere onderzoeksuitslagen aan patiënten.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Uitleg instellingen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="explaination-level" className="text-base font-medium">
              Uitleg niveau
            </Label>
            <p className="text-sm text-gray mb-2">
              Bepaal hoe gedetailleerd de uitleg van de uitslagen moet zijn
            </p>
            <Select value={explainationLevel} onValueChange={handleExplainationChange}>
              <SelectTrigger id="explaination-level">
                <SelectValue placeholder="Selecteer uitleg niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Eenvoudig - Minimale uitleg</SelectItem>
                <SelectItem value="moderate">Gemiddeld - Redelijk gedetailleerd</SelectItem>
                <SelectItem value="detailed">Uitgebreid - Zeer gedetailleerd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="normal-ranges" className="text-base font-medium">
                Toon normale waarden
              </Label>
              <p className="text-sm text-gray">
                Toon de normale waardes naast de gemeten waardes in de uitleg
              </p>
            </div>
            <Switch 
              id="normal-ranges" 
              checked={showNormalRanges}
              onCheckedChange={handleNormalRangesChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="simplify-terminology" className="text-base font-medium">
                Vereenvoudig terminologie
              </Label>
              <p className="text-sm text-gray">
                Vertaal medische termen naar begrijpelijke taal voor patiënten
              </p>
            </div>
            <Switch 
              id="simplify-terminology" 
              checked={simplifyTerminology}
              onCheckedChange={handleTerminologyChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Detail niveau</Label>
              <span className="text-sm font-medium">{detailLevel[0]}%</span>
            </div>
            <p className="text-sm text-gray mb-2">
              Stel in hoeveel details de AI moet geven bij het uitleggen van uitslagen
            </p>
            <Slider 
              value={detailLevel}
              min={25}
              max={100}
              step={1}
              onValueChange={handleDetailLevelChange}
            />
            <div className="flex justify-between text-xs text-gray pt-1">
              <span>Beknopt</span>
              <span>Zeer gedetailleerd</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Toegestane onderzoekstypes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray mb-4">
            Selecteer welke typen onderzoeken de assistent mag uitleggen
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="blood-tests" 
                checked={allowedTestTypes.bloodTests}
                onCheckedChange={(checked) => handleTestTypeChange('bloodTests', checked === true)}
              />
              <Label htmlFor="blood-tests" className="text-sm font-medium">
                Bloedonderzoek
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="imaging-results" 
                checked={allowedTestTypes.imagingResults}
                onCheckedChange={(checked) => handleTestTypeChange('imagingResults', checked === true)}
              />
              <Label htmlFor="imaging-results" className="text-sm font-medium">
                Beeldvormend onderzoek (echo, röntgen, CT, MRI)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pathology-reports" 
                checked={allowedTestTypes.pathologyReports}
                onCheckedChange={(checked) => handleTestTypeChange('pathologyReports', checked === true)}
              />
              <Label htmlFor="pathology-reports" className="text-sm font-medium">
                Pathologie verslagen
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="genetic-tests" 
                checked={allowedTestTypes.geneticTests}
                onCheckedChange={(checked) => handleTestTypeChange('geneticTests', checked === true)}
              />
              <Label htmlFor="genetic-tests" className="text-sm font-medium">
                Genetisch onderzoek
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
