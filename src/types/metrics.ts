export type TimeFilter = 'today' | 'week' | 'month';

export interface Metrics {
  totalCalls: number;
  avgDuration: number;
  appointmentsMade: number;
  positiveSentiment: number;
  urgentCases: number;
}

export interface CallLog {
  duration_seconds: string;
  Status: string;
  Sentiment: string;
  Urgencylevel: string;
}

export interface MetricsCardProps {
  icon: React.ComponentType;
  label: string;
  value: string | number;
  subtext: string;
  navigateTo: string;
}