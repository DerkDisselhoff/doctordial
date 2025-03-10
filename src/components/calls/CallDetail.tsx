
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { CallHeader } from "./detail/CallHeader";
import { CallOverview } from "./detail/CallOverview";
import { CallSOEP } from "./detail/CallSOEP";
import { CallSummary } from "./detail/CallSummary";
import { CallTranscript } from "./detail/CallTranscript";

export interface CallLog {
  id: string;
  call_id: string;
  start_time: string;
  Sentiment: string;
  Urgencylevel: string;
  Name: string;
  duration_seconds: string;
  conversation_summary: string;
  Status: string;
  follow_up_notes: string | null;
  transcript: string | null;
  Action: string | null;
  flagging: any | null;
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

// Helper function to parse SOEP notes
const parseSOEPNotes = (notes: string | null) => {
  if (!notes) return {};
  const sections: Record<string, string> = {};
  notes.split(/(?=S:|O:|E:|P:)/).forEach(section => {
    const [type, ...content] = section.split(':');
    if (type) {
      sections[type.trim()] = content.join(':').trim();
    }
  });
  return sections;
};

export function CallDetail() {
  const { callId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCall, setEditedCall] = useState<Partial<CallLog>>({});
  const [soepNotes, setSoepNotes] = useState<Record<string, string>>({});
  const [transcriptMessages, setTranscriptMessages] = useState<Array<{role: string, content: string}>>([]);
  const [hasFlagEntry, setHasFlagEntry] = useState(false);
  
  const { data: call, isLoading, error, refetch } = useQuery({
    queryKey: ['callDetail', callId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('call_logs_triage')
          .select('*')
          .eq('call_id', callId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Call not found');
        
        console.log("Retrieved call data:", data);
        return data as CallLog;
      } catch (err) {
        console.error("Error fetching call details:", err);
        throw err;
      }
    },
    enabled: !!callId,
  });

  // Check if there are any flags for this call in the call_flags table
  const checkCallFlags = async () => {
    if (!callId) return;
    
    try {
      const { data, error } = await supabase
        .from('call_flags')
        .select('id')
        .eq('call_id', callId)
        .limit(1);
        
      if (error) throw error;
      setHasFlagEntry(data && data.length > 0);
    } catch (error) {
      console.error("Error checking call flags:", error);
    }
  };

  useEffect(() => {
    if (callId) {
      checkCallFlags();
    }
  }, [callId]);

  useEffect(() => {
    if (call) {
      setEditedCall(call);
      setSoepNotes(parseSOEPNotes(call.follow_up_notes));
      setTranscriptMessages(formatTranscript(call.transcript));
    }
  }, [call]);

  const handleSave = async () => {
    try {
      console.log("Saving call data:", editedCall);
      const { error } = await supabase
        .from('call_logs_triage')
        .update(editedCall)
        .eq('call_id', callId);

      if (error) {
        console.error("Error saving call:", error);
        throw error;
      }

      toast({
        title: "Changes saved successfully",
        description: "The call details have been updated.",
      });
      
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error saving changes",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof CallLog, value: string) => {
    setEditedCall(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Refresh flag status after any flagging action
  const handleRefetch = () => {
    refetch();
    checkCallFlags();
  };

  return (
    <div className="space-y-4">
      <CallHeader 
        callId={callId!}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        isFlagged={call?.flagging || hasFlagEntry}
        refetch={handleRefetch}
      />
      
      {!isLoading && !error && call && (
        <>
          <CallOverview call={call} />
          
          <CallSOEP 
            isEditing={isEditing}
            soepNotes={soepNotes}
            editedCall={editedCall}
            handleInputChange={handleInputChange}
          />
          
          <CallSummary 
            isEditing={isEditing}
            editedCall={editedCall}
            handleInputChange={handleInputChange}
            call={call}
          />
          
          <CallTranscript 
            isEditing={isEditing}
            editedCall={editedCall}
            handleInputChange={handleInputChange}
            transcriptMessages={transcriptMessages}
          />
        </>
      )}
      
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="p-4 text-center text-gray">
          Call not found
        </div>
      )}
    </div>
  );
}
