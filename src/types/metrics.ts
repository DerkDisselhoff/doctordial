
import { LucideIcon } from "lucide-react";

export type TimeFilter = 'today' | 'week' | 'month';

export interface CallMetrics {
  totalCalls: number;
  avgDuration: number;
  callsForwarded: number;
  callSuccess: number;
  relevantCases: number;
}

export interface CallLog {
  id: string;
  call_id?: string;
  duration_seconds?: string;
  Status?: string;
  Sentiment?: string;
  Urgencylevel?: string;
  Action?: string;
  intent?: string | boolean;
  // Medication fields
  medication_name?: string;
  dosage?: string;
  frequency?: string;
  // Research fields
  research_name?: string;
  findings?: string;
  confidence_level?: string | number;
  relevance_score?: number;
  // Common fields
  start_time?: string;
  end_time?: string;
  assistant_id?: string;
  client_id?: string;
  patient_id?: string;
  updated_at?: string;
  created_at?: string;
  Forwarded?: boolean;
}

export interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  navigateTo: string;
}
