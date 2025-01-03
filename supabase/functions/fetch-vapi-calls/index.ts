import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validate environment variables and initialize Supabase client
const initializeSupabase = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing')
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Fetch calls from VAPI API
const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API...')
  try {
    const response = await fetch('https://api.vapi.ai/calls', {
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
      // Instead of throwing, return empty data array
      return { data: [] }
    }

    const data = await response.json()
    console.log(`Received ${data.data?.length || 0} calls from VAPI`)
    return data
  } catch (error) {
    console.error('Error fetching VAPI calls:', error)
    // Return empty data array instead of throwing
    return { data: [] }
  }
}

// Validate UUID format
const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Process and store calls in Supabase
const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      console.log(`Processing call ${call.id}...`)
      
      // Validate UUID format
      if (!isValidUUID(call.id)) {
        console.warn(`Invalid UUID format for call ${call.id}, skipping...`)
        continue
      }

      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert({
          id: call.id,
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
        errors.push({ id: call.id, error })
      } else {
        processedCalls++
        console.log(`Successfully processed call ${call.id}`)
      }
    } catch (error) {
      console.error(`Error processing call ${call.id}:`, error)
      errors.push({ id: call.id, error })
    }
  }

  return { processedCalls, errors }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting VAPI calls fetch...')
    
    // Validate VAPI API key
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    if (!vapiKey) {
      console.error('VAPI API key not found in environment variables')
      throw new Error('VAPI API key not configured')
    }

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