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
  call_id: string;
  duration_seconds: string;
  Status: string;
  Sentiment: string;
  Urgencylevel: string;
  Action: string;
  intent: string | boolean;
}

export interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  navigateTo: string;
}