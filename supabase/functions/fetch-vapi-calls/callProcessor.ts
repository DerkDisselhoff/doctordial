export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0;
  const errors: any[] = [];
  
  for (const call of calls) {
    try {
      if (!call || typeof call !== 'object') {
        console.error('Invalid call object:', call);
        continue;
      }

      console.log('Processing raw call data:', JSON.stringify(call, null, 2));
      
      const callId = call.id;
      if (!callId) {
        console.error('Call is missing ID:', call);
        continue;
      }

      // Extract assistant info with better error handling
      let assistantId = null;
      let assistantName = null;
      
      if (call.assistant) {
        console.log('Assistant data found:', call.assistant);
        assistantId = call.assistant.id || call.assistantId;
        assistantName = call.assistant.name || call.assistantName;
      } else {
        console.log('No assistant object found, checking direct properties');
        assistantId = call.assistant_id || call.assistantId;
        assistantName = call.assistant_name || call.assistantName;
      }
      
      console.log('Extracted assistant info:', { assistantId, assistantName });

      // Parse dates with validation
      let startTime = null;
      let endTime = null;
      let createdAt = null;

      try {
        if (call.startedAt || call.started_at || call.start_time) {
          startTime = new Date(call.startedAt || call.started_at || call.start_time).toISOString();
          console.log('Parsed start time:', startTime);
        }
        
        if (call.endedAt || call.ended_at || call.end_time) {
          endTime = new Date(call.endedAt || call.ended_at || call.end_time).toISOString();
          console.log('Parsed end time:', endTime);
        }
        
        createdAt = call.created_at ? 
          new Date(call.created_at).toISOString() : 
          new Date().toISOString();
      } catch (dateError) {
        console.error('Error parsing dates:', dateError);
        console.log('Raw date values:', {
          startedAt: call.startedAt,
          started_at: call.started_at,
          start_time: call.start_time,
          endedAt: call.endedAt,
          ended_at: call.ended_at,
          end_time: call.end_time
        });
      }

      // Process duration
      let duration = null;
      try {
        if (call.duration) {
          duration = typeof call.duration === 'string' ? 
            parseInt(call.duration, 10) : 
            call.duration;
          
          // Convert to seconds if in milliseconds
          if (duration > 100000) {
            duration = Math.round(duration / 1000);
          }
          console.log('Processed duration:', duration);
        }
      } catch (durationError) {
        console.error('Error processing duration:', durationError);
      }

      // Common data with explicit logging
      const commonData = {
        call_id: callId,
        assistant_id: assistantId,
        assistant_name: assistantName,
        type: call.type || 'webCall', // Default to webCall if not specified
        duration: duration,
        duration_seconds: duration,
        start_time: startTime,
        end_time: endTime,
        ended_reason: call.endedReason || call.ended_reason || null,
        created_at: createdAt,
        cost: call.cost || null,
        phone_number: call.phone_number || call.phoneNumber || call.from || null,
      };

      console.log('Prepared common data for insertion:', commonData);

      // Insert into call_logs
      const callLogsResult = await supabaseClient
        .from('call_logs')
        .upsert({
          ...commonData,
          conversation_summary: call.summary || null,
          transcript: call.transcript || call.transcription || null,
          sentiment_score: call.sentiment_score || null,
          intent: call.intent || null,
          metadata: call.metadata || {},
        }, {
          onConflict: 'call_id',
          ignoreDuplicates: false
        });

      if (callLogsResult.error) {
        console.error('Error upserting into call_logs:', {
          error: callLogsResult.error.message,
          details: callLogsResult.error,
          data: commonData
        });
        errors.push({ id: callId, table: 'call_logs', error: callLogsResult.error });
      } else {
        console.log('Successfully inserted into call_logs');
        processedCalls++;
      }

    } catch (error) {
      console.error(`Error processing call ${call?.id}:`, error);
      errors.push({ id: call?.id, error });
    }
  }

  return { processedCalls, errors };
};