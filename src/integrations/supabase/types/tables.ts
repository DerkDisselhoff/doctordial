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