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
    console.log('Webhook received - Method:', req.method)
    
    // Log headers for debugging
    console.log('Request headers:', Object.fromEntries(req.headers.entries()))
    
    // Verify VAPI secret if provided
    const vapiSecret = req.headers.get('x-vapi-secret')
    const expectedSecret = Deno.env.get('VAPI_API_KEY')
    
    if (expectedSecret && vapiSecret !== expectedSecret) {
      console.error('Invalid VAPI secret')
      throw new Error('Invalid VAPI secret')
    }

    const body = await req.json()
    console.log('Received VAPI webhook payload:', JSON.stringify(body, null, 2))

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Attempting to insert data into vapi_calls table...')

    // Generate a UUID for the id field
    const id = crypto.randomUUID()

    const { data, error } = await supabaseClient
      .from('vapi_calls')
      .insert({
        id,
        call_id: body.call_id,
        caller_number: body.caller_number,
        recipient_number: body.recipient_number,
        duration: body.duration,
        status: body.status,
        transcription: body.transcription,
        sentiment_analysis: body.sentiment_analysis,
        created_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Error inserting data:', error)
      throw error
    }

    console.log('Successfully inserted data:', data)

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    // Return a more detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
        stack: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})