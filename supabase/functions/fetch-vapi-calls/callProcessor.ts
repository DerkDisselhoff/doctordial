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
      
      // Use the VAPI call ID as our unique identifier
      const callId = call.id
      if (!callId) {
        console.error('Call is missing ID:', call)
        continue
      }
      
      // Safely handle the created_at date
      let createdAt
      try {
        createdAt = call.created_at ? new Date(call.created_at).toISOString() : new Date().toISOString()
      } catch (dateError) {
        console.warn(`Invalid date for call ${call.id}, using current timestamp`)
        createdAt = new Date().toISOString()
      }

      // Extract and validate assistant info with detailed logging
      const assistantInfo = call.assistant || {}
      console.log('Assistant info:', assistantInfo)
      
      // Parse and validate the sentiment analysis with detailed logging
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
      console.log('Processed sentiment analysis:', sentimentAnalysis)

      // Process duration with detailed validation
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
      console.log('Processed duration:', duration)

      const callData = {
        call_id: callId,
        assistant_id: assistantInfo.id || null,
        type: call.type || null,
        phone_number: call.phone_number || call.from || null,
        cost: call.cost || null,
        start_time: call.start_time ? new Date(call.start_time).toISOString() : null,
        end_time: call.end_time ? new Date(call.end_time).toISOString() : null,
        duration_seconds: duration,
        ended_reason: call.ended_reason || null,
        conversation_summary: call.summary || null,
        transcript: call.transcript || null,
        sentiment_score: sentimentAnalysis,
        intent: call.intent || null,
        metadata: call.metadata || {},
        created_at: createdAt
      }

      console.log('Final processed call data:', JSON.stringify(callData, null, 2))

      // Use upsert with call_id as the unique identifier
      const { error } = await supabaseClient
        .from('call_logs')
        .upsert(callData, { 
          onConflict: 'call_id',  // Use call_id as the conflict resolution key
          ignoreDuplicates: false // Update existing records
        })

      if (error) {
        console.error('Error upserting call:', {
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