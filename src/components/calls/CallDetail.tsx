import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar, ArrowRight, Tag, Building2, FileCheck } from "lucide-react";
import { VapiCall } from "@/services/vapiService";

export function CallDetail() {
  const { callId } = useParams();
  const [call, setCall] = useState<VapiCall | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data generator
    const mockCalls = generateMockCalls(100);
    const foundCall = mockCalls.find(c => c.call_id === callId);
    
    setTimeout(() => {
      setCall(foundCall || null);
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
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : call.sentiment_analysis?.sentiment === 'negative'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
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
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : call.sentiment_analysis?.urgency === 'medium'
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                  {call.sentiment_analysis?.urgency || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-white/60">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${call.status === 'completed'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : call.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : call.status === 'missed'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                  {call.status}
                </span>
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
                    <p className="text-white/70">{call.follow_up_notes || 'No follow-up required'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Department Info</h3>
              <div className="p-4 bg-forest rounded-lg border border-mint/10">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-mint" />
                    <div>
                      <p className="text-white/60 text-sm">Department</p>
                      <p className="text-white">{call.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Tag className="h-5 w-5 text-mint" />
                    <div>
                      <p className="text-white/60 text-sm">Priority Level</p>
                      <p className="text-white">{call.priority_level}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileCheck className="h-5 w-5 text-mint" />
                    <div>
                      <p className="text-white/60 text-sm">Resolution Status</p>
                      <p className="text-white">{call.resolution_status}</p>
                    </div>
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

// Helper function to generate mock calls
const generateMockCalls = (count: number): VapiCall[] => {
  const sentiments = ['positive', 'negative', 'neutral'];
  const urgencyLevels = ['high', 'medium', 'low'];
  const subjects = [
    'Prescription renewal request',
    'Scheduling routine check-up',
    'Discussing test results',
    'Emergency consultation',
    'Follow-up appointment',
    'Medication side effects',
    'General health inquiry',
    'Specialist referral request'
  ];
  const patientNames = [
    'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis',
    'James Johnson', 'Lisa Anderson', 'Robert Taylor', 'Maria Garcia',
    'David Miller', 'Jennifer White'
  ];
  const statuses = ['completed', 'scheduled', 'missed', 'rescheduled'];
  const departments = ['General Practice', 'Emergency', 'Pediatrics', 'Internal Medicine'];

  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i + 1}`,
    call_id: `CALL-${String(i + 1).padStart(4, '0')}`,
    caller_number: patientNames[Math.floor(Math.random() * patientNames.length)],
    recipient_number: '+31612345678',
    duration: Math.floor(Math.random() * 600) + 60,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    transcription: `Patient called regarding ${subjects[Math.floor(Math.random() * subjects.length)].toLowerCase()}. Discussion focused on symptoms and next steps.`,
    sentiment_analysis: {
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)]
    },
    created_at: new Date(Date.now() - Math.floor(Math.random() * 7776000000)).toISOString(),
    summary: subjects[Math.floor(Math.random() * subjects.length)],
    urgency_score: Math.floor(Math.random() * 5) + 1,
    assistant_name: 'Dr. AI',
    assistant_id: `assistant-${i + 1}`,
    caller_name: patientNames[Math.floor(Math.random() * patientNames.length)],
    language: 'en',
    recording_url: `https://example.com/recording-${i + 1}.mp3`,
    tags: ['urgent', 'follow-up', 'prescription'],
    follow_up_required: Math.random() > 0.5,
    follow_up_notes: Math.random() > 0.5 ? 'Schedule follow-up appointment within 2 weeks' : null,
    call_type: 'inbound',
    department: departments[Math.floor(Math.random() * departments.length)],
    priority_level: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)],
    resolution_status: Math.random() > 0.5 ? 'resolved' : 'pending',
    callback_number: '+31612345678',
    workflow_id: `workflow-${i + 1}`,
    workflow_name: 'Standard Patient Intake',
    block_id: `block-${i + 1}`,
    block_name: 'Initial Assessment',
    output_schema: {},
    messages: [],
    workflow_variables: {},
    block_outputs: {},
    call_variables: {}
  }));
};