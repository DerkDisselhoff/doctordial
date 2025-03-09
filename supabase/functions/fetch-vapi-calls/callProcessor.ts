
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

      // Determine which table to insert data into based on call type
      let targetTable = 'call_logs_triage'; // Default table
      
      // Check if the call is medication related
      if (call.type === 'medication' || 
          (call.metadata && call.metadata.type === 'medication') ||
          (call.tags && call.tags.includes('medication'))) {
        targetTable = 'call_logs_medications';
      }
      // Check if the call is research related
      else if (call.type === 'research' || 
               (call.metadata && call.metadata.type === 'research') ||
               (call.tags && call.tags.includes('research'))) {
        targetTable = 'call_logs_researchresults';
      }

      console.log(`Inserting into table: ${targetTable}`);

      // Insert data based on the determined target table
      let insertResult;

      if (targetTable === 'call_logs_triage') {
        insertResult = await supabaseClient
          .from('call_logs_triage')
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
      } 
      else if (targetTable === 'call_logs_medications') {
        insertResult = await supabaseClient
          .from('call_logs_medications')
          .upsert({
            ...commonData,
            patient_id: call.patient_id || null,
            patient_name: call.patient_name || call.caller_name || null,
            medication_name: call.medication_name || (call.metadata && call.metadata.medication_name) || null,
            dosage: call.dosage || (call.metadata && call.metadata.dosage) || null,
            frequency: call.frequency || (call.metadata && call.metadata.frequency) || null,
            duration: call.medication_duration || (call.metadata && call.metadata.duration) || null,
            side_effects: call.side_effects || (call.metadata && call.metadata.side_effects) || null,
            instructions: call.instructions || (call.metadata && call.metadata.instructions) || null,
            prescription_date: call.prescription_date || (call.metadata && call.metadata.prescription_date) || null,
            renewal_date: call.renewal_date || (call.metadata && call.metadata.renewal_date) || null,
            pharmacy_details: call.pharmacy_details || (call.metadata && call.metadata.pharmacy) || null,
            doctor_notes: call.doctor_notes || call.medical_notes || null,
            conversation_summary: call.summary || null,
            transcript: call.transcript || call.transcription || null,
          }, {
            onConflict: 'call_id',
            ignoreDuplicates: false
          });
      }
      else if (targetTable === 'call_logs_researchresults') {
        insertResult = await supabaseClient
          .from('call_logs_researchresults')
          .upsert({
            ...commonData,
            patient_id: call.patient_id || null,
            patient_name: call.patient_name || call.caller_name || null,
            research_topic: call.research_topic || (call.metadata && call.metadata.research_topic) || null,
            research_question: call.research_question || (call.metadata && call.metadata.research_question) || null,
            findings: call.findings || (call.metadata && call.metadata.findings) || null,
            sources: call.sources || (call.metadata && call.metadata.sources) || null,
            relevance_score: call.relevance_score || (call.metadata && call.metadata.relevance_score) || null,
            confidence_level: call.confidence_level || (call.metadata && call.metadata.confidence_level) || null,
            recommendation: call.recommendation || (call.metadata && call.metadata.recommendation) || null,
            conversation_summary: call.summary || null,
            transcript: call.transcript || call.transcription || null,
          }, {
            onConflict: 'call_id',
            ignoreDuplicates: false
          });
      }

      if (insertResult.error) {
        console.error(`Error upserting into ${targetTable}:`, {
          error: insertResult.error.message,
          details: insertResult.error,
          data: commonData
        });
        errors.push({ id: callId, table: targetTable, error: insertResult.error });
      } else {
        console.log(`Successfully inserted into ${targetTable}`);
        processedCalls++;
      }

    } catch (error) {
      console.error(`Error processing call ${call?.id}:`, error);
      errors.push({ id: call?.id, error });
    }
  }

  return { processedCalls, errors };
};
