
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/lib/supabaseClient";

interface MedicationSettingsProps {
  onSettingChange: () => void;
}

export function MedicationSettings({ onSettingChange }: MedicationSettingsProps) {
  const [allowPrescriptionRenewals, setAllowPrescriptionRenewals] = useState(true);
  const [verificationLevel, setVerificationLevel] = useState("moderate");
  const [confidenceThreshold, setConfidenceThreshold] = useState([80]);
  const [allowSideEffectInfo, setAllowSideEffectInfo] = useState(true);
  
  const handlePrescriptionChange = (checked: boolean) => {
    setAllowPrescriptionRenewals(checked);
    onSettingChange();
  };
  
  const handleVerificationChange = (value: string) => {
    setVerificationLevel(value);
    onSettingChange();
  };
  
  const handleConfidenceChange = (value: number[]) => {
    setConfidenceThreshold(value);
    onSettingChange();
  };
  
  const handleSideEffectChange = (checked: boolean) => {
    setAllowSideEffectInfo(checked);
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Medicatie assistent instellingen</AlertTitle>
        <AlertDescription>
          Deze instellingen bepalen hoe de medicatie assistent omgaat met vragen over medicatie, 
          herhaalrecepten en bijwerkingen. Pas deze aan op basis van jouw praktijk richtlijnen.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Recepten en medicatie informatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="prescription-renewals" className="text-base font-medium">
                Herhaalrecepten toestaan
              </Label>
              <p className="text-sm text-gray">
                Sta toe dat de assistent herhaalrecepten kan afhandelen zonder tussenkomst van een arts
              </p>
            </div>
            <Switch 
              id="prescription-renewals" 
              checked={allowPrescriptionRenewals}
              onCheckedChange={handlePrescriptionChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-level" className="text-base font-medium">
              Verificatieniveau
            </Label>
            <p className="text-sm text-gray mb-2">
              Bepaal hoe streng de controle is bij het verstrekken van medicatie-informatie
            </p>
            <Select value={verificationLevel} onValueChange={handleVerificationChange}>
              <SelectTrigger id="verification-level">
                <SelectValue placeholder="Selecteer verificatieniveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Laag - Minimale verificatie</SelectItem>
                <SelectItem value="moderate">Gemiddeld - Standaard verificatie</SelectItem>
                <SelectItem value="strict">Streng - Uitgebreide verificatie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Betrouwbaarheidsdrempel</Label>
              <span className="text-sm font-medium">{confidenceThreshold[0]}%</span>
            </div>
            <p className="text-sm text-gray mb-2">
              Stel in hoe zeker de AI moet zijn voordat informatie wordt verstrekt
            </p>
            <Slider 
              value={confidenceThreshold}
              min={50}
              max={100}
              step={1}
              onValueChange={handleConfidenceChange}
            />
            <div className="flex justify-between text-xs text-gray pt-1">
              <span>Lager (meer flexibel)</span>
              <span>Hoger (strenger)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="side-effect-info" className="text-base font-medium">
                Bijwerkingen informatie
              </Label>
              <p className="text-sm text-gray">
                Sta toe dat de assistent informatie geeft over bijwerkingen van medicatie
              </p>
            </div>
            <Switch 
              id="side-effect-info" 
              checked={allowSideEffectInfo}
              onCheckedChange={handleSideEffectChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medicatiedatabase instellingen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-medium">Databronnen</Label>
            <p className="text-sm text-gray">
              Selecteer welke medicatie databases worden gebruikt voor informatie
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch id="farmacotherapeutisch-kompas" defaultChecked />
                <Label htmlFor="farmacotherapeutisch-kompas" className="text-sm">
                  Farmacotherapeutisch Kompas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="knmp-kennisbank" defaultChecked />
                <Label htmlFor="knmp-kennisbank" className="text-sm">
                  KNMP Kennisbank
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="geneesmiddeleninformatiebank" defaultChecked />
                <Label htmlFor="geneesmiddeleninformatiebank" className="text-sm">
                  Geneesmiddeleninformatiebank
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="pubmed" />
                <Label htmlFor="pubmed" className="text-sm">
                  PubMed
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
