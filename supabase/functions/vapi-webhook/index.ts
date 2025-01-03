import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-vapi-secret',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Enhanced logging
    console.log('==================== NEW WEBHOOK REQUEST ====================')
    console.log('Request Method:', req.method)
    console.log('Request URL:', req.url)
    
    // Log all headers for debugging
    const headers = Object.fromEntries(req.headers.entries())
    console.log('All request headers:', JSON.stringify(headers, null, 2))
    
    // Get VAPI secret from request header and compare with env
    const vapiSecret = req.headers.get('x-vapi-secret')
    const expectedSecret = Deno.env.get('VAPI_API_KEY')
    
    console.log('Authentication check:')
    console.log('- Received secret header:', vapiSecret ? '[PRESENT]' : '[MISSING]')
    console.log('- Expected secret in env:', expectedSecret ? '[PRESENT]' : '[MISSING]')
    
    // More detailed secret comparison logging
    if (vapiSecret && expectedSecret) {
      console.log('Secret comparison:')
      console.log('- First 4 chars of received:', vapiSecret.substring(0, 4))
      console.log('- First 4 chars of expected:', expectedSecret.substring(0, 4))
      console.log('- Lengths match:', vapiSecret.length === expectedSecret.length)
      console.log('- Exact match:', vapiSecret === expectedSecret)
    }

    if (!vapiSecret || !expectedSecret) {
      console.error('Missing VAPI authentication credentials')
      return new Response(
        JSON.stringify({ 
          error: 'Missing VAPI authentication credentials',
          details: {
            secretPresent: !!vapiSecret,
            envSecretPresent: !!expectedSecret
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    if (vapiSecret !== expectedSecret) {
      console.error('Invalid VAPI authentication credentials')
      console.log('Secret mismatch details:', {
        receivedLength: vapiSecret.length,
        expectedLength: expectedSecret.length,
        first4CharsMatch: vapiSecret.substring(0, 4) === expectedSecret.substring(0, 4)
      })
      return new Response(
        JSON.stringify({ 
          error: 'Invalid VAPI authentication credentials',
          details: {
            lengthMismatch: vapiSecret.length !== expectedSecret.length,
            first4CharsMatch: vapiSecret.substring(0, 4) === expectedSecret.substring(0, 4)
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    // Log request body
    const body = await req.json()
    console.log('Received VAPI webhook payload:', JSON.stringify(body, null, 2))

    // Initialize Supabase client
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