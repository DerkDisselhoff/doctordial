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

    // Process the webhook data and insert into both tables
    const [vapiCallsResult, callLogsResult] = await Promise.all([
      // Insert into vapi_calls
      supabaseClient
        .from('vapi_calls')
        .upsert({
          call_id: body.call_id,
          caller_number: body.caller_number,
          recipient_number: body.recipient_number,
          duration: body.duration,
          status: body.status,
          transcription: body.transcription,
          sentiment_analysis: body.sentiment_analysis,
          summary: body.summary,
          urgency_score: body.urgency_score,
          assistant_name: body.assistant_name,
          assistant_id: body.assistant_id,
          caller_name: body.caller_name,
          language: body.language,
          recording_url: body.recording_url,
          tags: body.tags,
          follow_up_required: body.follow_up_required,
          follow_up_notes: body.follow_up_notes,
          call_type: body.call_type,
          department: body.department,
          priority_level: body.priority_level,
          resolution_status: body.resolution_status,
          callback_number: body.callback_number,
          workflow_id: body.workflow_id,
          workflow_name: body.workflow_name,
          block_id: body.block_id,
          block_name: body.block_name,
          output_schema: body.output_schema,
          messages: body.messages,
          workflow_variables: body.workflow_variables,
          block_outputs: body.block_outputs,
          call_variables: body.call_variables,
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
          action_deadline: body.action_deadline
        }, {
          onConflict: 'call_id'
        }),

      // Insert into call_logs
      supabaseClient
        .from('call_logs')
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
          action_deadline: body.action_deadline
        }, {
          onConflict: 'call_id'
        })
    ])

    if (vapiCallsResult.error) {
      console.error('Error inserting into vapi_calls:', vapiCallsResult.error)
      throw vapiCallsResult.error
    }

    if (callLogsResult.error) {
      console.error('Error inserting into call_logs:', callLogsResult.error)
      throw callLogsResult.error
    }

    console.log('Successfully processed webhook data')

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          vapi_calls: vapiCallsResult.data,
          call_logs: callLogsResult.data
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