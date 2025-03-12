
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { calculateMetrics } from "@/utils/metricsCalculations";
import { TimeFilter } from "@/types/metrics";
import { isValidDate } from "@/components/calls/research/types";

export const useCallMetrics = (timeFilter: TimeFilter) => {
  return useQuery({
    queryKey: ['callMetrics', timeFilter],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      // Check if the user is a demo account
      const { data: profileData } = await supabase
        .from('profiles')
        .select('demo_account')
        .eq('id', session.user.id)
        .maybeSingle();

      const isDemo = profileData?.demo_account === true;
      console.log("Is demo account:", isDemo);

      // Get the assistant ID
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

      // Determine which tables to query based on account type
      const triageTable = isDemo ? 'demo_call_logs_triage' : 'call_logs_triage';
      const medicationTable = isDemo ? 'demo_call_logs_medications' : 'call_logs_medications';
      const researchTable = isDemo ? 'demo_call_logs_researchresults' : 'call_logs_researchresults';

      // Get calls from triage assistant
      const { data: triageData, error: triageError } = await supabase
        .from(triageTable)
        .select('*')
        .eq('assistant_id', assistantData.assistant_id);

      if (triageError) console.error("Error fetching triage data:", triageError);
      console.log("Triage calls found:", triageData?.length || 0);

      // Get calls from medication assistant 
      const { data: medicationData, error: medicationError } = await supabase
        .from(medicationTable)
        .select('*')
        .eq('assistant_id', assistantData.assistant_id);

      if (medicationError) console.error("Error fetching medication data:", medicationError);
      console.log("Medication calls found:", medicationData?.length || 0);

      // Get calls from research assistant
      const { data: researchData, error: researchError } = await supabase
        .from(researchTable)
        .select('*')
        .eq('assistant_id', assistantData.assistant_id);

      if (researchError) console.error("Error fetching research data:", researchError);
      console.log("Research calls found:", researchData?.length || 0);

      // Combine all calls data
      const allCallsData = [
        ...(triageData || []), 
        ...(medicationData || []), 
        ...(researchData || [])
      ];

      console.log("Total combined calls:", allCallsData.length);
      
      // If we have data, log a sample to help with debugging
      if (allCallsData.length > 0) {
        console.log("Call data sample:", allCallsData[0]);
      }

      // Filter by date and ensure we have valid data
      const filteredCallsData = allCallsData.filter(call => {
        // First check if we have a valid date
        if (!call.start_time || !isValidDate(call.start_time)) {
          // Log invalid dates to help debug
          if (call.start_time) {
            console.warn("Invalid date found:", call.start_time, "for call ID:", call.call_id);
          }
          return false;
        }
        
        // Filter out calls that don't have meaningful information
        // Use type-safe property access with optional chaining to avoid TypeScript errors
        const hasName = 'Name' in call ? !!call.Name : false;
        const hasPatientName = 'patient_name' in call ? !!call.patient_name : false;
        
        const hasConversationSummary = !!call.conversation_summary;
        const hasTranscript = !!call.transcript;
        
        const hasSymptoms = 'Symptoms' in call ? !!call.Symptoms : false;
        const hasMedicationName = 'medication_name' in call ? !!call.medication_name : false;
        const hasFindings = 'findings' in call ? !!call.findings : false;
        
        if ((!hasName && !hasPatientName) || 
            (!hasConversationSummary && !hasTranscript && 
             !hasSymptoms && !hasMedicationName && !hasFindings)) {
          console.warn("Empty record found for call ID:", call.call_id);
          return false;
        }
        
        // Then apply the time filter
        const callDate = new Date(call.start_time);
        return callDate >= startDate;
      });

      console.log("Calls after filtering:", filteredCallsData.length);
      console.log("Calls filtered out due to invalid data:", allCallsData.length - filteredCallsData.length);

      // Trigger cleanup of problematic records if needed
      if (allCallsData.length - filteredCallsData.length > 0) {
        try {
          // Just scan for now, don't fix automatically
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vapi-data-cleanup?mode=scan`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log("Data cleanup scan result:", result);
          }
        } catch (error) {
          console.error("Error triggering data cleanup:", error);
        }
      }

      return calculateMetrics(filteredCallsData);
    },
    refetchOnWindowFocus: false,
  });
};
