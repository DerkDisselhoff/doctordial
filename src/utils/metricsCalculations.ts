
import { CallLog } from "@/types/metrics";

// Type guard to check if a property exists on an object
const hasProperty = <T extends object, K extends string>(obj: T, prop: K): obj is T & Record<K, unknown> => {
  return prop in obj;
};

// Helper function to safely get string value
const getStringValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  return '';
};

// Helper function to safely get number value
const getNumberValue = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
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
    (hasProperty(call, 'Action') && getStringValue(call.Action).toLowerCase().includes('forward to doctor')) || 
    (hasProperty(call, 'Status') && getStringValue(call.Status).toLowerCase().includes('forwarded')) ||
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
        if (hasProperty(call, 'intent')) {
          const intentValue = call.intent;
          return intentValue === true || intentValue === 'true';
        }
        // Check for confidence_level property
        if (hasProperty(call, 'confidence_level')) {
          const confidenceValue = getNumberValue(call.confidence_level);
          return confidenceValue > 70;
        }
        return false;
      }).length / callsWithIntentOrConfidence.length) * 100)
    : 0;

  // Count relevant cases (using Urgencylevel field and other indicators)
  const relevantCases = callData.filter(call => {
    // For triage calls, look at urgency levels
    if (hasProperty(call, 'Urgencylevel') && call.Urgencylevel) {
      const urgencyLevel = getStringValue(call.Urgencylevel).toUpperCase();
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
      const relevanceScore = getNumberValue(call.relevance_score);
      return relevanceScore > 50 || (hasProperty(call, 'findings') && !!call.findings);
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
