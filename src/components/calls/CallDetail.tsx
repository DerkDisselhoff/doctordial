import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar, ArrowRight, Tag, Building2, FileCheck } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CallLog {
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
}

const fetchCallDetails = async (callId: string) => {
  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('call_id', callId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Call not found');
  return data as CallLog;
};

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

// Helper function to get sentiment color classes
const getSentimentColor = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return 'bg-green-500/20 border-green-500/30 text-green-500';
    case 'negative':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'neutral':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    default:
      return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};

// Helper function to get status color classes
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 border-green-500/30 text-green-500';
    case 'in progress':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    case 'scheduled':
      return 'bg-purple-500/20 border-purple-500/30 text-purple-500';
    case 'missed':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    default:
      return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};

export function CallDetail() {
  const { callId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCall, setEditedCall] = useState<Partial<CallLog>>({});
  
  const { data: call, isLoading, error, refetch } = useQuery({
    queryKey: ['callDetail', callId],
    queryFn: () => fetchCallDetails(callId || ''),
    enabled: !!callId,
  });

  useEffect(() => {
    if (call) {
      setEditedCall(call);
    }
  }, [call]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('call_logs')
        .update(editedCall)
        .eq('call_id', callId);

      if (error) throw error;

      toast({
        title: "Changes saved successfully",
        description: "The call details have been updated.",
      });
      
      setIsEditing(false);
      refetch();
    } catch (error) {
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

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  if (error || !call) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-white/70">Call not found</p>
        </CardContent>
      </Card>
    );
  }

  const transcriptMessages = formatTranscript(isEditing ? editedCall.transcript : call.transcript);
  const soepNotes = parseSOEPNotes(isEditing ? editedCall.follow_up_notes : call.follow_up_notes);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        {isEditing ? (
          <div className="space-x-2">
            <Button
              onClick={() => {
                setIsEditing(false);
                setEditedCall(call);
              }}
              variant="outline"
              className="text-white hover:text-forest"
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Call Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Call ID</p>
                  <p className="text-white font-medium">{call.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Patient</p>
                  <p className="text-white font-medium">{call.Name || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Duration</p>
                  <p className="text-white font-medium">{call.duration_seconds || 0} seconds</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Date & Time</p>
                  <p className="text-white font-medium">
                    {new Date(call.start_time).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ThumbsUp className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Sentiment</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(call.Sentiment)}`}>
                    {call.Sentiment || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Urgency</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(call.Urgencylevel)}`}>
                    {call.Urgencylevel || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.Status)}`}>
                    {call.Status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">SOEP</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedCall.follow_up_notes || ''}
              onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
              className="min-h-[200px] mb-4 bg-forest-light/50 text-white placeholder-white/40 border-mint/20"
              placeholder="Enter SOEP notes (Format: S: ... O: ... E: ... P: ...)"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(soepNotes).map(([section, content]) => (
                <div key={section} className="p-4 bg-forest rounded-lg border border-mint/10">
                  <h4 className="text-mint font-medium mb-2">
                    {section === 'S' ? 'Subjective' :
                     section === 'O' ? 'Objective' :
                     section === 'E' ? 'Evaluation' :
                     section === 'P' ? 'Plan' : section}
                  </h4>
                  <p className="text-white/70">{content || 'No information available'}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Call Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedCall.conversation_summary || ''}
              onChange={(e) => handleInputChange('conversation_summary', e.target.value)}
              className="mb-4 bg-forest-light/50 text-white placeholder-white/40 border-mint/20"
              placeholder="Enter call summary"
            />
          ) : (
            <p className="text-white/70 mb-4">{call.conversation_summary || 'No summary available'}</p>
          )}
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Follow-up Details</h3>
            <div className="p-3 bg-forest rounded-lg border border-mint/10">
              <div className="flex items-start space-x-3">
                <ArrowRight className="h-5 w-5 text-mint mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Forwarded</p>
                  {isEditing ? (
                    <Textarea
                      value={editedCall.Action || ''}
                      onChange={(e) => handleInputChange('Action', e.target.value)}
                      className="bg-forest-light/50 text-white placeholder-white/40 border-mint/20"
                      placeholder="Enter forwarding details"
                    />
                  ) : (
                    <p className="text-white/70">{call.Action || 'No action required'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Call Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedCall.transcript || ''}
              onChange={(e) => handleInputChange('transcript', e.target.value)}
              className="min-h-[300px] bg-forest-light/50 text-white placeholder-white/40 border-mint/20"
              placeholder="Enter transcript (Format: AI: ... User: ...)"
            />
          ) : (
            <div className="space-y-4">
              {transcriptMessages.length > 0 ? (
                transcriptMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      message.role === 'AI' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-16 text-sm font-medium ${
                      message.role === 'AI' ? 'text-mint' : 'text-divine'
                    }`}>
                      {message.role}
                    </div>
                    <div className={`flex-grow p-3 rounded-lg ${
                      message.role === 'AI' 
                        ? 'bg-forest border border-mint/10' 
                        : 'bg-forest-light border border-divine/10'
                    }`}>
                      <p className="text-white/80">{message.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No transcript available</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}