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
      call_logs: {
        Row: {
          assistant_id: string | null
          call_id: string | null
          conversation_summary: string | null
          cost: number | null
          created_at: string | null
          duration_seconds: number | null
          end_time: string | null
          ended_reason: string | null
          id: string
          intent: string | null
          metadata: Json | null
          phone_number: string | null
          sentiment_score: number | null
          start_time: string | null
          transcript: string | null
          type: string | null
        }
        Insert: {
          assistant_id?: string | null
          call_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          ended_reason?: string | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          phone_number?: string | null
          sentiment_score?: number | null
          start_time?: string | null
          transcript?: string | null
          type?: string | null
        }
        Update: {
          assistant_id?: string | null
          call_id?: string | null
          conversation_summary?: string | null
          cost?: number | null
          created_at?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          ended_reason?: string | null
          id?: string
          intent?: string | null
          metadata?: Json | null
          phone_number?: string | null
          sentiment_score?: number | null
          start_time?: string | null
          transcript?: string | null
          type?: string | null
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
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          id?: string
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
      vapi_calls: {
        Row: {
          assistant_id: string | null
          assistant_name: string | null
          block_id: string | null
          block_name: string | null
          block_outputs: Json | null
          call_id: string
          call_type: string | null
          call_variables: Json | null
          callback_number: string | null
          caller_name: string | null
          caller_number: string | null
          created_at: string | null
          department: string | null
          duration: number | null
          follow_up_notes: string | null
          follow_up_required: boolean | null
          id: string
          language: string | null
          messages: Json[] | null
          output_schema: Json | null
          priority_level: string | null
          recipient_number: string | null
          recording_url: string | null
          resolution_status: string | null
          sentiment_analysis: Json | null
          status: string | null
          summary: string | null
          tags: Json | null
          transcription: string | null
          urgency_score: number | null
          workflow_id: string | null
          workflow_name: string | null
          workflow_variables: Json | null
        }
        Insert: {
          assistant_id?: string | null
          assistant_name?: string | null
          block_id?: string | null
          block_name?: string | null
          block_outputs?: Json | null
          call_id: string
          call_type?: string | null
          call_variables?: Json | null
          callback_number?: string | null
          caller_name?: string | null
          caller_number?: string | null
          created_at?: string | null
          department?: string | null
          duration?: number | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id: string
          language?: string | null
          messages?: Json[] | null
          output_schema?: Json | null
          priority_level?: string | null
          recipient_number?: string | null
          recording_url?: string | null
          resolution_status?: string | null
          sentiment_analysis?: Json | null
          status?: string | null
          summary?: string | null
          tags?: Json | null
          transcription?: string | null
          urgency_score?: number | null
          workflow_id?: string | null
          workflow_name?: string | null
          workflow_variables?: Json | null
        }
        Update: {
          assistant_id?: string | null
          assistant_name?: string | null
          block_id?: string | null
          block_name?: string | null
          block_outputs?: Json | null
          call_id?: string
          call_type?: string | null
          call_variables?: Json | null
          callback_number?: string | null
          caller_name?: string | null
          caller_number?: string | null
          created_at?: string | null
          department?: string | null
          duration?: number | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id?: string
          language?: string | null
          messages?: Json[] | null
          output_schema?: Json | null
          priority_level?: string | null
          recipient_number?: string | null
          recording_url?: string | null
          resolution_status?: string | null
          sentiment_analysis?: Json | null
          status?: string | null
          summary?: string | null
          tags?: Json | null
          transcription?: string | null
          urgency_score?: number | null
          workflow_id?: string | null
          workflow_name?: string | null
          workflow_variables?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
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
