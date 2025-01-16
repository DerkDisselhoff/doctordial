import { LucideIcon } from "lucide-react";

export type TimeFilter = 'today' | 'week' | 'month';

export interface CallMetrics {
  totalCalls: number;
  avgDuration: number;
  appointmentsMade: number;
  positiveSentiment: number;
  urgentCases: number;
}

export interface CallLog {
  id: string;
  call_id: string;
  duration_seconds: string;
  Status: string;
  Sentiment: string;
  Urgencylevel: string;
}

export interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  navigateTo: string;
}