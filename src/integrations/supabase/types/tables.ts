
import { UserRole } from './enums';

export interface Profile {
  id: string;
  username: string | null;
  role: UserRole | null;
  avatar_url: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface DemoRequest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  practice_name: string;
  practice_count: number;
  created_at: string;
}

export interface PricingSubmission {
  id: number;
  practice_count: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
  created_at: string;
}

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

export interface CompanySubscription {
  id: string;
  profile_id: string;
  package_name: string;
  status: 'pending' | 'active' | 'cancelled';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CallLogTriage {
  id: string;
  call_id: string | null;
  assistant_id: string | null;
  phone_number: string | null;
  cost: number | null;
  start_time: string | null;
  end_time: string | null;
  duration_seconds: string | null;
  ended_reason: string | null;
  conversation_summary: string | null;
  transcript: string | null;
  intent: string | null;
  metadata: any | null;
  Name: string | null;
  patient_id: string | null;
  patient_phone: string | null;
  patient_email: string | null;
  appointment_date: string | null;
  Urgencylevel: string | null;
  Symptoms: any | null;
  Forwarded: boolean | null;
  Status: string | null;
  Action: string | null;
  Sentiment: string | null;
  flagging: any | null;
  follow_up_notes: string | null;
  Emotion: string | null;
  "Question Summary": string | null;
  action_required: boolean | null;
  created_at: string | null;
}

export interface CallLogMedication {
  id: string;
  call_id: string | null;
  assistant_id: string | null;
  patient_id: string | null;
  patient_name: string | null;
  phone_number: string | null;
  medication_name: string | null;
  dosage: string | null;
  frequency: string | null;
  duration: string | null;
  side_effects: string | null;
  instructions: string | null;
  prescription_date: string | null;
  renewal_date: string | null;
  pharmacy_details: any | null;
  doctor_notes: string | null;
  conversation_summary: string | null;
  transcript: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CallLogResearchResult {
  id: string;
  call_id: string | null;
  assistant_id: string | null;
  patient_id: string | null;
  patient_name: string | null;
  phone_number: string | null;
  research_topic: string | null;
  research_question: string | null;
  findings: string | null;
  sources: any | null;
  relevance_score: number | null;
  confidence_level: string | null;
  recommendation: string | null;
  conversation_summary: string | null;
  transcript: string | null;
  created_at: string | null;
  updated_at: string | null;
}
