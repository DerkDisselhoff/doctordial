
import { useState, useEffect } from "react";
import { ResearchLog } from "./types";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export function useResearchCalls() {
  const [calls, setCalls] = useState<ResearchLog[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<ResearchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  const { toast } = useToast();
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

  return {
    filteredCalls,
    loading,
    error,
    isDemoAccount,
    currentPage,
    totalPages,
    itemsPerPage,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    formatDate
  };
}
