
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResearchCalls } from "./research/useResearchCalls";
import { ResearchLoading } from "./research/ResearchLoading";
import { ResearchSearch } from "./research/ResearchSearch";
import { ResearchResultsTable } from "./research/ResearchResultsTable";
import { ResearchPagination } from "./research/ResearchPagination";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export function ResearchResultsList() {
  const { 
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
    formatDate,
    hasEmptyRecords
  } = useResearchCalls();
  
  const { toast } = useToast();
  
  const handleDeleteEmptyRecords = async () => {
    try {
      // Get user's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error("No active session found");
        return;
      }
      
      // Check if this is a demo account
      const { data: profileData } = await supabase
        .from('profiles')
        .select('demo_account')
        .eq('id', session.user.id)
        .maybeSingle();
      
      const isDemo = profileData?.demo_account === true;
      const tableToQuery = isDemo ? 'demo_call_logs_researchresults' : 'call_logs_researchresults';
      
      // Delete records that don't have useful information
      const { error } = await supabase
        .from(tableToQuery)
        .delete()
        .is('patient_name', null)
        .is('findings', null)
        .is('research_name', null);
      
      if (error) {
        console.error("Error deleting empty records:", error);
      } else {
        console.log("Empty research records cleaned up successfully");
      }
    } catch (error) {
      console.error("Error cleaning up empty research records:", error);
    }
  };

  // Effect to automatically clean up empty records when component mounts
  useEffect(() => {
    if (hasEmptyRecords(filteredCalls)) {
      console.log("Found empty research records - cleaning up automatically");
      handleDeleteEmptyRecords();
    }
  }, [filteredCalls]);

  if (loading) {
    return <ResearchLoading />;
  }

  if (error) {
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
        <div className="flex justify-between items-center">
          <CardTitle className="text-gray-dark">Onderzoeksresultaten</CardTitle>
        </div>
        
        <ResearchSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </CardHeader>
      
      <CardContent className="p-0">
        <ResearchResultsTable 
          calls={filteredCalls} 
          currentPage={currentPage} 
          itemsPerPage={itemsPerPage} 
          formatDate={formatDate} 
        />
        
        <ResearchPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      </CardContent>
    </Card>
  );
}
