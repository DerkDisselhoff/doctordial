export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      if (!call || typeof call !== 'object') {
        console.error('Invalid call object:', call)
        continue
      }

      console.log(`Processing call ${call.id}...`)
      console.log('Raw VAPI call data:', JSON.stringify(call, null, 2))
      
      const callId = call.id
      if (!callId) {
        console.error('Call is missing ID:', call)
        continue
      }
      
      let createdAt
      try {
        createdAt = call.created_at ? new Date(call.created_at).toISOString() : new Date().toISOString()
      } catch (dateError) {
        console.warn(`Invalid date for call ${call.id}, using current timestamp`)
        createdAt = new Date().toISOString()
      }

      const assistantInfo = call.assistant || {}
      console.log('Assistant info:', assistantInfo)
      
      let sentimentAnalysis = null
      try {
        console.log('Raw sentiment data:', call.sentiment)
        if (call.sentiment) {
          if (typeof call.sentiment === 'string') {
            sentimentAnalysis = call.sentiment
          } else if (typeof call.sentiment === 'object') {
            sentimentAnalysis = call.sentiment.overall || call.sentiment.sentiment
          }
        }
      } catch (error) {
        console.warn(`Error parsing sentiment for call ${call.id}:`, error)
      }

      let duration = null
      try {
        if (call.duration) {
          if (typeof call.duration === 'string') {
            duration = parseInt(call.duration, 10)
          } else if (typeof call.duration === 'number') {
            duration = call.duration > 100000 ? Math.round(call.duration / 1000) : Math.round(call.duration)
          }
        }
      } catch (error) {
        console.warn(`Error processing duration for call ${call.id}:`, error)
      }

      // Common data for both tables
      const commonData = {
        call_id: callId,
        assistant_id: assistantInfo.id || null,
        assistant_name: assistantInfo.name || null,
        type: call.type || null,
        duration: duration,
        duration_seconds: duration,
        start_time: call.start_time ? new Date(call.start_time).toISOString() : null,
        end_time: call.end_time ? new Date(call.end_time).toISOString() : null,
        ended_reason: call.ended_reason || null,
        conversation_summary: call.summary || null,
        transcript: call.transcript || null,
        sentiment_score: sentimentAnalysis,
        intent: call.intent || null,
        metadata: call.metadata || {},
        created_at: createdAt,
        patient_id: call.patient_id || null,
        patient_name: call.patient_name || null,
        patient_phone: call.patient_phone || null,
        patient_email: call.patient_email || null,
        appointment_status: call.appointment_status || null,
        appointment_date: call.appointment_date ? new Date(call.appointment_date).toISOString() : null,
        medical_notes: call.medical_notes || null,
        symptoms: Array.isArray(call.symptoms) ? call.symptoms : [],
        action_required: call.action_required || false,
        action_type: call.action_type || null,
        action_deadline: call.action_deadline ? new Date(call.action_deadline).toISOString() : null,
        workflow_id: call.workflow_id || null,
        workflow_name: call.workflow_name || null,
        block_id: call.block_id || null,
        block_name: call.block_name || null,
        output_schema: call.output_schema || {},
        messages: Array.isArray(call.messages) ? call.messages : [],
        workflow_variables: call.workflow_variables || {},
        block_outputs: call.block_outputs || {},
        call_variables: call.call_variables || {},
        recording_url: call.recording_url || null,
        language: call.language || null,
        tags: call.tags || null,
        follow_up_required: call.follow_up_required || false,
        follow_up_notes: call.follow_up_notes || null,
        department: call.department || null,
        priority_level: call.priority_level || null,
        resolution_status: call.resolution_status || null,
        callback_number: call.callback_number || null,
        urgency_score: call.urgency_score || null
      }

      // Insert into both tables
      const [callLogsResult, vapiCallsResult] = await Promise.all([
        supabaseClient
          .from('call_logs')
          .upsert({
            ...commonData,
            phone_number: call.phone_number || call.from || null,
            cost: call.cost || null
          }, {
            onConflict: 'call_id',
            ignoreDuplicates: false
          }),

        supabaseClient
          .from('vapi_calls')
          .upsert({
            ...commonData,
            id: call.id,
            caller_number: call.caller_number || null,
            recipient_number: call.recipient_number || null,
            status: call.status || null,
            transcription: call.transcription || null,
            sentiment_analysis: call.sentiment_analysis || {},
            summary: call.summary || null,
            caller_name: call.caller_name || null
          }, {
            onConflict: 'call_id',
            ignoreDuplicates: false
          })
      ])

      if (callLogsResult.error) {
        console.error('Error upserting into call_logs:', {
          callId: call.id,
          error: callLogsResult.error.message,
          details: callLogsResult.error
        })
        errors.push({ id: call.id, table: 'call_logs', error: callLogsResult.error })
      }

      if (vapiCallsResult.error) {
        console.error('Error upserting into vapi_calls:', {
          callId: call.id,
          error: vapiCallsResult.error.message,
          details: vapiCallsResult.error
        })
        errors.push({ id: call.id, table: 'vapi_calls', error: vapiCallsResult.error })
      }

      if (!callLogsResult.error && !vapiCallsResult.error) {
        processedCalls++
        console.log(`Successfully processed call ${call.id} in both tables`)
      }
    } catch (error) {
      console.error(`Error processing call ${call.id}:`, error)
      errors.push({ id: call.id, error })
    }
  }

  return { processedCalls, errors }
}