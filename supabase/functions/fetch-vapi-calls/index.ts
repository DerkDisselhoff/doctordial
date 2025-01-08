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
    console.log('Starting VAPI data fetch...')
    
    // Get VAPI API key from secrets
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    if (!vapiKey) {
      throw new Error('VAPI API key not found')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch calls from VAPI API
    const response = await fetch('https://api.vapi.ai/call?include_transcription=true&include_sentiment=true', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
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
    console.log('Received VAPI data:', {
      callCount: data.length,
      sampleCall: data[0]
    })

    // Process and store each call
    const processPromises = data.map(async (call: any) => {
      try {
        const { data: insertData, error: insertError } = await supabaseClient
          .from('vapi_conversations')
          .upsert({
            vapi_id: call.id,
            assistant_id: call.assistant_id,
            started_at: call.start_time,
            ended_at: call.end_time,
            summary: call.summary,
            ended_reason: call.ended_reason,
            conversation_output: call.output || {},
            sentiment: call.sentiment_analysis?.sentiment,
            urgency_score: call.urgency_score,
            patient_name: call.caller_name,
            appointment_date: call.appointment_date,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'vapi_id'
          })

        if (insertError) {
          console.error('Error inserting call:', {
            error: insertError,
            call: call.id
          })
          throw insertError
        }

        return insertData
      } catch (error) {
        console.error('Error processing call:', {
          error: error.message,
          callId: call.id
        })
        throw error
      }
    })

    await Promise.all(processPromises)
    console.log('Successfully processed all calls')

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'VAPI data successfully fetched and stored',
        processedCalls: data.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in fetch-vapi-calls function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})