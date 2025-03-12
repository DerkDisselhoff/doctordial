
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
          const parsedDate = new Date(call.startedAt || call.started_at || call.start_time);
          
          // Validate the date before using it
          if (!isNaN(parsedDate.getTime()) && 
              // Reject dates from 1970 (Unix epoch)
              !(parsedDate.getFullYear() === 1970 && parsedDate.getMonth() === 0)) {
            startTime = parsedDate.toISOString();
            console.log('Parsed and validated start time:', startTime);
          } else {
            console.warn('Invalid start date detected:', parsedDate);
          }
        }
        
        if (call.endedAt || call.ended_at || call.end_time) {
          const parsedDate = new Date(call.endedAt || call.ended_at || call.end_time);
          
          // Validate the date before using it
          if (!isNaN(parsedDate.getTime()) && 
              !(parsedDate.getFullYear() === 1970 && parsedDate.getMonth() === 0)) {
            endTime = parsedDate.toISOString();
            console.log('Parsed and validated end time:', endTime);
          } else {
            console.warn('Invalid end date detected:', parsedDate);
          }
        }
        
        if (call.created_at) {
          const parsedDate = new Date(call.created_at);
          
          // Validate the date before using it
          if (!isNaN(parsedDate.getTime()) && 
              !(parsedDate.getFullYear() === 1970 && parsedDate.getMonth() === 0)) {
            createdAt = parsedDate.toISOString();
          } else {
            // Use current date as fallback if invalid
            createdAt = new Date().toISOString();
            console.warn('Invalid created_at date, using current date instead');
          }
        } else {
          // Default to current date if missing
          createdAt = new Date().toISOString();
        }
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
        
        // Skip this record if we couldn't parse dates properly
        errors.push({ id: callId, error: 'Invalid date format', details: dateError });
        continue;
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
        duration_seconds: duration,
        start_time: startTime,
        end_time: endTime,
        ended_reason: call.endedReason || call.ended_reason || null,
        created_at: createdAt,
        cost: call.cost || null,
        phone_number: call.phone_number || call.phoneNumber || call.from || null,
      };

      console.log('Prepared common data for insertion:', commonData);

      // CRITICAL: Skip this record if the key dates or necessary data are missing
      // This prevents empty records from being created
      if (!startTime || !callId || !assistantId) {
        console.warn('Skipping record due to missing essential data:', commonData);
        errors.push({ id: callId, error: 'Missing essential data', details: commonData });
        continue;
      }
      
      // CRITICAL: Skip if there's no meaningful content (would result in "Unknown" entries)
      if (!call.transcript && !call.summary && !call.Name && 
          !(call.metadata && Object.keys(call.metadata).length > 0)) {
        console.warn('Skipping record due to lack of meaningful content');
        errors.push({ id: callId, error: 'No meaningful content', details: commonData });
        continue;
      }

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
            Name: call.Name || call.caller_name || call.patient_name || null,
            Symptoms: call.Symptoms || null,
            Urgencylevel: call.Urgencylevel || call.urgency_level || null,
            Emotion: call.Emotion || call.emotion || null,
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
            patient_name: call.patient_name || call.caller_name || call.Name || null,
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
            patient_name: call.patient_name || call.caller_name || call.Name || null,
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
