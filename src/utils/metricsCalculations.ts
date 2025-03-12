
import { CallLog } from "@/types/metrics";

// Type guard to check if a property exists on an object
const hasProperty = <T extends object, K extends string>(obj: T, prop: K): obj is T & Record<K, unknown> => {
  return prop in obj;
};

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
    (hasProperty(call, 'Action') && call.Action?.toLowerCase().includes('forward to doctor')) || 
    (hasProperty(call, 'Status') && call.Status?.toLowerCase().includes('forwarded')) ||
    call.Forwarded === true
  ).length;

  // Calculate success rate based on intent or confidence level
  // First filter to calls that have either intent or confidence_level
  const callsWithIntentOrConfidence = callData.filter(call => 
    hasProperty(call, 'intent') || hasProperty(call, 'confidence_level')
  );
  
  const callSuccess = callsWithIntentOrConfidence.length > 0
    ? Math.round((callsWithIntentOrConfidence.filter(call => {
        // Check for intent property
        if (hasProperty(call, 'intent') && (call.intent === true || call.intent === 'true')) {
          return true;
        }
        // Check for confidence_level property
        if (hasProperty(call, 'confidence_level') && call.confidence_level) {
          // Convert confidence_level to number before comparison
          const confidenceValue = typeof call.confidence_level === 'string' 
            ? parseInt(call.confidence_level) 
            : call.confidence_level;
          return confidenceValue > 70;
        }
        return false;
      }).length / callsWithIntentOrConfidence.length) * 100)
    : 0;

  // Count relevant cases (using Urgencylevel field and other indicators)
  const relevantCases = callData.filter(call => {
    // For triage calls, look at urgency levels
    if (hasProperty(call, 'Urgencylevel') && call.Urgencylevel) {
      const urgencyLevel = call.Urgencylevel.toUpperCase();
      return urgencyLevel === 'U2' || urgencyLevel === 'U3' || urgencyLevel === 'U4';
    }
    // For medication calls, all are considered relevant
    else if (hasProperty(call, 'medication_name') && call.medication_name) {
      return true;
    }
    // For research calls, filter by relevance or findings
    else if (
      (hasProperty(call, 'relevance_score') && call.relevance_score) || 
      (hasProperty(call, 'findings') && call.findings)
    ) {
      return (hasProperty(call, 'relevance_score') && call.relevance_score > 50) || 
             (hasProperty(call, 'findings') && !!call.findings);
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
