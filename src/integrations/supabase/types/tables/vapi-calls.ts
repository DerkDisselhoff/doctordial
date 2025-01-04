export interface VapiCall {
  id: string;
  call_id: string;
  caller_number: string | null;
  recipient_number: string | null;
  duration: number | null;
  status: string | null;
  transcription: string | null;
  sentiment_analysis: any | null;
  created_at: string | null;
}