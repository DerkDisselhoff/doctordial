import { supabase } from "@/integrations/supabase/client";

export interface VapiCall {
  id: number;
  call_id: string;
  caller_number: string | null;
  recipient_number: string | null;
  duration: number | null;
  status: string | null;
  created_at: string;
  transcription: string | null;
  sentiment_analysis: any | null;
}

export const fetchVapiCalls = async (): Promise<VapiCall[]> => {
  const { data, error } = await supabase
    .from('vapi_calls')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching VAPI calls:', error);
    throw error;
  }

  return data || [];
};

export const fetchVapiCallById = async (id: string): Promise<VapiCall | null> => {
  const { data, error } = await supabase
    .from('vapi_calls')
    .select('*')
    .eq('call_id', id)
    .single();

  if (error) {
    console.error('Error fetching VAPI call:', error);
    throw error;
  }

  return data;
};