import { CallLog } from "@/types/calls";

export const calculateMetrics = (callData: CallLog[] | null) => {
  if (!callData) return null;

  const totalCalls = callData.length;
  
  const avgDuration = callData.length > 0
    ? Math.round(callData.reduce((acc, call) => 
        acc + (parseInt(call.duration_seconds || '0') || 0), 0) / callData.length)
    : 0;

  const appointmentsMade = callData.filter(call => 
    call.Status?.toLowerCase() === 'scheduled'
  ).length;

  const sentimentCalls = callData.filter(call => call.Sentiment);
  const positiveSentiment = sentimentCalls.length > 0
    ? Math.round((sentimentCalls.filter(call => 
        call.Sentiment?.toLowerCase().includes('positive')
      ).length / sentimentCalls.length) * 100)
    : 0;

  const urgentCases = callData.filter(call => {
    const urgencyLevel = call.Urgencylevel?.toUpperCase();
    return urgencyLevel === 'U1' || urgencyLevel === 'U2';
  }).length;

  return {
    totalCalls,
    avgDuration,
    appointmentsMade,
    positiveSentiment,
    urgentCases
  };
};