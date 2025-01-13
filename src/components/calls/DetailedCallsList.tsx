import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { VapiCall } from "@/services/vapiService";
import { CallsTableHeader } from "./table/CallsTableHeader";
import { CallsTableRow } from "./table/CallsTableRow";
import { CallsPagination } from "./table/CallsPagination";

// Generate mock data
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
  const languages = ['en', 'nl', 'fr', 'de'];
  const assistantNames = ['Dr. AI', 'HealthBot', 'MedAssist', 'CareAI'];

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
    created_at: new Date(Date.now() - Math.floor(Math.random() * 7776000000)).toISOString(),
    summary: subjects[Math.floor(Math.random() * subjects.length)].substring(0, 100),
    urgency_score: Math.floor(Math.random() * 5) + 1,
    assistant_name: assistantNames[Math.floor(Math.random() * assistantNames.length)],
    assistant_id: `assistant-${i + 1}`,
    caller_name: patientNames[Math.floor(Math.random() * patientNames.length)],
    language: languages[Math.floor(Math.random() * languages.length)],
    recording_url: `https://example.com/recording-${i + 1}.mp3`,
    tags: ['urgent', 'follow-up', 'prescription'],
    follow_up_required: Math.random() > 0.5,
    follow_up_notes: Math.random() > 0.5 ? 'Need to check back in 2 days' : null,
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

export function DetailedCallsList() {
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    const mockCalls = generateMockCalls(100);
    setCalls(mockCalls);
    setTotalPages(Math.ceil(mockCalls.length / itemsPerPage));
    setLoading(false);
  }, []);

  const paginatedCalls = calls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Card className="bg-forest-light/50 border-mint/10">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="border-b border-mint/10">
        <CardTitle className="text-white">Call History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <CallsTableHeader />
          <TableBody>
            {paginatedCalls.map((call) => (
              <CallsTableRow key={call.id} call={call} />
            ))}
          </TableBody>
        </Table>
        
        <CallsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
