export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assistant_status: {
        Row: {
          assistant_id: string | null
          assistant_name: string | null
          created_at: string
          id: string
          is_live: boolean
          profile_id: string
          updated_at: string
        }
        Insert: {
          assistant_id?: string | null
          assistant_name?: string | null
          created_at?: string
          id?: string
          is_live?: boolean
          profile_id: string
          updated_at?: string
        }
        Update: {
          assistant_id?: string | null
          assistant_name?: string | null
          created_at?: string
          id?: string
          is_live?: boolean
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_status_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      call_flags: {
        Row: {
          additional_notes: string | null
          assistant_name: string | null
          call_id: string
          correct_urgency: string | null
          created_at: string
          created_by: string
          id: string
          reason: string
        }
        Insert: {
          additional_notes?: string | null
          assistant_name?: string | null
          call_id: string
          correct_urgency?: string | null
          created_at?: string
          created_by: string
          id?: string
          reason: string
        }
        Update: {
          additional_notes?: string | null
          assistant_name?: string | null
          call_id?: string
          correct_urgency?: string | null
          created_at?: string
          created_by?: string
          id?: string
          reason?: string
        }
        Relationships: []
      }
      call_logs_medications: {
        Row: {
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          Date_of_birth: string | null
          doctor_notes: string | null
          dosage: string | null
          duration: string | null
          duration_seconds: string | null
          end_time: string | null
          frequency: string | null
          id: string
          instructions: string | null
          medication_name: string | null
          Packages: number | null
          patient_id: string | null
          patient_name: string | null
          pharmacy_details: Json | null
          phone_number: string | null
          prescription_date: string | null
          renewal_date: string | null
          side_effects: string | null
          start_time: string | null
          transcript: string | null
          updated_at: string | null
        }
        Insert: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          Date_of_birth?: string | null
          doctor_notes?: string | null
          dosage?: string | null
          duration?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          medication_name?: string | null
          Packages?: number | null
          patient_id?: string | null
          patient_name?: string | null
          pharmacy_details?: Json | null
          phone_number?: string | null
          prescription_date?: string | null
          renewal_date?: string | null
          side_effects?: string | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Update: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          Date_of_birth?: string | null
          doctor_notes?: string | null
          dosage?: string | null
          duration?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          medication_name?: string | null
          Packages?: number | null
          patient_id?: string | null
          patient_name?: string | null
          pharmacy_details?: Json | null
          phone_number?: string | null
          prescription_date?: string | null
          renewal_date?: string | null
          side_effects?: string | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      call_logs_researchresults: {
        Row: {
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          confidence_level: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          date_of_birth: string | null
          duration_seconds: string | null
          end_time: string | null
          findings: string | null
          id: string
          patient_id: string | null
          patient_name: string | null
          phone_number: string | null
          recommendation: string | null
          relevance_score: number | null
          research_date: string | null
          research_name: string | null
          research_question: string | null
          sources: Json | null
          start_time: string | null
          transcript: string | null
          updated_at: string | null
        }
        Insert: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          confidence_level?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          findings?: string | null
          id?: string
          patient_id?: string | null
          patient_name?: string | null
          phone_number?: string | null
          recommendation?: string | null
          relevance_score?: number | null
          research_date?: string | null
          research_name?: string | null
          research_question?: string | null
          sources?: Json | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Update: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          confidence_level?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          findings?: string | null
          id?: string
          patient_id?: string | null
          patient_name?: string | null
          phone_number?: string | null
          recommendation?: string | null
          relevance_score?: number | null
          research_date?: string | null
          research_name?: string | null
          research_question?: string | null
          sources?: Json | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      call_logs_triage: {
        Row: {
          Action: string | null
          action_required: boolean | null
          appointment_date: string | null
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          duration_seconds: string | null
          Emotion: string | null
          end_time: string | null
          ended_reason: string | null
          flagging: Json | null
          follow_up_notes: string | null
          Forwarded: boolean | null
          id: string
          intent: string | null
          metadata: Json | null
          Name: string | null
          patient_email: string | null
          patient_id: string | null
          patient_phone: string | null
          phone_number: string | null
          "Question Summary": string | null
          Sentiment: string | null
          start_time: string | null
          Status: string | null
          Symptoms: Json | null
          transcript: string | null
          type: string | null
          Urgencylevel: string | null
        }
        Insert: {
          Action?: string | null
          action_required?: boolean | null
          appointment_date?: string | null
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: string | null
          Emotion?: string | null
          end_time?: string | null
          ended_reason?: string | null
          flagging?: Json | null
          follow_up_notes?: string | null
          Forwarded?: boolean | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          Name?: string | null
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          phone_number?: string | null
          "Question Summary"?: string | null
          Sentiment?: string | null
          start_time?: string | null
          Status?: string | null
          Symptoms?: Json | null
          transcript?: string | null
          type?: string | null
          Urgencylevel?: string | null
        }
        Update: {
          Action?: string | null
          action_required?: boolean | null
          appointment_date?: string | null
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: string | null
          Emotion?: string | null
          end_time?: string | null
          ended_reason?: string | null
          flagging?: Json | null
          follow_up_notes?: string | null
          Forwarded?: boolean | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          Name?: string | null
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          phone_number?: string | null
          "Question Summary"?: string | null
          Sentiment?: string | null
          start_time?: string | null
          Status?: string | null
          Symptoms?: Json | null
          transcript?: string | null
          type?: string | null
          Urgencylevel?: string | null
        }
        Relationships: []
      }
      company_subscriptions: {
        Row: {
          created_at: string
          id: string
          package_name: string
          profile_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          package_name: string
          profile_id: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          package_name?: string
          profile_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_call_logs_medications: {
        Row: {
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          Date_of_birth: string | null
          doctor_notes: string | null
          dosage: string | null
          duration: string | null
          duration_seconds: string | null
          end_time: string | null
          frequency: string | null
          id: string
          instructions: string | null
          medication_name: string | null
          Packages: number | null
          patient_id: string | null
          patient_name: string | null
          pharmacy_details: Json | null
          phone_number: string | null
          prescription_date: string | null
          renewal_date: string | null
          side_effects: string | null
          start_time: string | null
          transcript: string | null
          updated_at: string | null
        }
        Insert: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          Date_of_birth?: string | null
          doctor_notes?: string | null
          dosage?: string | null
          duration?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          medication_name?: string | null
          Packages?: number | null
          patient_id?: string | null
          patient_name?: string | null
          pharmacy_details?: Json | null
          phone_number?: string | null
          prescription_date?: string | null
          renewal_date?: string | null
          side_effects?: string | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Update: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          Date_of_birth?: string | null
          doctor_notes?: string | null
          dosage?: string | null
          duration?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          medication_name?: string | null
          Packages?: number | null
          patient_id?: string | null
          patient_name?: string | null
          pharmacy_details?: Json | null
          phone_number?: string | null
          prescription_date?: string | null
          renewal_date?: string | null
          side_effects?: string | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      demo_call_logs_researchresults: {
        Row: {
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          confidence_level: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          date_of_birth: string | null
          duration_seconds: string | null
          end_time: string | null
          findings: string | null
          id: string
          patient_id: string | null
          patient_name: string | null
          phone_number: string | null
          recommendation: string | null
          relevance_score: number | null
          research_date: string | null
          research_name: string | null
          research_question: string | null
          sources: Json | null
          start_time: string | null
          transcript: string | null
          updated_at: string | null
        }
        Insert: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          confidence_level?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          findings?: string | null
          id?: string
          patient_id?: string | null
          patient_name?: string | null
          phone_number?: string | null
          recommendation?: string | null
          relevance_score?: number | null
          research_date?: string | null
          research_name?: string | null
          research_question?: string | null
          sources?: Json | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Update: {
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          confidence_level?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          duration_seconds?: string | null
          end_time?: string | null
          findings?: string | null
          id?: string
          patient_id?: string | null
          patient_name?: string | null
          phone_number?: string | null
          recommendation?: string | null
          relevance_score?: number | null
          research_date?: string | null
          research_name?: string | null
          research_question?: string | null
          sources?: Json | null
          start_time?: string | null
          transcript?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      demo_call_logs_triage: {
        Row: {
          Action: string | null
          action_required: boolean | null
          appointment_date: string | null
          assistant_id: string | null
          call_id: string | null
          client_id: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          duration_seconds: string | null
          Emotion: string | null
          end_time: string | null
          ended_reason: string | null
          flagging: Json | null
          follow_up_notes: string | null
          Forwarded: boolean | null
          id: string
          intent: string | null
          metadata: Json | null
          Name: string | null
          patient_email: string | null
          patient_id: string | null
          patient_phone: string | null
          phone_number: string | null
          "Question Summary": string | null
          Sentiment: string | null
          start_time: string | null
          Status: string | null
          Symptoms: Json | null
          transcript: string | null
          type: string | null
          Urgencylevel: string | null
        }
        Insert: {
          Action?: string | null
          action_required?: boolean | null
          appointment_date?: string | null
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: string | null
          Emotion?: string | null
          end_time?: string | null
          ended_reason?: string | null
          flagging?: Json | null
          follow_up_notes?: string | null
          Forwarded?: boolean | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          Name?: string | null
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          phone_number?: string | null
          "Question Summary"?: string | null
          Sentiment?: string | null
          start_time?: string | null
          Status?: string | null
          Symptoms?: Json | null
          transcript?: string | null
          type?: string | null
          Urgencylevel?: string | null
        }
        Update: {
          Action?: string | null
          action_required?: boolean | null
          appointment_date?: string | null
          assistant_id?: string | null
          call_id?: string | null
          client_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: string | null
          Emotion?: string | null
          end_time?: string | null
          ended_reason?: string | null
          flagging?: Json | null
          follow_up_notes?: string | null
          Forwarded?: boolean | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          Name?: string | null
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          phone_number?: string | null
          "Question Summary"?: string | null
          Sentiment?: string | null
          start_time?: string | null
          Status?: string | null
          Symptoms?: Json | null
          transcript?: string | null
          type?: string | null
          Urgencylevel?: string | null
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          phone: string
          practice_count: number
          practice_name: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          phone: string
          practice_count: number
          practice_name: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          phone?: string
          practice_count?: number
          practice_name?: string
        }
        Relationships: []
      }
      email_config: {
        Row: {
          created_at: string | null
          from_email: string
          from_name: string
          id: string
          to_emails: string[]
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          from_email: string
          from_name: string
          id?: string
          to_emails: string[]
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          from_email?: string
          from_name?: string
          id?: string
          to_emails?: string[]
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      package_features: {
        Row: {
          created_at: string
          features: Json
          fte_count: number | null
          id: string
          minutes_included: number | null
          monthly_price: number | null
          overage_fee: number | null
          package_name: Database["public"]["Enums"]["subscription_package"]
          price_per_hour: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          features: Json
          fte_count?: number | null
          id?: string
          minutes_included?: number | null
          monthly_price?: number | null
          overage_fee?: number | null
          package_name: Database["public"]["Enums"]["subscription_package"]
          price_per_hour?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          features?: Json
          fte_count?: number | null
          id?: string
          minutes_included?: number | null
          monthly_price?: number | null
          overage_fee?: number | null
          package_name?: Database["public"]["Enums"]["subscription_package"]
          price_per_hour?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      pricing_submissions: {
        Row: {
          company_name: string
          created_at: string
          email: string
          id: number
          name: string
          phone: string
          practice_count: string
          role: string
        }
        Insert: {
          company_name: string
          created_at?: string
          email: string
          id?: never
          name: string
          phone: string
          practice_count: string
          role: string
        }
        Update: {
          company_name?: string
          created_at?: string
          email?: string
          id?: never
          name?: string
          phone?: string
          practice_count?: string
          role?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          demo_account: boolean | null
          id: string
          phone_number: string | null
          preferred_language: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          demo_account?: boolean | null
          id: string
          phone_number?: string | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          demo_account?: boolean | null
          id?: string
          phone_number?: string | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      secrets: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string
          id: string
          language: string
          translations: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          language: string
          translations?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          translations?: Json
          updated_at?: string
        }
        Relationships: []
      }
      vapi_conversations: {
        Row: {
          additional_questions: string | null
          appointment_date: string | null
          assistant_id: string | null
          conversation_output: Json | null
          created_at: string | null
          ended_at: string | null
          ended_reason: string | null
          follow_up_action: string | null
          follow_up_step: string | null
          id: string
          patient_name: string | null
          patient_question: string | null
          sentiment: string | null
          started_at: string | null
          summary: string | null
          summary_question: string | null
          updated_at: string | null
          urgency_score: number | null
          vapi_id: string
        }
        Insert: {
          additional_questions?: string | null
          appointment_date?: string | null
          assistant_id?: string | null
          conversation_output?: Json | null
          created_at?: string | null
          ended_at?: string | null
          ended_reason?: string | null
          follow_up_action?: string | null
          follow_up_step?: string | null
          id?: string
          patient_name?: string | null
          patient_question?: string | null
          sentiment?: string | null
          started_at?: string | null
          summary?: string | null
          summary_question?: string | null
          updated_at?: string | null
          urgency_score?: number | null
          vapi_id: string
        }
        Update: {
          additional_questions?: string | null
          appointment_date?: string | null
          assistant_id?: string | null
          conversation_output?: Json | null
          created_at?: string | null
          ended_at?: string | null
          ended_reason?: string | null
          follow_up_action?: string | null
          follow_up_step?: string | null
          id?: string
          patient_name?: string | null
          patient_question?: string | null
          sentiment?: string | null
          started_at?: string | null
          summary?: string | null
          summary_question?: string | null
          updated_at?: string | null
          urgency_score?: number | null
          vapi_id?: string
        }
        Relationships: []
      }
      workflow_unsuitable_subjects: {
        Row: {
          created_at: string
          forward_to: string
          id: string
          profile_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          forward_to: string
          id?: string
          profile_id: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          forward_to?: string
          id?: string
          profile_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_unsuitable_subjects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_urgency_settings: {
        Row: {
          advice_type: Database["public"]["Enums"]["advice_type"] | null
          assistant_phone: string | null
          created_at: string
          forward_step: Database["public"]["Enums"]["forward_step"]
          id: string
          profile_id: string
          updated_at: string
          urgency_level: string
        }
        Insert: {
          advice_type?: Database["public"]["Enums"]["advice_type"] | null
          assistant_phone?: string | null
          created_at?: string
          forward_step: Database["public"]["Enums"]["forward_step"]
          id?: string
          profile_id: string
          updated_at?: string
          urgency_level: string
        }
        Update: {
          advice_type?: Database["public"]["Enums"]["advice_type"] | null
          assistant_phone?: string | null
          created_at?: string
          forward_step?: Database["public"]["Enums"]["forward_step"]
          id?: string
          profile_id?: string
          updated_at?: string
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_urgency_settings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      advice_type: "simple" | "extensive"
      forward_step: "call_112" | "forward_to_assistant" | "provide_selfcare"
      subscription_package: "starter" | "growth" | "professional" | "enterprise"
      user_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
