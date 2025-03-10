
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

      // Get calls from triage assistant
      const { data: triageData, error: triageError } = await supabase
        .from('call_logs_triage')
        .select('*')
        .eq('assistant_id', assistantData.assistant_id)
        .gte('start_time', startDate.toISOString())
        .lte('start_time', now.toISOString());

      if (triageError) console.error("Error fetching triage data:", triageError);

      // Get calls from medication assistant 
      const { data: medicationData, error: medicationError } = await supabase
        .from('call_logs_medications')
        .select('*')
        .eq('assistant_id', assistantData.assistant_id)
        .gte('start_time', startDate.toISOString())
        .lte('start_time', now.toISOString());

      if (medicationError) console.error("Error fetching medication data:", medicationError);

      // Get calls from research assistant
      const { data: researchData, error: researchError } = await supabase
        .from('call_logs_researchresults')
        .select('*')
        .eq('assistant_id', assistantData.assistant_id)
        .gte('start_time', startDate.toISOString())
        .lte('start_time', now.toISOString());

      if (researchError) console.error("Error fetching research data:", researchError);

      // Combine all calls data
      const allCallsData = [
        ...(triageData || []), 
        ...(medicationData || []), 
        ...(researchData || [])
      ];

      return calculateMetrics(allCallsData);
    },
  });
};
