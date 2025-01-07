import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from './cors.ts'
import { initializeSupabase } from './supabaseClient.ts'
import { fetchVapiCalls } from './vapiClient.ts'
import { validateVapiKey } from './utils.ts'
import { processVapiCalls } from './callProcessor.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
  }

  try {
    console.log('Starting VAPI calls fetch...')
    
    // Validate VAPI API key
    const vapiKey = validateVapiKey()
    if (!vapiKey) {
      throw new Error('VAPI API key not found')
    }

    // Initialize Supabase client
    const supabaseClient = initializeSupabase()
    if (!supabaseClient) {
      throw new Error('Failed to initialize Supabase client')
    }
    console.log('Supabase client initialized')

    // Fetch calls from VAPI
    const vapiCalls = await fetchVapiCalls(vapiKey)
    console.log(`Fetched ${vapiCalls?.length || 0} calls from VAPI`)

    if (!Array.isArray(vapiCalls)) {
      throw new Error('Invalid response format from VAPI')
    }

    // Process the calls
    const { processedCalls, errors } = await processVapiCalls(supabaseClient, vapiCalls)
    
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
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
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
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})