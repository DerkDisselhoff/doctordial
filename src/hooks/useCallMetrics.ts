
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { calculateMetrics } from "@/utils/metricsCalculations";
import { TimeFilter } from "@/types/metrics";

export const useCallMetrics = (timeFilter: TimeFilter) => {
  return useQuery({
    queryKey: ['callMetrics', timeFilter],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { data: assistantData } = await supabase
        .from('assistant_status')
        .select('assistant_id')
        .eq('profile_id', session.user.id)
        .maybeSingle();

      if (!assistantData?.assistant_id) {
        console.log("No assistant ID found for user");
        return null;
      }

      const now = new Date();
      let startDate = new Date();
      
      switch (timeFilter) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }

      console.log("Fetching call data from", startDate.toISOString(), "to", now.toISOString());

      // Get calls from triage assistant
      const { data: triageData, error: triageError } = await supabase
        .from('call_logs_triage')
        .select('*');

      if (triageError) console.error("Error fetching triage data:", triageError);
      console.log("Triage calls found:", triageData?.length || 0);

      // Get calls from medication assistant 
      const { data: medicationData, error: medicationError } = await supabase
        .from('call_logs_medications')
        .select('*');

      if (medicationError) console.error("Error fetching medication data:", medicationError);
      console.log("Medication calls found:", medicationData?.length || 0);

      // Get calls from research assistant
      const { data: researchData, error: researchError } = await supabase
        .from('call_logs_researchresults')
        .select('*');

      if (researchError) console.error("Error fetching research data:", researchError);
      console.log("Research calls found:", researchData?.length || 0);

      // Combine all calls data
      const allCallsData = [
        ...(triageData || []), 
        ...(medicationData || []), 
        ...(researchData || [])
      ];

      console.log("Total combined calls:", allCallsData.length);

      // Filter by date after combining
      const filteredCallsData = allCallsData.filter(call => {
        if (!call.start_time) return false;
        
        const callDate = new Date(call.start_time);
        return callDate >= startDate && callDate <= now;
      });

      console.log("Calls after date filtering:", filteredCallsData.length);

      return calculateMetrics(filteredCallsData);
    },
    refetchOnWindowFocus: false,
  });
};
