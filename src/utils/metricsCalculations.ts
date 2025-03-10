
import { CallLog } from "@/types/metrics";

export const calculateMetrics = (callData: CallLog[] | null) => {
  if (!callData) return null;

  const totalCalls = callData.length;
  
  const avgDuration = callData.length > 0
    ? Math.round(callData.reduce((acc, call) => 
        acc + (parseInt(call.duration_seconds || '0') || 0), 0) / callData.length)
    : 0;

  // Count forwarded calls across all types
  const callsForwarded = callData.filter(call => 
    call.Action?.toLowerCase().includes('forward to doctor') || 
    call.Status?.toLowerCase().includes('forwarded')
  ).length;

  // Calculate success rate (based on intent or relevant fields)
  const callsWithIntent = callData.filter(call => 
    call.intent !== undefined && call.intent !== null ||
    call.confidence_level !== undefined && call.confidence_level !== null
  );
  
  const callSuccess = callsWithIntent.length > 0
    ? Math.round((callsWithIntent.filter(call => 
        call.intent === true || 
        call.intent === 'true' ||
        (call.confidence_level && 
          // Convert confidence_level to number before comparison
          (typeof call.confidence_level === 'string' 
            ? parseInt(call.confidence_level) > 70
            : call.confidence_level > 70))
      ).length / callsWithIntent.length) * 100)
    : 0;

  // Count relevant cases (using Urgencylevel field and other indicators)
  const relevantCases = callData.filter(call => {
    // For triage calls, look at urgency levels
    if (call.Urgencylevel) {
      const urgencyLevel = call.Urgencylevel.toUpperCase();
      return urgencyLevel === 'U2' || urgencyLevel === 'U3' || urgencyLevel === 'U4';
    }
    // For medication calls, all are considered relevant
    else if (call.medication_name) {
      return true;
    }
    // For research calls, filter by relevance or findings
    else if (call.relevance_score || call.findings) {
      return call.relevance_score > 50 || !!call.findings;
    }
    return false;
  }).length;

  return {
    totalCalls,
    avgDuration,
    callsForwarded,
    callSuccess,
    relevantCases
  };
};
