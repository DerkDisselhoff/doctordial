import { isValidUUID } from './utils.ts'

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

      // Extract and validate assistant info with detailed logging
      let assistantName = 'Vapi Assistant' // Default fallback
      let assistantId = null
      
      console.log('Processing assistant information:', {
        rawAssistant: call.assistant,
        rawMetadata: call.metadata
      })

      // Enhanced assistant information extraction
      if (call.assistant) {
        if (typeof call.assistant === 'string') {
          // If assistant is directly a string, use it as the name
          assistantName = call.assistant
        } else if (typeof call.assistant === 'object') {
          // Handle different possible assistant data structures
          if (call.assistant.name) {
            assistantName = call.assistant.name
          } else if (call.assistant.model) {
            assistantName = call.assistant.model
          }
          
          // Extract assistant ID from various possible locations
          assistantId = call.assistant.id || 
                       call.assistant.assistant_id || 
                       call.assistant.model_id ||
                       null
        }
      } else if (call.metadata?.assistant) {
        // Try to get assistant info from metadata
        if (typeof call.metadata.assistant === 'object') {
          assistantName = call.metadata.assistant.name || 
                         call.metadata.assistant.model ||
                         'Vapi Assistant'
          assistantId = call.metadata.assistant.id || 
                       call.metadata.assistant.assistant_id ||
                       null
        } else if (typeof call.metadata.assistant === 'string') {
          assistantName = call.metadata.assistant
        }
      }

      // Map known assistant names to their proper names based on the VAPI dashboard
      const assistantNameMap: { [key: string]: string } = {
        'alloy': 'Medicall AI expensive version',
        'marta': 'Medicall AI cheap version NL',
        'nova': 'Hoofd model NL - rime ai',
        'MqvxHuZP0MWXPlNUh65f': 'Vapi model + openal'
      }

      // Update assistant name if it matches any known mappings
      assistantName = assistantNameMap[assistantName.toLowerCase()] || assistantName

      console.log('Processed assistant information:', {
        assistantName,
        assistantId
      })
      
      // Parse and validate the sentiment analysis
      let sentimentAnalysis = {
        sentiment: 'neutral',
        urgency: 'low'
      }
      
      try {
        console.log('Raw sentiment data:', call.sentiment)
        if (call.sentiment) {
          if (typeof call.sentiment === 'string') {
            sentimentAnalysis.sentiment = call.sentiment
          } else if (typeof call.sentiment === 'object') {
            if (call.sentiment.overall || call.sentiment.sentiment) {
              sentimentAnalysis.sentiment = call.sentiment.overall || call.sentiment.sentiment
            }
            if (call.sentiment.urgency) {
              sentimentAnalysis.urgency = call.sentiment.urgency
            }
          }
        }
      } catch (error) {
        console.warn(`Error parsing sentiment for call ${call.id}:`, error)
      }

      // Calculate urgency score
      const urgencyMap = { high: 3, medium: 2, low: 1 }
      const urgencyScore = urgencyMap[sentimentAnalysis.urgency as keyof typeof urgencyMap] || 1

      // Process duration
      let duration = 0
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

      // Determine follow-up requirement
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

      // Process metadata
      const metadata = call.metadata || {}

      // Extract caller information
      const callerName = call.caller_name || metadata.caller_name || call.from || null
      const callerNumber = call.from || call.caller_number || metadata.caller_number || null
      
      const callData = {
        id: supabaseId,
        call_id: call.id || `CALL-${Date.now()}`,
        caller_number: callerNumber,
        recipient_number: call.to || call.recipient_number || metadata.recipient_number || null,
        duration: duration || null,
        status: call.status || 'completed',
        transcription: call.transcript || call.transcription || null,
        sentiment_analysis: sentimentAnalysis,
        created_at: createdAt,
        summary: call.summary || call.transcript?.substring(0, 200) || call.transcription?.substring(0, 200) || null,
        urgency_score: urgencyScore,
        assistant_name: assistantName,
        assistant_id: assistantId,
        caller_name: callerName,
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