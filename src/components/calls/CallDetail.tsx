import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchVapiCallById, VapiCall } from "@/services/vapiService";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle } from "lucide-react";

export function CallDetail() {
  const { callId } = useParams();
  const [call, setCall] = useState<VapiCall | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCall = async () => {
      if (!callId) return;
      
      try {
        const data = await fetchVapiCallById(callId);
        setCall(data);
      } catch (error) {
        toast({
          title: "Error loading call details",
          description: "Failed to load call details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCall();
  }, [callId, toast]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  if (!call) {
    return (
      <Card className="bg-white">
        <CardContent className="p-8">
          <p className="text-center text-forest">Call not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-forest">Call Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Call ID</p>
                <p className="text-forest font-medium">{call.call_id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Caller</p>
                <p className="text-forest font-medium">{call.caller_number || 'Unknown'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-forest font-medium">
                  {call.duration ? `${call.duration} seconds` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Sentiment</p>
                <span className={`px-2 py-1 rounded-full text-xs
                  ${call.sentiment_analysis?.sentiment === 'positive'
                    ? 'bg-green-100 text-green-700'
                    : call.sentiment_analysis?.sentiment === 'negative'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                  }`}>
                  {call.sentiment_analysis?.sentiment || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Urgency</p>
                <span className={`px-2 py-1 rounded-full text-xs
                  ${call.sentiment_analysis?.urgency === 'high'
                    ? 'bg-red-100 text-red-700'
                    : call.sentiment_analysis?.urgency === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                  }`}>
                  {call.sentiment_analysis?.urgency || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-forest font-medium">{call.status || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-forest">Transcription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-forest whitespace-pre-wrap">
            {call.transcription || 'No transcription available'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}