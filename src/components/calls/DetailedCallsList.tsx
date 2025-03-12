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
  const [error, setError] = useState<string | null>(null);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Session error: " + sessionError.message);
          throw sessionError;
        }
        if (!session) {
          console.log("No session found");
          setError("No session found - please log in");
          throw new Error('No session found');
        }
        console.log("User ID:", session.user.id);

        // Check if this is a demo account
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('demo_account')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }
        
        const isDemo = profileData?.demo_account === true;
        setIsDemoAccount(isDemo);
        console.log("Is demo account:", isDemo);

        // Determine which table to query
        const tableToQuery = isDemo ? 'demo_call_logs_triage' : 'call_logs_triage';
        console.log("Using table:", tableToQuery);
        
        // Fetch calls from the appropriate table based on account type
        const { data: callData, error: callError } = await supabase
          .from(tableToQuery)
          .select('*');

        if (callError) {
          console.error("Error fetching calls:", callError);
          setError("Error fetching calls: " + callError.message);
          throw callError;
        }

        console.log(`Number of ${isDemo ? 'demo' : 'triage'} calls found:`, callData?.length || 0);
        console.log("Call data sample:", callData?.[0]);
        
        // Transform call data to match VapiCall interface
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

        toast({
          title: "Data geladen",
          description: `${transformedCalls.length} triage gesprekken gevonden`,
        });

        setCalls(transformedCalls);
        setFilteredCalls(transformedCalls);
        setTotalPages(Math.ceil(transformedCalls.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching triage calls:', error);
        toast({
          title: "Fout bij het ophalen van gesprekken",
          description: "Er was een probleem met het laden van de gesprekgeschiedenis.",
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

  if (error && !isDemoAccount) {
    return (
      <Card className="dashboard-card">
        <CardContent className="p-8">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-muted">
        <CardTitle className="text-gray-dark">Triage Gesprekken</CardTitle>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
              <Input
                placeholder="Zoeken op patiënt of symptomen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-muted text-gray-dark placeholder:text-gray"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray" />
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-muted">
                  <SelectValue placeholder="Urgentie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle urgenties</SelectItem>
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
                  <SelectItem value="all">Alle sentimenten</SelectItem>
                  <SelectItem value="positive">Positief</SelectItem>
                  <SelectItem value="negative">Negatief</SelectItem>
                  <SelectItem value="neutral">Neutraal</SelectItem>
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
              {filteredCalls.length > 0 ? (
                filteredCalls
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((call) => (
                    <CallsTableRow key={call.id} call={call} />
                  ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray">
                    {isDemoAccount ? 
                      "Dit is een demo account. Er zijn nog geen triage gesprekken geconfigureerd." : 
                      "Geen triage gesprekken gevonden"}
                  </td>
                </tr>
              )}
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
