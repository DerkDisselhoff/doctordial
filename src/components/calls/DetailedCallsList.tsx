import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { VapiCall } from "@/services/vapiService";
import { CallsTableHeader } from "./table/CallsTableHeader";
import { CallsTableRow } from "./table/CallsTableRow";
import { CallsPagination } from "./table/CallsPagination";
import { Search, Filter } from "lucide-react";

const generateMockCalls = (count: number): VapiCall[] => {
  const sentiments = ['positive', 'negative', 'neutral'];
  const urgencyLevels = ['U1', 'U2', 'U3', 'U4', 'U5'];
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
  const [filteredCalls, setFilteredCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const { toast } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    const mockCalls = generateMockCalls(100);
    setCalls(mockCalls);
    setFilteredCalls(mockCalls);
    setTotalPages(Math.ceil(mockCalls.length / itemsPerPage));
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...calls];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(call => 
        call.caller_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.transcription?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(call => 
        call.sentiment_analysis?.urgency === urgencyFilter
      );
    }

    // Apply sentiment filter
    if (sentimentFilter !== "all") {
      filtered = filtered.filter(call => 
        call.sentiment_analysis?.sentiment === sentimentFilter
      );
    }

    setFilteredCalls(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchQuery, urgencyFilter, sentimentFilter, calls]);

  const paginatedCalls = filteredCalls.slice(
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
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-forest border-mint/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/40" />
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[140px] bg-forest border-mint/20">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgencies</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="w-[140px] bg-forest border-mint/20">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <CallsTableHeader />
            <TableBody>
              {paginatedCalls.map((call) => (
                <CallsTableRow key={call.id} call={call} />
              ))}
            </TableBody>
          </Table>
        </div>
        <CallsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
