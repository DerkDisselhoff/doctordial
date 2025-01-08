import { supabase } from "@/integrations/supabase/client";

export interface VapiCall {
  id: string;
  call_id: string;
  caller_number: string | null;
  recipient_number: string | null;
  duration: number | null;
  status: string | null;
  created_at: string;
  transcription: string | null;
  sentiment_analysis: any | null;
  summary: string | null;
  urgency_score: number | null;
  assistant_name: string | null;
  assistant_id: string | null;
  caller_name: string | null;
  language: string | null;
  recording_url: string | null;
  tags: any | null;
  follow_up_required: boolean;
  follow_up_notes: string | null;
  call_type: string | null;
  department: string | null;
  priority_level: string | null;
  resolution_status: string | null;
  callback_number: string | null;
  workflow_id: string | null;
  workflow_name: string | null;
  block_id: string | null;
  block_name: string | null;
  output_schema: any;
  messages: any[];
  workflow_variables: any;
  block_outputs: any;
  call_variables: any;
}

export const fetchVapiCalls = async (): Promise<VapiCall[]> => {
  const { data: secretData, error: secretError } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'VAPI_API_KEY')
    .single();

  if (secretError) {
    console.error('Error fetching VAPI API key:', secretError);
    throw secretError;
  }

  const vapiKey = secretData.value;
  let allCalls: any[] = [];
  let nextToken = null;
  
  do {
    try {
      // Construct URL with pagination and comprehensive parameters
      let url = 'https://api.vapi.ai/call?limit=100&include_transcription=true&include_sentiment=true';
      if (nextToken) {
        url += `&next=${nextToken}`;
      }

      console.log('Fetching VAPI calls from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${vapiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('VAPI API error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          endpoint: '/call'
        });
        throw new Error(`VAPI API error: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('VAPI API response:', {
        callsCount: responseData.length,
        sampleCall: responseData[0],
        hasMore: !!responseData.next
      });

      // Add calls to our collection
      if (Array.isArray(responseData.data)) {
        allCalls = allCalls.concat(responseData.data);
      } else if (Array.isArray(responseData)) {
        allCalls = allCalls.concat(responseData);
      }

      // Update next token for pagination
      nextToken = responseData.next || null;

    } catch (error) {
      console.error('Error fetching VAPI calls:', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  } while (nextToken);

  console.log(`Successfully fetched ${allCalls.length} total calls from VAPI`);
  return allCalls;
};

export const fetchVapiCallById = async (id: string): Promise<VapiCall | null> => {
  const { data: secretData, error: secretError } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'VAPI_API_KEY')
    .single();

  if (secretError) {
    console.error('Error fetching VAPI API key:', secretError);
    throw secretError;
  }

  const vapiKey = secretData.value;

  try {
    const response = await fetch(`https://api.vapi.ai/call/${id}?include_transcription=true&include_sentiment=true`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint: `/call/${id}`
      });
      throw new Error(`VAPI API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('VAPI call details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching VAPI call details:', {
      error: error.message,
      stack: error.stack,
      callId: id
    });
    throw error;
  }
}

export const fetchAssistantCalls = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-assistant-calls')
    
    if (error) {
      console.error('Error fetching assistant calls:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in fetchAssistantCalls:', error)
    throw error
  }
}
