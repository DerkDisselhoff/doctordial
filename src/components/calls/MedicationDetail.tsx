
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { CallHeader } from "./detail/CallHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Calendar, User, Flag } from "lucide-react";
import { format } from "date-fns";
import { CallSummary } from "./detail/CallSummary";
import { CallTranscript } from "./detail/CallTranscript";

export interface MedicationLog {
  id: string;
  call_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  side_effects: string | null;
  instructions: string | null;
  patient_name: string;
  patient_id: string;
  phone_number: string;
  pharmacy_details: any | null;
  doctor_notes: string | null;
  conversation_summary: string | null;
  transcript: string | null;
  Packages: any | null;
  Date_of_birth: string | null;
  created_at: string;
  Action?: string | null;
}

// Helper function to format transcript messages
const formatTranscript = (transcript: string | null) => {
  if (!transcript) return [];
  return transcript.split(/(?=AI:|User:)/).filter(Boolean).map(message => {
    const [role, ...content] = message.split(':');
    return {
      role: role.trim(),
      content: content.join(':').trim()
    };
  });
};

export function MedicationDetail() {
  const { callId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCall, setEditedCall] = useState<Partial<MedicationLog>>({});
  const [transcriptMessages, setTranscriptMessages] = useState<Array<{role: string, content: string}>>([]);
  
  const { data: call, isLoading, error, refetch } = useQuery({
    queryKey: ['medicationDetail', callId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('call_logs_medications')
          .select('*')
          .eq('call_id', callId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Medication call not found');
        
        console.log("Retrieved medication data:", data);
        return data as MedicationLog;
      } catch (err) {
        console.error("Error fetching medication details:", err);
        throw err;
      }
    },
    enabled: !!callId,
  });

  useEffect(() => {
    if (call) {
      setEditedCall(call);
      setTranscriptMessages(formatTranscript(call.transcript));
    }
  }, [call]);

  const handleSave = async () => {
    try {
      console.log("Saving medication data:", editedCall);
      const { error } = await supabase
        .from('call_logs_medications')
        .update(editedCall)
        .eq('call_id', callId);

      if (error) {
        console.error("Error saving medication:", error);
        throw error;
      }

      toast({
        title: "Wijzigingen opgeslagen",
        description: "De medicatiegegevens zijn bijgewerkt.",
      });
      
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Fout bij opslaan",
        description: "Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof MedicationLog, value: string) => {
    setEditedCall(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check if the call is flagged (using doctor_notes field)
  const isFlagged = call?.doctor_notes?.includes('FLAGGED:') || false;

  // Format date of birth for display
  const formatDateOfBirth = (dateStr: string | null) => {
    if (!dateStr) return "Niet gespecificeerd";
    
    // Handle both ISO string format and date-only format
    try {
      // If it's in DD-MM-YYYY format, return as is
      if (dateStr.includes('-')) return dateStr;
      
      const date = new Date(dateStr);
      return format(date, 'dd-MM-yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  // Format created_at date
  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      return format(date, 'dd-MM-yyyy HH:mm');
    } catch (e) {
      return dateTimeStr;
    }
  };

  return (
    <div className="space-y-4">
      <CallHeader 
        callId={callId!}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        isFlagged={isFlagged}
        refetch={refetch}
      />
      
      {!isLoading && !error && call && (
        <>
          {/* Call time and basic info */}
          <Card className="bg-white border-gray-muted shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-3 mb-3 md:mb-0">
                  <Calendar className="h-5 w-5 text-mint" />
                  <span className="font-medium text-gray-dark">{formatDateTime(call.created_at)}</span>
                </div>
                {isFlagged && (
                  <Badge variant="outline" className="text-orange-500 border-orange-500 bg-orange-50">
                    <Flag className="h-4 w-4 mr-1" />
                    Gemarkeerd
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Call Summary */}
          <CallSummary 
            isEditing={isEditing}
            editedCall={editedCall}
            handleInputChange={handleInputChange}
            call={call}
          />

          {/* Patient & Medication Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-gray-muted shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-mint" /> Patiëntgegevens
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Naam Patiënt</span>
                    <span className="font-medium text-gray-dark">{call.patient_name || "Onbekend"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Geboortedatum</span>
                    <span className="font-medium text-gray-dark">{formatDateOfBirth(call.Date_of_birth)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Telefoonnummer</span>
                    <span className="font-medium text-gray-dark">{call.phone_number || "Niet opgegeven"}</span>
                  </div>
                  {call.patient_id && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Patiënt ID</span>
                      <span className="font-medium text-gray-dark">{call.patient_id}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-gray-muted shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Pill className="h-5 w-5 text-mint" /> Medicatiegegevens
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Medicatienaam</span>
                    <span className="font-medium text-gray-dark">{call.medication_name || "Niet gespecificeerd"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Dosering</span>
                    <span className="font-medium text-gray-dark">{call.dosage || "Niet gespecificeerd"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Verpakkingen</span>
                    <span className="font-medium text-gray-dark">{call.Packages || "Niet gespecificeerd"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Transcript */}
          {call.transcript && (
            <CallTranscript 
              isEditing={isEditing}
              editedCall={editedCall}
              handleInputChange={handleInputChange}
              transcriptMessages={transcriptMessages}
            />
          )}
        </>
      )}
      
      {isLoading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="p-8 text-center text-gray">
          Medicatiegesprek niet gevonden of er was een fout bij het ophalen van de gegevens.
        </div>
      )}
    </div>
  );
}
