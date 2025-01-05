import { isValidUUID } from './utils.ts'

export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0
  const errors: any[] = []
  
  for (const call of calls) {
    try {
      console.log(`Processing call ${call.id}...`)
      
      // Generate a new UUID for each call if the ID isn't a valid UUID
      const callId = isValidUUID(call.id) ? call.id : crypto.randomUUID()
      
      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert({
          id: callId,
          call_id: call.id, // Keep original VAPI ID as call_id
          caller_number: call.from,
          recipient_number: call.to,
          duration: call.duration,
          status: call.status,
          transcription: call.transcription,
          sentiment_analysis: call.sentiment,
          created_at: new Date(call.created_at).toISOString()
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
        console.log(`Successfully processed call ${call.id}`)
      }
    } catch (error) {
      console.error(`Error processing call ${call.id}:`, error)
      errors.push({ id: call.id, error })
    }
  }

  return { processedCalls, errors }
}