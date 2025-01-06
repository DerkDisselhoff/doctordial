import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? '',
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Get the request path
  const url = new URL(req.url)
  
  // Handle root path
  if (url.pathname === '/') {
    return new Response(
      JSON.stringify({ 
        status: 'ok',
        message: 'VAPI Data Sync endpoint is running. Send POST requests to /webhook to process call data.' 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  // Handle webhook path
  if (url.pathname === '/webhook' && req.method === 'POST') {
    try {
      console.log('Processing VAPI webhook request...')
      
      // Parse incoming JSON from VAPI webhook
      const callData = await req.json()
      console.log('Received call data:', JSON.stringify(callData, null, 2))

      // Insert data into 'call_logs' table
      const { data, error } = await supabase
        .from("call_logs")
        .insert([
          {
            call_id: callData.id,
            assistant_id: callData.assistant_id,
            type: callData.type,
            phone_number: callData.phone_number,
            cost: callData.cost,
            start_time: callData.start_time,
            end_time: callData.end_time,
            duration_seconds: callData.duration,
            ended_reason: callData.ended_reason,
            conversation_summary: callData.summary,
            transcript: callData.transcript,
            sentiment_score: callData.sentiment,
            intent: callData.intent,
            metadata: callData.metadata || {},
          },
        ])
        .select()

      if (error) {
        console.error("Error inserting data:", error)
        return new Response(
          JSON.stringify({ error: "Failed to insert data" }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      console.log('Successfully inserted call data:', data)
      return new Response(
        JSON.stringify({ success: true, data }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } catch (error) {
      console.error("Error processing request:", error)
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  }

  // Handle invalid paths
  return new Response(
    JSON.stringify({ 
      error: "Not Found",
      message: "Invalid endpoint. Use /webhook for VAPI data processing."
    }),
    { 
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
})