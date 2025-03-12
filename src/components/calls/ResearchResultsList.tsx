
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, Calendar, Microscope, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";

export interface ResearchLog {
  id: string;
  call_id: string;
  patient_name: string;
  date_of_birth: string;
  conversation_summary: string;
  research_name: string;
  research_date: string;
  transcript: string;
  duration_seconds: string;
  created_at: string;
  findings: string;
  recommendation: string;
  confidence_level: string;
  relevance_score: number;
  phone_number: string;
  patient_id: string;
  sources: any;
}

export function ResearchResultsList() {
  const [calls, setCalls] = useState<ResearchLog[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<ResearchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the user's session
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
        const tableToQuery = isDemo ? 'demo_call_logs_researchresults' : 'call_logs_researchresults';
        console.log("Using research table:", tableToQuery);

        // Fetch all research calls - order by created_at to show most recent first
        const { data: callData, error: callError } = await supabase
          .from(tableToQuery)
          .select('*')
          .order('created_at', { ascending: false });

        if (callError) {
          console.error("Error fetching research calls:", callError);
          setError("Error fetching research calls: " + callError.message);
          throw callError;
        }

        console.log(`${isDemo ? 'Demo' : ''} Research results data:`, callData);
        
        if (callData && callData.length > 0) {
          setCalls(callData);
          setFilteredCalls(callData);
          setTotalPages(Math.ceil(callData.length / itemsPerPage));
          toast({
            title: "Data geladen",
            description: `${callData.length} onderzoeksresultaten gesprekken gevonden`,
          });
        } else {
          console.log(`No ${isDemo ? 'demo' : ''} research calls found in the database`);
          // Set empty arrays to ensure UI shows "no data" message
          setCalls([]);
          setFilteredCalls([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching research calls:', error);
        toast({
          title: "Fout bij het ophalen van gesprekken",
          description: "Er was een probleem met het laden van de onderzoeksresultaten.",
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
        call.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.research_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCalls(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchQuery, calls]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), 'dd-MM-yyyy HH:mm');
    } catch (e) {
      return dateString;
    }
  };

  const handleRowClick = (callId: string) => {
    navigate(`/dashboard/calls/research/${callId}`);
  };

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-muted">
        <CardTitle className="text-gray-dark">Onderzoek Uitslagen</CardTitle>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
              <Input
                placeholder="Zoeken op patiënt of onderzoek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-muted text-gray-dark placeholder:text-gray"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray" />
              <Select value="all">
                <SelectTrigger className="w-[140px] bg-white border-gray-muted">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle onderzoeken</SelectItem>
                  <SelectItem value="recent">Recente onderzoeken</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {error && !isDemoAccount && (
          <div className="p-4 text-center text-red-500">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-muted/10 hover:bg-transparent">
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Datum</span>
                  </div>
                </TableHead>
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Samenvatting</TableHead>
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Patiënt</span>
                  </div>
                </TableHead>
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Geboortedatum</TableHead>
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    <Microscope className="h-4 w-4 mr-2" />
                    <span>Onderzoek</span>
                  </div>
                </TableHead>
                <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Onderzoek datum</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.length > 0 ? (
                filteredCalls
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((call) => (
                  <TableRow 
                    key={call.id} 
                    className="border-b border-gray-muted/20 hover:bg-gray-muted/5 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(call.call_id || '')}
                  >
                    <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                      {formatDate(call.created_at)}
                    </TableCell>
                    <TableCell className="p-4 text-gray-dark">
                      <div className="max-w-[200px] truncate" title={call.conversation_summary || "Geen samenvatting"}>
                        {call.conversation_summary || "Geen samenvatting"}
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                      {call.patient_name || "Onbekend"}
                    </TableCell>
                    <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                      {call.date_of_birth || "Niet gespecificeerd"}
                    </TableCell>
                    <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                      {call.research_name || "Niet gespecificeerd"}
                    </TableCell>
                    <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                      {call.research_date || "Niet gespecificeerd"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray">
                    {isDemoAccount ? 
                      "Dit is een demo account. Er zijn nog geen onderzoek uitslagen geconfigureerd." : 
                      "Geen onderzoek uitslagen gesprekken gevonden"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-muted/10">
            <button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none"
            >
              Vorige
            </button>
            <span className="text-sm text-gray">
              Pagina {currentPage} van {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none"
            >
              Volgende
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
