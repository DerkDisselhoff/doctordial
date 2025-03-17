
import { Json } from './json';
import {
  Profile,
  DemoRequest,
  PricingSubmission,
  VapiCall,
  CompanySubscription,
  CallLogTriage,
  CallLogMedication,
  CallLogResearchResult,
  CallFlag
} from './tables';
import { UserRole } from './enums';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      demo_requests: {
        Row: DemoRequest;
        Insert: Omit<DemoRequest, 'id' | 'created_at'>;
        Update: Partial<Omit<DemoRequest, 'id'>>;
      };
      pricing_submissions: {
        Row: PricingSubmission;
        Insert: Omit<PricingSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<PricingSubmission, 'id'>>;
      };
      vapi_calls: {
        Row: VapiCall;
        Insert: Omit<VapiCall, 'created_at'>;
        Update: Partial<VapiCall>;
      };
      company_subscriptions: {
        Row: CompanySubscription;
        Insert: Omit<CompanySubscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CompanySubscription, 'id'>>;
      };
      call_logs_triage: {
        Row: CallLogTriage;
        Insert: Omit<CallLogTriage, 'id' | 'created_at'>;
        Update: Partial<CallLogTriage>;
      };
      call_logs_medications: {
        Row: CallLogMedication;
        Insert: Omit<CallLogMedication, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<CallLogMedication>;
      };
      call_logs_researchresults: {
        Row: CallLogResearchResult;
        Insert: Omit<CallLogResearchResult, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<CallLogResearchResult>;
      };
      call_flags: {
        Row: CallFlag;
        Insert: Omit<CallFlag, 'id' | 'created_at'>;
        Update: Partial<Omit<CallFlag, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
