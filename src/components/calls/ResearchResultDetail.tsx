
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { CallHeader } from "./detail/CallHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Microscope, Calendar, User, Flag, Clock } from "lucide-react";
import { format } from "date-fns";
import { CallSummary } from "./detail/CallSummary";
import { CallTranscript } from "./detail/CallTranscript";
import { ResearchLog } from "./ResearchResultsList";

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

export function ResearchResultDetail() {
  const { callId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCall, setEditedCall] = useState<Partial<ResearchLog>>({});
  const [transcriptMessages, setTranscriptMessages] = useState<Array<{role: string, content: string}>>([]);
  
  const { data: call, isLoading, error, refetch } = useQuery({
    queryKey: ['researchDetail', callId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('call_logs_researchresults')
          .select('*')
          .eq('call_id', callId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Research call not found');
        
        console.log("Retrieved research data:", data);
        return data as ResearchLog;
      } catch (err) {
        console.error("Error fetching research details:", err);
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
      console.log("Saving research data:", editedCall);
      const { error } = await supabase
        .from('call_logs_researchresults')
        .update(editedCall)
        .eq('call_id', callId);

      if (error) {
        console.error("Error saving research:", error);
        throw error;
      }

      toast({
        title: "Wijzigingen opgeslagen",
        description: "De onderzoeksgegevens zijn bijgewerkt.",
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

  const handleInputChange = (field: keyof ResearchLog, value: string) => {
    setEditedCall(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Format date for display
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Niet gespecificeerd";
    
    try {
      // Handle both ISO string format and date-only format
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
        isFlagged={false}
        refetch={refetch}
      />
      
      {!isLoading && !error && call && (
        <>
          {/* Call time and basic info */}
          <Card className="bg-white border-gray-muted shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div className="flex items-center gap-3 mb-3 md:mb-0">
                  <Calendar className="h-5 w-5 text-mint" />
                  <span className="font-medium text-gray-dark">{formatDateTime(call.created_at)}</span>
                </div>
                {call.duration_seconds && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-mint" />
                    <span className="font-medium text-gray-dark">{call.duration_seconds} seconden</span>
                  </div>
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

          {/* Patient & Research Info */}
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
                    <span className="font-medium text-gray-dark">{formatDate(call.date_of_birth)}</span>
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
                  <Microscope className="h-5 w-5 text-mint" /> Onderzoeksgegevens
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Onderzoeksnaam</span>
                    <span className="font-medium text-gray-dark">{call.research_name || "Niet gespecificeerd"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Onderzoeksdatum</span>
                    <span className="font-medium text-gray-dark">{formatDate(call.research_date)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Bevindingen</span>
                    <span className="font-medium text-gray-dark">{call.findings || "Niet gespecificeerd"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray">Aanbeveling</span>
                    <span className="font-medium text-gray-dark">{call.recommendation || "Niet gespecificeerd"}</span>
                  </div>
                  {call.confidence_level && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Betrouwbaarheidsniveau</span>
                      <span className="font-medium text-gray-dark">{call.confidence_level}</span>
                    </div>
                  )}
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
          Onderzoeksresultaat niet gevonden of er was een fout bij het ophalen van de gegevens.
        </div>
      )}
    </div>
  );
}
