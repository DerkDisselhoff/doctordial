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

      // Log the data we're about to insert
      console.log('Inserting call data:', {
        id: supabaseId,
        call_id: call.id,
        caller_number: call.from,
        recipient_number: call.to,
        duration: call.duration,
        status: call.status,
        transcription: call.transcript,
        sentiment_analysis: call.sentiment,
        created_at: createdAt
      })

      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert({
          id: supabaseId,
          call_id: call.id,
          caller_number: call.from,
          recipient_number: call.to,
          duration: call.duration,
          status: call.status,
          transcription: call.transcript,
          sentiment_analysis: call.sentiment,
          created_at: createdAt
        })

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