
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
      return new Response(
        JSON.stringify({ error: 'Invalid VAPI authentication credentials' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Log webhook payload
    const body = await req.json()
    console.log('Received VAPI webhook payload:', JSON.stringify(body, null, 2))

    // Determine which table to insert into based on call type
    let targetTable = 'call_logs_triage'; // Default table
    
    // Check if the call is medication related
    if (body.call_type === 'medication' || 
        (body.metadata && body.metadata.type === 'medication') ||
        (body.tags && body.tags.includes('medication'))) {
      targetTable = 'call_logs_medications';
    }
    // Check if the call is research related
    else if (body.call_type === 'research' || 
            (body.metadata && body.metadata.type === 'research') ||
            (body.tags && body.tags.includes('research'))) {
      targetTable = 'call_logs_researchresults';
    }

    console.log(`Inserting into table: ${targetTable}`);

    // Process the webhook data and insert into the appropriate table
    let insertResult;
    
    if (targetTable === 'call_logs_triage') {
      insertResult = await supabaseClient
        .from('call_logs_triage')
        .upsert({
          call_id: body.call_id,
          assistant_id: body.assistant_id,
          type: body.call_type,
          phone_number: body.caller_number,
          cost: body.cost,
          start_time: body.start_time,
          end_time: body.end_time,
          duration_seconds: body.duration,
          ended_reason: body.ended_reason,
          conversation_summary: body.summary,
          transcript: body.transcription,
          sentiment_score: body.sentiment_analysis?.score,
          intent: body.intent,
          metadata: body.metadata,
          patient_id: body.patient_id,
          patient_name: body.patient_name,
          patient_phone: body.patient_phone,
          patient_email: body.patient_email,
          appointment_status: body.appointment_status,
          appointment_date: body.appointment_date,
          medical_notes: body.medical_notes,
          symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
          action_required: body.action_required || false,
          action_type: body.action_type,
          action_deadline: body.action_deadline,
          Name: body.patient_name || body.caller_name,
          Urgencylevel: body.urgency_level || body.priority_level,
          Status: body.status || body.resolution_status
        }, {
          onConflict: 'call_id'
        });
    } 
    else if (targetTable === 'call_logs_medications') {
      insertResult = await supabaseClient
        .from('call_logs_medications')
        .upsert({
          call_id: body.call_id,
          assistant_id: body.assistant_id,
          patient_id: body.patient_id,
          patient_name: body.patient_name || body.caller_name,
          phone_number: body.caller_number,
          medication_name: body.medication_name || (body.metadata && body.metadata.medication_name),
          dosage: body.dosage || (body.metadata && body.metadata.dosage),
          frequency: body.frequency || (body.metadata && body.metadata.frequency),
          duration: body.medication_duration || (body.metadata && body.metadata.duration),
          side_effects: body.side_effects || (body.metadata && body.metadata.side_effects),
          instructions: body.instructions || (body.metadata && body.metadata.instructions),
          prescription_date: body.prescription_date || (body.metadata && body.metadata.prescription_date),
          renewal_date: body.renewal_date || (body.metadata && body.metadata.renewal_date),
          pharmacy_details: body.pharmacy_details || (body.metadata && body.metadata.pharmacy),
          doctor_notes: body.doctor_notes || body.medical_notes,
          conversation_summary: body.summary,
          transcript: body.transcription
        }, {
          onConflict: 'call_id'
        });
    }
    else if (targetTable === 'call_logs_researchresults') {
      insertResult = await supabaseClient
        .from('call_logs_researchresults')
        .upsert({
          call_id: body.call_id,
          assistant_id: body.assistant_id,
          patient_id: body.patient_id,
          patient_name: body.patient_name || body.caller_name,
          phone_number: body.caller_number,
          research_topic: body.research_topic || (body.metadata && body.metadata.research_topic),
          research_question: body.research_question || (body.metadata && body.metadata.research_question),
          findings: body.findings || (body.metadata && body.metadata.findings),
          sources: body.sources || (body.metadata && body.metadata.sources),
          relevance_score: body.relevance_score || (body.metadata && body.metadata.relevance_score),
          confidence_level: body.confidence_level || (body.metadata && body.metadata.confidence_level),
          recommendation: body.recommendation || (body.metadata && body.metadata.recommendation),
          conversation_summary: body.summary,
          transcript: body.transcription
        }, {
          onConflict: 'call_id'
        });
    }

    if (insertResult.error) {
      console.error(`Error inserting into ${targetTable}:`, insertResult.error)
      throw insertResult.error
    }

    console.log('Successfully processed webhook data')

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          table: targetTable,
          result: insertResult.data
        }
      }),
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
