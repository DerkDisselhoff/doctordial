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
    console.log('Starting VAPI calls fetch process...')
    
    // Validate VAPI API key
    const vapiKey = validateVapiKey()
    console.log('VAPI key validation successful')

    // Initialize Supabase client
    const supabaseClient = initializeSupabase()
    console.log('Supabase client initialized')

    // Fetch calls from VAPI with enhanced logging
    console.log('Initiating VAPI API call...')
    const vapiCalls = await fetchVapiCalls(vapiKey)
    
    console.log('VAPI API Response Summary:', {
      totalCalls: vapiCalls.length,
      sampleCallIds: vapiCalls.slice(0, 3).map(call => call.id),
      timestamp: new Date().toISOString()
    })

    if (!Array.isArray(vapiCalls)) {
      throw new Error('Invalid response format from VAPI')
    }

    // Process the calls
    const { processedCalls, errors } = await processVapiCalls(supabaseClient, vapiCalls)
    
    console.log('Processing Summary:', {
      totalProcessed: processedCalls,
      errorCount: errors.length,
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${processedCalls} calls`,
        errors: errors.length > 0 ? errors : undefined,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in fetch-vapi-calls function:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})