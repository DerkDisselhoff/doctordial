
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
import { supabase } from "@/lib/supabaseClient";

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
    const fetchCalls = async () => {
      try {
        // First get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }
        if (!session) {
          console.log("No session found");
          throw new Error('No session found');
        }
        console.log("User ID:", session.user.id);

        // Get the assistant_id from assistant_status
        const { data: assistantData, error: assistantError } = await supabase
          .from('assistant_status')
          .select('assistant_id')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (assistantError) {
          console.error("Error fetching assistant status:", assistantError);
          throw assistantError;
        }

        console.log("Assistant data:", assistantData);

        if (!assistantData?.assistant_id) {
          console.log("No assistant ID found for user");
          throw new Error('No assistant ID found');
        }

        console.log("Found assistant ID:", assistantData.assistant_id);

        // Fetch calls for this assistant from the renamed table
        const { data: callData, error: callError } = await supabase
          .from('call_logs_triage')
          .select('*')
          .eq('assistant_id', assistantData.assistant_id)
          .order('start_time', { ascending: false });

        if (callError) {
          console.error("Error fetching calls:", callError);
          throw callError;
        }

        console.log("Number of calls found:", callData?.length || 0);
        console.log("Call data:", callData);

        // Transform call_logs_triage data to match VapiCall interface
        const transformedCalls: VapiCall[] = callData.map(call => ({
          id: call.id,
          call_id: call.call_id || 'default',
          caller_number: call.Name || 'Unknown',
          recipient_number: call.phone_number || 'default',
          duration: parseInt(call.duration_seconds || '0'),
          status: call.Status || 'default',
          transcription: call["Question Summary"] || 'No question summary available',
          sentiment_analysis: {
            sentiment: call.Sentiment || 'neutral',
            urgency: call.Urgencylevel || 'low'
          },
          created_at: call.start_time || new Date().toISOString(),
          summary: call.conversation_summary || 'No summary available',
          urgency_score: 3,
          assistant_name: 'Medi-Mere',
          assistant_id: call.assistant_id || 'default',
          caller_name: call.Name || 'Unknown',
          language: 'en',
          recording_url: 'default',
          tags: [],
          follow_up_required: false,
          follow_up_notes: call.follow_up_notes || null,
          call_type: 'inbound',
          department: 'General Practice',
          priority_level: call.Urgencylevel || 'low',
          resolution_status: 'pending',
          callback_number: call.phone_number || 'default',
          workflow_id: 'default',
          workflow_name: 'default',
          block_id: 'default',
          block_name: 'default',
          output_schema: {},
          messages: [],
          workflow_variables: {},
          block_outputs: {},
          call_variables: {}
        }));

        console.log("Transformed calls:", transformedCalls);

        setCalls(transformedCalls);
        setFilteredCalls(transformedCalls);
        setTotalPages(Math.ceil(transformedCalls.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching calls:', error);
        toast({
          title: "Error fetching calls",
          description: "There was a problem loading the call history.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCalls();
  }, [toast]);

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
      <Card className="dashboard-card">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-dark"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-muted">
        <CardTitle className="text-gray-dark">Call History</CardTitle>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
              <Input
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-muted text-gray-dark placeholder:text-gray"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray" />
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-muted">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgencies</SelectItem>
                  <SelectItem value="U1">U1</SelectItem>
                  <SelectItem value="U2">U2</SelectItem>
                  <SelectItem value="U3">U3</SelectItem>
                  <SelectItem value="U4">U4</SelectItem>
                  <SelectItem value="U5">U5</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-muted">
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
