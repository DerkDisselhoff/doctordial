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

      const { data: callData, error: callError } = await supabase
        .from('call_logs')
        .select('*')
        .eq('assistant_id', assistantData.assistant_id)
        .gte('start_time', startDate.toISOString())
        .lte('start_time', now.toISOString());

      if (callError) throw callError;

      return calculateMetrics(callData);
    },
  });
};