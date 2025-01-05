import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../fetch-vapi-calls/cors.ts'
import { processVapiCalls } from '../fetch-vapi-calls/callProcessor.ts'
import { fetchVapiCalls } from '../fetch-vapi-calls/vapiClient.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Fetching VAPI calls...')
    const calls = await fetchVapiCalls()
    console.log(`Fetched ${calls.length} calls from VAPI`)

    const { processedCalls, errors } = await processVapiCalls(supabaseClient, calls)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${processedCalls} calls`,
        errors: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})