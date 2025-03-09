
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
      
      // Determine which table to insert into based on call type
      let targetTable = 'call_logs_triage'; // Default table
      
      // Check if the call is medication related
      if (callData.type === 'medication' || 
          (callData.metadata && callData.metadata.type === 'medication') ||
          (callData.tags && callData.tags.includes('medication'))) {
        targetTable = 'call_logs_medications';
      }
      // Check if the call is research related
      else if (callData.type === 'research' || 
               (callData.metadata && callData.metadata.type === 'research') ||
               (callData.tags && callData.tags.includes('research'))) {
        targetTable = 'call_logs_researchresults';
      }

      console.log(`Inserting into table: ${targetTable}`);
      
      // Insert data based on the determined target table
      let insertResult;
      
      if (targetTable === 'call_logs_triage') {
        insertResult = await supabase
          .from(targetTable)
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
              Name: callData.patient_name,
              Urgencylevel: callData.urgency_score?.toString(),
              Symptoms: callData.symptoms || {}
            },
          ])
          .select()
      }
      else if (targetTable === 'call_logs_medications') {
        insertResult = await supabase
          .from(targetTable)
          .insert([
            {
              call_id: callData.id,
              assistant_id: callData.assistant_id,
              patient_id: callData.patient_id,
              patient_name: callData.patient_name,
              phone_number: callData.phone_number,
              medication_name: callData.medication_name || (callData.metadata && callData.metadata.medication_name),
              dosage: callData.dosage || (callData.metadata && callData.metadata.dosage),
              frequency: callData.frequency || (callData.metadata && callData.metadata.frequency),
              duration: callData.medication_duration || (callData.metadata && callData.metadata.duration),
              side_effects: callData.side_effects || (callData.metadata && callData.metadata.side_effects),
              instructions: callData.instructions || (callData.metadata && callData.metadata.instructions),
              prescription_date: callData.prescription_date || (callData.metadata && callData.metadata.prescription_date),
              renewal_date: callData.renewal_date || (callData.metadata && callData.metadata.renewal_date),
              pharmacy_details: callData.pharmacy_details || (callData.metadata && callData.metadata.pharmacy),
              doctor_notes: callData.doctor_notes || callData.medical_notes,
              conversation_summary: callData.summary,
              transcript: callData.transcript
            },
          ])
          .select()
      }
      else if (targetTable === 'call_logs_researchresults') {
        insertResult = await supabase
          .from(targetTable)
          .insert([
            {
              call_id: callData.id,
              assistant_id: callData.assistant_id,
              patient_id: callData.patient_id,
              patient_name: callData.patient_name,
              phone_number: callData.phone_number,
              research_topic: callData.research_topic || (callData.metadata && callData.metadata.research_topic),
              research_question: callData.research_question || (callData.metadata && callData.metadata.research_question),
              findings: callData.findings || (callData.metadata && callData.metadata.findings),
              sources: callData.sources || (callData.metadata && callData.metadata.sources),
              relevance_score: callData.relevance_score || (callData.metadata && callData.metadata.relevance_score),
              confidence_level: callData.confidence_level || (callData.metadata && callData.metadata.confidence_level),
              recommendation: callData.recommendation || (callData.metadata && callData.metadata.recommendation),
              conversation_summary: callData.summary,
              transcript: callData.transcript
            },
          ])
          .select()
      }

      if (insertResult.error) {
        console.error(`Error inserting data into ${targetTable}:`, insertResult.error)
        return new Response(
          JSON.stringify({ error: `Failed to insert data into ${targetTable}` }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      console.log(`Successfully inserted call data into ${targetTable}:`, insertResult.data)
      return new Response(
        JSON.stringify({ success: true, data: insertResult.data }),
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
