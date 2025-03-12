
import { CallLog } from "@/types/metrics";

export const calculateMetrics = (callData: CallLog[] | null) => {
  if (!callData) return null;
  console.log("Calculating metrics for", callData.length, "calls");

  const totalCalls = callData.length;
  
  // Calculate average duration
  const durations = callData
    .filter(call => call.duration_seconds)
    .map(call => parseInt(call.duration_seconds || '0') || 0);
  
  const avgDuration = durations.length > 0
    ? Math.round(durations.reduce((sum, val) => sum + val, 0) / durations.length)
    : 0;

  // Count forwarded calls across all types - safely check for properties
  const callsForwarded = callData.filter(call => 
    ('Action' in call && call.Action?.toLowerCase().includes('forward to doctor')) || 
    ('Status' in call && call.Status?.toLowerCase().includes('forwarded')) ||
    call.Forwarded === true
  ).length;

  // Calculate success rate (based on intent or relevant fields)
  const callsWithIntent = callData.filter(call => 
    call.intent !== undefined && call.intent !== null ||
    ('confidence_level' in call && call.confidence_level !== undefined && call.confidence_level !== null)
  );
  
  const callSuccess = callsWithIntent.length > 0
    ? Math.round((callsWithIntent.filter(call => {
        if (call.intent === true || call.intent === 'true') {
          return true;
        }
        if ('confidence_level' in call && call.confidence_level) {
          // Convert confidence_level to number before comparison
          const confidenceValue = typeof call.confidence_level === 'string' 
            ? parseInt(call.confidence_level) 
            : call.confidence_level;
          return confidenceValue > 70;
        }
        return false;
      }).length / callsWithIntent.length) * 100)
    : 0;

  // Count relevant cases (using Urgencylevel field and other indicators)
  const relevantCases = callData.filter(call => {
    // For triage calls, look at urgency levels
    if ('Urgencylevel' in call && call.Urgencylevel) {
      const urgencyLevel = call.Urgencylevel.toUpperCase();
      return urgencyLevel === 'U2' || urgencyLevel === 'U3' || urgencyLevel === 'U4';
    }
    // For medication calls, all are considered relevant
    else if ('medication_name' in call && call.medication_name) {
      return true;
    }
    // For research calls, filter by relevance or findings
    else if (
      ('relevance_score' in call && call.relevance_score) || 
      ('findings' in call && call.findings)
    ) {
      return ('relevance_score' in call && call.relevance_score > 50) || !!('findings' in call && call.findings);
    }
    return false;
  }).length;

  console.log("Metrics calculated:", {
    totalCalls,
    avgDuration,
    callsForwarded,
    callSuccess,
    relevantCases
  });

  return {
    totalCalls,
    avgDuration,
    callsForwarded,
    callSuccess,
    relevantCases
  };
};
