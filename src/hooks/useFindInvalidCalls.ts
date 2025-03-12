
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

export function useFindInvalidCalls() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const scanForInvalidCalls = async () => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('vapi-data-cleanup');
      setResults(response.data);
      
      // Calculate total issues
      const totalIssues = Object.values(response.data.results).reduce(
        (sum, tableResult: any) => sum + (tableResult.issues || 0), 
        0
      );
      
      toast({
        title: "Scan Complete",
        description: `Found ${totalIssues} problematic records across all tables.`,
      });
      
      return response.data;
    } catch (error) {
      console.error("Error scanning for invalid calls:", error);
      toast({
        title: "Error",
        description: "Failed to scan for invalid calls. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cleanupInvalidCalls = async () => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('vapi-data-cleanup', {
        body: { mode: 'fix' },
      });
      setResults(response.data);
      
      toast({
        title: "Cleanup Complete",
        description: "Problematic records have been removed from the database.",
      });
      
      return response.data;
    } catch (error) {
      console.error("Error cleaning up invalid calls:", error);
      toast({
        title: "Error",
        description: "Failed to clean up invalid calls. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    results,
    scanForInvalidCalls,
    cleanupInvalidCalls,
  };
}
