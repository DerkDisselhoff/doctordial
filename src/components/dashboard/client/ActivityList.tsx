import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, User, Clock, ArrowRight } from "lucide-react";

// Reuse the mock data generator from DetailedCallsList
const generateMockCalls = (count: number) => {
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
    'James Johnson', 'Lisa Anderson', 'Robert Taylor', 'Maria Garcia'
  ];
  const statuses = ['completed', 'scheduled', 'missed', 'rescheduled'];

  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i + 1}`,
    call_id: `CALL-${String(i + 1).padStart(4, '0')}`,
    caller_number: patientNames[Math.floor(Math.random() * patientNames.length)],
    recipient_number: '+31612345678',
    duration: Math.floor(Math.random() * 600) + 60,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    transcription: subjects[Math.floor(Math.random() * subjects.length)],
    sentiment_analysis: {
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)]
    },
    created_at: new Date(Date.now() - Math.floor(Math.random() * 7776000000)).toISOString()
  }));
};

export function ActivityList() {
  const navigate = useNavigate();
  const recentCalls = generateMockCalls(3);

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="border-b border-mint/10">
        <CardTitle className="text-white">Recent Activity</CardTitle>
        <p className="text-white/60">Latest patient interactions and appointments</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-mint/10">
              <TableHead className="text-white/70"><Calendar className="h-4 w-4" /></TableHead>
              <TableHead className="text-white/70"><User className="h-4 w-4" /></TableHead>
              <TableHead className="text-white/70"><MessageCircle className="h-4 w-4" /></TableHead>
              <TableHead className="text-white/70">Urgency</TableHead>
              <TableHead className="text-white/70">Sentiment</TableHead>
              <TableHead className="text-white/70">Outcome</TableHead>
              <TableHead className="text-white/70">Appointment</TableHead>
              <TableHead className="text-white/70"><Clock className="h-4 w-4" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCalls.map((call) => (
              <TableRow 
                key={call.id}
                className="hover:bg-mint/5 cursor-pointer border-b border-mint/5"
                onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
              >
                <TableCell className="text-white/70">
                  {new Date(call.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-white">
                  {call.caller_number}
                </TableCell>
                <TableCell className="text-white/70 max-w-xs truncate">
                  {call.transcription}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.sentiment_analysis?.urgency === 'high' 
                      ? 'bg-red-500/10 text-red-500'
                      : call.sentiment_analysis?.urgency === 'medium'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-green-500/10 text-green-500'
                    }`}>
                    {call.sentiment_analysis?.urgency || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.sentiment_analysis?.sentiment === 'positive'
                      ? 'bg-green-500/10 text-green-500'
                      : call.sentiment_analysis?.sentiment === 'negative'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-gray-500/10 text-gray-500'
                    }`}>
                    {call.sentiment_analysis?.sentiment || 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="text-white/70">
                  {call.status}
                </TableCell>
                <TableCell>
                  {call.status === 'completed' || call.status === 'scheduled' ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-mint/10 text-mint">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-500/10 text-gray-500">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-white/70">
                  {call.duration ? `${call.duration}s` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-end p-4 border-t border-mint/10">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/calls')}
            className="text-white hover:bg-mint/10 border-mint/20"
          >
            View All Calls
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}