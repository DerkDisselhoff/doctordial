import { isValidUUID } from './utils.ts'

export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      console.log(`Processing call ${call.id}...`)
      console.log('Raw VAPI call data:', JSON.stringify(call, null, 2))
      
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

      // Extract and validate assistant info
      const assistantInfo = call.assistant || {}
      console.log('Assistant info:', assistantInfo)
      
      // Parse and validate the sentiment analysis with detailed logging
      let sentimentAnalysis = {
        sentiment: 'neutral',
        urgency: 'low'
      }
      
      try {
        console.log('Raw sentiment data:', call.sentiment)
        if (call.sentiment) {
          // Handle different possible sentiment data structures
          if (typeof call.sentiment === 'string') {
            sentimentAnalysis.sentiment = call.sentiment
          } else if (typeof call.sentiment === 'object') {
            sentimentAnalysis = {
              sentiment: call.sentiment.overall || call.sentiment.sentiment || 'neutral',
              urgency: call.sentiment.urgency || 'low'
            }
          }
        }
      } catch (error) {
        console.warn(`Error parsing sentiment for call ${call.id}:`, error)
      }
      console.log('Processed sentiment analysis:', sentimentAnalysis)

      // Calculate urgency score with logging
      const urgencyMap = { high: 3, medium: 2, low: 1 }
      const urgencyScore = urgencyMap[sentimentAnalysis.urgency] || 1
      console.log('Calculated urgency score:', urgencyScore)

      // Process duration with detailed validation
      let duration = 0
      try {
        if (call.duration) {
          if (typeof call.duration === 'string') {
            duration = parseInt(call.duration, 10)
          } else if (typeof call.duration === 'number') {
            // If duration is in milliseconds (greater than 100000), convert to seconds
            duration = call.duration > 100000 ? Math.round(call.duration / 1000) : Math.round(call.duration)
          }
        }
      } catch (error) {
        console.warn(`Error processing duration for call ${call.id}:`, error)
      }
      console.log('Processed duration:', duration)

      // Extract and validate tags
      const tags = (() => {
        try {
          if (Array.isArray(call.tags)) return call.tags
          if (call.metadata?.tags) return call.metadata.tags
          return []
        } catch (error) {
          console.warn(`Error processing tags for call ${call.id}:`, error)
          return []
        }
      })()
      console.log('Processed tags:', tags)

      // Determine follow-up requirement with detailed logic
      const followUpRequired = (() => {
        try {
          if (call.follow_up_required === true) return true
          if (sentimentAnalysis.urgency === 'high') return true
          if (tags.some((tag: string) => tag.toLowerCase().includes('follow'))) return true
          if (call.follow_up_notes) return true
          return false
        } catch (error) {
          console.warn(`Error determining follow-up for call ${call.id}:`, error)
          return false
        }
      })()
      console.log('Follow-up required:', followUpRequired)

      // Process metadata with validation
      const metadata = call.metadata || {}
      console.log('Call metadata:', metadata)
      
      const callData = {
        id: supabaseId,
        call_id: call.id,
        caller_number: call.from || call.caller_number || null,
        recipient_number: call.to || call.recipient_number || null,
        duration: duration,
        status: call.status || 'completed',
        transcription: call.transcript || call.transcription || null,
        sentiment_analysis: sentimentAnalysis,
        created_at: createdAt,
        summary: call.summary || call.transcript?.substring(0, 200) || call.transcription?.substring(0, 200) || null,
        urgency_score: urgencyScore,
        assistant_name: assistantInfo.name || metadata.assistant_name || 'Vapi Assistant',
        assistant_id: assistantInfo.id || metadata.assistant_id || null,
        caller_name: call.caller_name || metadata.caller_name || null,
        language: call.language || metadata.language || 'en',
        recording_url: call.recording_url || metadata.recording_url || null,
        tags: tags,
        follow_up_required: followUpRequired,
        follow_up_notes: call.follow_up_notes || metadata.follow_up_notes || null,
        call_type: metadata.call_type || call.call_type || 'general',
        department: metadata.department || call.department || 'general',
        priority_level: sentimentAnalysis.urgency || call.priority_level || 'low',
        resolution_status: call.status === 'completed' ? 'resolved' : 'pending',
        callback_number: call.callback_number || call.from || metadata.callback_number || null
      }

      console.log('Final processed call data:', JSON.stringify(callData, null, 2))

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