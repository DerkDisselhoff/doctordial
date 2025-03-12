
import { LucideIcon } from "lucide-react";

export type TimeFilter = 'today' | 'week' | 'month';

export interface CallMetrics {
  totalCalls: number;
  avgDuration: number;
  callsForwarded: number;
  callSuccess: number;
  relevantCases: number;
}

// Common properties shared by all call log types
interface BaseCallLog {
  id: string;
  call_id?: string;
  duration_seconds?: string;
  // Common fields
  start_time?: string;
  end_time?: string;
  assistant_id?: string;
  client_id?: string;
  updated_at?: string;
  created_at?: string;
  conversation_summary?: string;
  transcript?: string;
  cost?: number;
  phone_number?: string;
  Forwarded?: boolean;
}

// Triage-specific properties
interface TriageCallLog extends BaseCallLog {
  Status?: unknown;
  Sentiment?: unknown;
  Urgencylevel?: unknown;
  Action?: unknown;
  intent?: unknown;
  Name?: unknown;
  Symptoms?: any;
  Emotion?: unknown;
  patient_id?: string;
}

// Medication-specific properties
interface MedicationCallLog extends BaseCallLog {
  medication_name?: unknown;
  dosage?: unknown;
  frequency?: unknown;
  duration?: unknown;
  patient_name?: unknown;
  patient_id?: string;
  Date_of_birth?: string;
  side_effects?: unknown;
  instructions?: unknown;
  pharmacy_details?: any;
  doctor_notes?: unknown;
  Packages?: number;
  intent?: unknown;
}

// Research-specific properties
interface ResearchCallLog extends BaseCallLog {
  research_name?: unknown;
  findings?: unknown;
  confidence_level?: unknown;
  relevance_score?: unknown;
  research_question?: unknown;
  patient_name?: unknown;
  patient_id?: string;
  date_of_birth?: string;
  sources?: any;
  recommendation?: unknown;
  intent?: unknown;
}

// Union type representing any call log type
export type CallLog = TriageCallLog | MedicationCallLog | ResearchCallLog;

export interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  navigateTo: string;
}
