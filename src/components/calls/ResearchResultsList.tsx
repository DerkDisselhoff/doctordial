
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResearchCalls } from "./research/useResearchCalls";
import { ResearchLoading } from "./research/ResearchLoading";
import { ResearchSearch } from "./research/ResearchSearch";
import { ResearchResultsTable } from "./research/ResearchResultsTable";
import { ResearchPagination } from "./research/ResearchPagination";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

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
  
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  const handleDeleteEmptyRecords = async () => {
    try {
      setIsDeleting(true);
      
      // Get user's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Fout",
          description: "Je bent niet ingelogd",
          variant: "destructive",
        });
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
        toast({
          title: "Fout bij verwijderen",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Lege records verwijderd",
          description: "De lege onderzoeksrecords zijn verwijderd. Ververs de pagina om de wijzigingen te zien.",
        });
        // Force a page reload to refresh the data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Er is een fout opgetreden",
        description: "Probeer het later opnieuw",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
          
          {hasEmptyRecords(filteredCalls) && (
            <div className="flex items-center">
              <Button 
                variant="destructive" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleDeleteEmptyRecords}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Bezig met verwijderen..." : "Lege records verwijderen"}
              </Button>
            </div>
          )}
        </div>
        
        <ResearchSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </CardHeader>
      
      <CardContent className="p-0">
        {filteredCalls.length === 0 && hasEmptyRecords(filteredCalls) && (
          <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-700">
            <div className="flex gap-2 items-center">
              <AlertTriangle className="h-5 w-5" />
              <p>Er zijn lege onderzoeksrecords gevonden zonder nuttige informatie. Gebruik de knop "Lege records verwijderen" om deze op te schonen.</p>
            </div>
          </div>
        )}
        
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
