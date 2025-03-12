
export interface ResearchLog {
  id: string;
  call_id: string;
  patient_name: string;
  date_of_birth: string;
  conversation_summary: string;
  research_name: string;
  research_date: string;
  transcript: string;
  duration_seconds: string;
  created_at: string;
  findings: string;
  recommendation: string;
  confidence_level: string;
  relevance_score: number;
  phone_number: string;
  patient_id: string;
  sources: any;
}
