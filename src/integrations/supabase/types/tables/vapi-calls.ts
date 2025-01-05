export interface VapiCall {
  id: string;
  call_id: string;
  caller_number: string | null;
  recipient_number: string | null;
  duration: number | null;
  status: string | null;
  transcription: string | null;
  sentiment_analysis: {
    sentiment: string;
    urgency: string;
  } | null;
  created_at: string | null;
  summary: string | null;
  urgency_score: number | null;
  assistant_name: string | null;
  assistant_id: string | null;
  caller_name: string | null;
  language: string | null;
  recording_url: string | null;
  tags: any | null;
  follow_up_required: boolean;
  follow_up_notes: string | null;
  call_type: string | null;
  department: string | null;
  priority_level: string | null;
  resolution_status: string | null;
  callback_number: string | null;
}