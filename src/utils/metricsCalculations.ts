import { CallLog } from "@/types/metrics";

export const calculateMetrics = (callData: CallLog[] | null) => {
  if (!callData) return null;

  const totalCalls = callData.length;
  
  const avgDuration = callData.length > 0
    ? Math.round(callData.reduce((acc, call) => 
        acc + (parseInt(call.duration_seconds || '0') || 0), 0) / callData.length)
    : 0;

  // Count calls that have been forwarded (Action field contains 'forward' or similar)
  const callsForwarded = callData.filter(call => 
    call.Action?.toLowerCase().includes('forward')
  ).length;

  // Calculate success rate based on intent field being true
  const intentCalls = callData.filter(call => call.intent !== null);
  const callSuccess = intentCalls.length > 0
    ? Math.round((intentCalls.filter(call => 
        call.intent === 'true'
      ).length / intentCalls.length) * 100)
    : 0;

  // Count relevant cases (U2-U4)
  const relevantCases = callData.filter(call => {
    const urgencyLevel = call.Urgencylevel?.toUpperCase();
    return urgencyLevel === 'U2' || urgencyLevel === 'U3' || urgencyLevel === 'U4';
  }).length;

  return {
    totalCalls,
    avgDuration,
    callsForwarded,
    callSuccess,
    relevantCases
  };
};