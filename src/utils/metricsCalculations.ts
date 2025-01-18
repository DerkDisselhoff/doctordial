import { CallLog } from "@/types/metrics";

export const calculateMetrics = (callData: CallLog[] | null) => {
  if (!callData) return null;

  const totalCalls = callData.length;
  
  const avgDuration = callData.length > 0
    ? Math.round(callData.reduce((acc, call) => 
        acc + (parseInt(call.duration_seconds || '0') || 0), 0) / callData.length)
    : 0;

  const callsForwarded = callData.filter(call => 
    call.Action?.toLowerCase().includes('forward to doctor')
  ).length;

  const callsWithIntent = callData.filter(call => call.intent !== undefined && call.intent !== null);
  const callSuccess = callsWithIntent.length > 0
    ? Math.round((callsWithIntent.filter(call => 
        call.intent === true || call.intent === 'true'
      ).length / callsWithIntent.length) * 100)
    : 0;

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