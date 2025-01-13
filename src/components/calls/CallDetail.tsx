import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { VapiCall } from "@/services/vapiService";

export function CallDetail() {
  const { callId } = useParams();
  const [call, setCall] = useState<VapiCall | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      const mockCall: VapiCall = {
        id: "mock-1",
        call_id: callId || "",
        caller_number: "John Smith",
        duration: 180,
        status: "completed",
        created_at: new Date().toISOString(),
        transcription: "Hello, I'd like to schedule a follow-up appointment with Dr. Johnson for next week. I've been experiencing some mild discomfort in my lower back, and I want to discuss the effectiveness of the prescribed treatment.",
        sentiment_analysis: {
          sentiment: "positive",
          urgency: "medium"
        },
        summary: "Patient requesting follow-up appointment for back pain assessment",
        urgency_score: 3,
        follow_up_required: true,
        follow_up_notes: "Schedule follow-up within 7 days",
        department: "General Practice",
        priority_level: "medium",
        resolution_status: "scheduled",
        callback_number: "+31612345678"
      };
      setCall(mockCall);
      setLoading(false);
    }, 1000);
  }, [callId]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  if (!call) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-white/70">Call not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Call Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Call ID</p>
                <p className="text-white font-medium">{call.call_id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Patient</p>
                <p className="text-white font-medium">{call.caller_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Duration</p>
                <p className="text-white font-medium">{call.duration} seconds</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Date & Time</p>
                <p className="text-white font-medium">
                  {new Date(call.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Sentiment</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${call.sentiment_analysis?.sentiment === 'positive'
                    ? 'bg-green-500/10 text-green-400'
                    : call.sentiment_analysis?.sentiment === 'negative'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-gray-500/10 text-gray-400'
                  }`}>
                  {call.sentiment_analysis?.sentiment || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Urgency</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${call.sentiment_analysis?.urgency === 'high'
                    ? 'bg-red-500/10 text-red-400'
                    : call.sentiment_analysis?.urgency === 'medium'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-green-500/10 text-green-400'
                  }`}>
                  {call.sentiment_analysis?.urgency || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Status</p>
                <p className="text-white font-medium">{call.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Call Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 mb-6">{call.summary}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Follow-up Details</h3>
              <div className="p-4 bg-forest rounded-lg border border-mint/10">
                <div className="flex items-start space-x-3">
                  <ArrowRight className="h-5 w-5 text-mint mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Required Action</p>
                    <p className="text-white/70">{call.follow_up_notes}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Department Info</h3>
              <div className="p-4 bg-forest rounded-lg border border-mint/10">
                <div className="space-y-3">
                  <div>
                    <p className="text-white/60 text-sm">Department</p>
                    <p className="text-white">{call.department}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Priority Level</p>
                    <p className="text-white">{call.priority_level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Transcription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 whitespace-pre-wrap">
            {call.transcription || 'No transcription available'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}