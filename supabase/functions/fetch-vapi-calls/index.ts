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
    console.log('Fetching VAPI calls...')
    
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    if (!vapiKey) {
      throw new Error('VAPI API key not configured')
    }

    // Fetch calls from VAPI API
    const response = await fetch('https://api.vapi.ai/call/list', {
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('VAPI API error:', await response.text())
      throw new Error(`VAPI API returned ${response.status}`)
    }

    const calls = await response.json()
    console.log('Received calls from VAPI:', calls)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Process each call
    for (const call of calls.data) {
      const id = crypto.randomUUID()
      
      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert({
          id,
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
        console.error('Error inserting call:', error)
        throw error
      }
    }

    console.log('Successfully processed calls')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${calls.data.length} calls` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error processing calls:', error)
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