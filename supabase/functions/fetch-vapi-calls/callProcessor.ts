import { isValidUUID } from './utils.ts'

export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      console.log(`Processing call ${call.id}...`)
      
      // Always generate a new UUID for Supabase
      const supabaseId = crypto.randomUUID()
      
      // Safely handle the created_at date
      let createdAt
      try {
        createdAt = call.created_at ? new Date(call.created_at).toISOString() : new Date().toISOString()
      } catch (dateError) {
        console.warn(`Invalid date for call ${call.id}, using current timestamp`)
        createdAt = new Date().toISOString()
      }

      // Safely handle duration (convert to seconds if in milliseconds)
      const duration = call.duration ? Math.round(call.duration / 1000) : 0

      // Extract sentiment from analysis or provide default
      const sentimentAnalysis = call.sentiment || { sentiment: 'neutral', urgency: 'low' }

      // Process additional fields with safe fallbacks
      const callData = {
        id: supabaseId,
        call_id: call.id,
        caller_number: call.from || null,
        recipient_number: call.to || null,
        duration: duration,
        status: call.status || null,
        transcription: call.transcript || null,
        sentiment_analysis: sentimentAnalysis,
        created_at: createdAt,
        summary: call.summary || null,
        urgency_score: call.urgency_score || null,
        assistant_name: call.assistant?.name || null,
        assistant_id: call.assistant?.id || null,
        caller_name: call.caller_name || null,
        language: call.language || null,
        recording_url: call.recording_url || null,
        tags: call.tags || null,
        follow_up_required: call.follow_up_required || false,
        follow_up_notes: call.follow_up_notes || null,
        call_type: call.call_type || null,
        department: call.department || null,
        priority_level: call.priority_level || null,
        resolution_status: call.resolution_status || null,
        callback_number: call.callback_number || null
      }

      console.log('Inserting call data:', callData)

      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert(callData)

      if (error) {
        console.error('Error inserting call:', {
          callId: call.id,
          error: error.message,
          details: error
        })
        errors.push({ id: call.id, error })
      } else {
        processedCalls++
        console.log(`Successfully processed call ${call.id} with Supabase ID ${supabaseId}`)
      }
    } catch (error) {
      console.error(`Error processing call ${call.id}:`, error)
      errors.push({ id: call.id, error })
    }
  }

  return { processedCalls, errors }
}