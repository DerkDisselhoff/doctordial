import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const ASSISTANT_ID = '9a324826-2acb-4baa-8d93-e9ef8d0d6dbb'
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    
    if (!vapiKey) {
      throw new Error('VAPI API key not found in environment variables')
    }

    console.log('Fetching calls for assistant:', ASSISTANT_ID)

    const response = await fetch(`https://api.vapi.ai/call?assistant_id=${ASSISTANT_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`VAPI API error: ${errorText}`)
    }

    const data = await response.json()
    console.log(`Successfully fetched ${data.length || 0} calls`)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert data into vapi_conversations table
    if (Array.isArray(data) && data.length > 0) {
      for (const call of data) {
        const conversationOutput = call.conversation_output || {}
        
        const mappedData = {
          vapi_id: call.id,
          assistant_id: call.assistant_id,
          started_at: call.started_at,
          ended_at: call.ended_at,
          summary: call.summary,
          ended_reason: call.ended_reason,
          conversation_output: call.conversation_output,
          sentiment: conversationOutput.sentiment,
          urgency_score: conversationOutput.urgencyscore,
          summary_question: conversationOutput.samenvattingvraag,
          patient_question: conversationOutput.vraagpatient,
          patient_name: conversationOutput.Naam,
          appointment_date: conversationOutput.Datum,
          follow_up_step: conversationOutput.vervolgstap,
          follow_up_action: conversationOutput.vervolgactie,
          additional_questions: conversationOutput.overige_vragen
        }

        const { error } = await supabaseClient
          .from('vapi_conversations')
          .upsert(mappedData, { 
            onConflict: 'vapi_id',
            ignoreDuplicates: false 
          })

        if (error) {
          console.error('Error inserting call data:', error)
          throw error
        }
      }
      
      console.log(`Successfully processed ${data.length} calls`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${data.length || 0} calls` 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in fetch-assistant-calls function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})