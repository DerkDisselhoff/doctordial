import { isValidUUID } from './utils.ts'

export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      console.log(`Processing call ${call.id}...`)
      console.log('Raw VAPI call data:', call)
      
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

      // Extract assistant info from the call object
      const assistantInfo = call.assistant || {}
      
      // Parse and validate the sentiment analysis
      let sentimentAnalysis = {
        sentiment: 'neutral',
        urgency: 'low'
      }
      
      try {
        if (call.sentiment) {
          sentimentAnalysis = {
            sentiment: call.sentiment.overall || 'neutral',
            urgency: call.sentiment.urgency || 'low'
          }
        }
      } catch (error) {
        console.warn(`Error parsing sentiment for call ${call.id}:`, error)
      }

      // Calculate urgency score based on sentiment
      const urgencyMap = { high: 3, medium: 2, low: 1 }
      const urgencyScore = urgencyMap[sentimentAnalysis.urgency] || 1

      // Process duration (ensure it's in seconds)
      const duration = call.duration 
        ? typeof call.duration === 'string' 
          ? parseInt(call.duration, 10) 
          : Math.round(call.duration)
        : 0

      // Extract tags from the call metadata
      const tags = Array.isArray(call.tags) 
        ? call.tags 
        : call.metadata?.tags || []

      // Determine if follow-up is required based on sentiment and tags
      const followUpRequired = sentimentAnalysis.urgency === 'high' || 
        tags.some((tag: string) => tag.toLowerCase().includes('follow'))

      // Process call type and department from metadata
      const metadata = call.metadata || {}
      
      const callData = {
        id: supabaseId,
        call_id: call.id,
        caller_number: call.from || null,
        recipient_number: call.to || null,
        duration: duration,
        status: call.status || 'completed',
        transcription: call.transcript || null,
        sentiment_analysis: sentimentAnalysis,
        created_at: createdAt,
        summary: call.summary || call.transcript?.substring(0, 200) || null,
        urgency_score: urgencyScore,
        assistant_name: assistantInfo.name || 'Vapi model + openai',
        assistant_id: assistantInfo.id || null,
        caller_name: call.caller_name || call.metadata?.caller_name || null,
        language: call.language || call.metadata?.language || 'en',
        recording_url: call.recording_url || null,
        tags: tags,
        follow_up_required: followUpRequired,
        follow_up_notes: call.follow_up_notes || null,
        call_type: metadata.call_type || 'general',
        department: metadata.department || 'general',
        priority_level: sentimentAnalysis.urgency || 'low',
        resolution_status: call.status === 'completed' ? 'resolved' : 'pending',
        callback_number: call.callback_number || call.from || null
      }

      console.log('Processed call data:', callData)

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