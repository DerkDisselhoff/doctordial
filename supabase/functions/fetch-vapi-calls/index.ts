import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from './cors.ts'
import { initializeSupabase } from './supabaseClient.ts'
import { fetchVapiCalls } from './vapiClient.ts'
import { validateVapiKey } from './utils.ts'
import { processVapiCalls } from './callProcessor.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting VAPI calls fetch...')
    
    // Validate VAPI API key
    const vapiKey = validateVapiKey()

    // Initialize Supabase client
    const supabaseClient = initializeSupabase()
    console.log('Supabase client initialized')

    // Fetch and process calls
    const vapiResponse = await fetchVapiCalls(vapiKey)
    const { processedCalls, errors } = await processVapiCalls(supabaseClient, vapiResponse.data || [])
    
    console.log(`Successfully completed processing ${processedCalls} calls`)
    if (errors.length > 0) {
      console.warn(`Encountered ${errors.length} errors while processing calls`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${processedCalls} calls`,
        errors: errors.length > 0 ? errors : undefined
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