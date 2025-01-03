import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting VAPI calls fetch...')
    
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    if (!vapiKey) {
      console.error('VAPI API key not found in environment variables')
      throw new Error('VAPI API key not configured')
    }

    console.log('Fetching calls from VAPI API...')

    // Fetch calls from VAPI API
    const response = await fetch('https://api.vapi.ai/call/list', {
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
      throw new Error(`VAPI API returned ${response.status}: ${errorText}`)
    }

    const calls = await response.json()
    console.log(`Received ${calls.data?.length || 0} calls from VAPI`)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not found')
      throw new Error('Supabase configuration missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client initialized')

    // Process each call
    let processedCalls = 0
    for (const call of calls.data || []) {
      // Use the VAPI call ID as the UUID for our database
      // This ensures we don't create duplicate entries and maintains referential integrity
      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert({
          id: call.id, // Use VAPI's call ID directly as our UUID
          call_id: call.id,
          caller_number: call.from,
          recipient_number: call.to,
          duration: call.duration,
          status: call.status,
          transcription: call.transcription,
          sentiment_analysis: call.sentiment,
          created_at: new Date(call.created_at).toISOString()
        })

      if (error) {
        console.error('Error inserting call:', {
          callId: call.id,
          error: error.message,
          details: error
        })
        throw error
      }
      processedCalls++
      console.log(`Processed call ${call.id} successfully`)
    }

    console.log(`Successfully processed ${processedCalls} calls`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${processedCalls} calls` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in fetch-vapi-calls function:', {
      error: error.message,
      stack: error.stack
    })
    
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