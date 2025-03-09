
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, Calendar, Pill, Phone, Clock, User, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { MedicationLog } from "./MedicationDetail";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function MedicationList() {
  const [calls, setCalls] = useState<MedicationLog[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

        // Fetch medication calls for this assistant
        const { data: callData, error: callError } = await supabase
          .from('call_logs_medications')
          .select('*')
          .eq('assistant_id', assistantData.assistant_id)
          .order('created_at', { ascending: false });

        if (callError) {
          console.error("Error fetching medication calls:", callError);
          throw callError;
        }

        console.log("Number of medication calls found:", callData?.length || 0);
        setCalls(callData || []);
        setFilteredCalls(callData || []);
        setTotalPages(Math.ceil((callData?.length || 0) / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medication calls:', error);
        toast({
          title: "Error fetching medication calls",
          description: "There was a problem loading the medication call history.",
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
        call.medication_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCalls(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchQuery, calls]);

  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), 'dd-MM-yyyy HH:mm');
    } catch (e) {
      return dateString;
    }
  };

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
        <CardTitle className="text-gray-dark flex items-center">
          <Pill className="mr-2 h-5 w-5 text-mint" />
          Medicatie Geschiedenis
        </CardTitle>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
              <Input
                placeholder="Zoeken op patiënt of medicatie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-muted text-gray-dark placeholder:text-gray"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Samenvatting gesprek</TableHead>
                <TableHead>Patiënt</TableHead>
                <TableHead>Geboorte datum</TableHead>
                <TableHead>Medicatie</TableHead>
                <TableHead>Dosering</TableHead>
                <TableHead>Verpakkingen</TableHead>
                <TableHead>Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCalls.length > 0 ? (
                paginatedCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray" />
                        {formatDate(call.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate" title={call.conversation_summary || "Geen samenvatting"}>
                        {call.conversation_summary || "Geen samenvatting"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray" />
                        {call.patient_name || "Onbekend"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {call.Date_of_birth || "Niet gespecificeerd"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-mint" />
                        {call.medication_name || "Niet gespecificeerd"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {call.dosage || "Niet gespecificeerd"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray" />
                        {call.Packages || "Niet gespecificeerd"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link to={`/dashboard/calls/medication/${call.call_id}`} className="inline-block">
                        <Button variant="ghost" size="sm" className="h-8 text-mint hover:text-mint/80 hover:bg-mint/10">
                          Details bekijken
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray">
                    Geen medicatie gesprekken gevonden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              Vorige
            </Button>
            <span className="text-sm text-gray">
              Pagina {currentPage} van {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Volgende
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
