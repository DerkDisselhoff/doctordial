import { isValidUUID } from './utils.ts'

const processAssistantInfo = (call: any) => {
  let assistantName = 'Unknown Assistant';
  let assistantId = null;
  
  // First try to get assistant info from the direct fields
  if (call.assistant) {
    if (typeof call.assistant === 'string') {
      assistantId = call.assistant;
    } else if (typeof call.assistant === 'object') {
      assistantId = call.assistant.id || call.assistant.assistant_id;
      assistantName = call.assistant.name || call.assistant.model || 'Unknown Assistant';
    }
  }

  // Then check workflow data for assistant info
  if (call.workflow?.assistant) {
    assistantId = call.workflow.assistant.id || call.workflow.assistant;
    assistantName = call.workflow.assistant.name || assistantName;
  }

  // Map known assistant IDs to proper names
  const assistantMap: { [key: string]: string } = {
    'alloy': 'Medicall AI expensive version',
    'marta': 'Medicall AI cheap version NL',
    'nova': 'Hoofd model NL - rime ai',
    'MqvxHuZP0MWXPlNUh65f': 'Vapi model + openal'
  };

  if (assistantId && assistantMap[assistantId.toLowerCase()]) {
    assistantName = assistantMap[assistantId.toLowerCase()];
  }

  console.log('Processed assistant info:', { assistantId, assistantName });
  return { assistantName, assistantId };
}

const processWorkflowData = (call: any) => {
  const workflow = call.workflow || {};
  const block = call.block || {};
  
  return {
    workflow_id: workflow.id || null,
    workflow_name: workflow.name || null,
    block_id: block.id || call.block_id || null,
    block_name: block.name || call.block_name || null,
    output_schema: call.output_schema || workflow.output_schema || {},
    workflow_variables: workflow.variables || call.workflow_variables || {},
    block_outputs: call.block_outputs || {},
    call_variables: call.variables || {}
  };
}

const processSentimentAndUrgency = (call: any) => {
  let sentiment = 'neutral';
  let urgency = 'low';
  let urgencyScore = 1;

  // Check output schema for urgency information
  if (call.output_schema && typeof call.output_schema === 'object') {
    if (call.output_schema.urgency) {
      urgency = call.output_schema.urgency;
    }
    if (call.output_schema.sentiment) {
      sentiment = call.output_schema.sentiment;
    }
    if (call.output_schema.urgency_score) {
      urgencyScore = parseInt(call.output_schema.urgency_score);
    }
  }

  // Also check block outputs for urgency information
  if (call.block_outputs) {
    Object.values(call.block_outputs).forEach((output: any) => {
      if (output?.urgency) urgency = output.urgency;
      if (output?.sentiment) sentiment = output.sentiment;
      if (output?.urgency_score) urgencyScore = parseInt(output.urgency_score);
    });
  }

  // Map urgency levels to scores if not explicitly provided
  if (!urgencyScore) {
    const urgencyMap = { high: 3, medium: 2, low: 1 };
    urgencyScore = urgencyMap[urgency as keyof typeof urgencyMap] || 1;
  }

  console.log('Processed sentiment and urgency:', { sentiment, urgency, urgencyScore });
  return {
    sentiment_analysis: { sentiment, urgency },
    urgency_score: urgencyScore
  };
}

const processCallMetadata = (call: any) => {
  return {
    call_type: call.type || call.call_type || null,
    department: call.department || null,
    priority_level: call.priority_level || call.priority || null,
    resolution_status: call.resolution_status || call.status || null,
    callback_number: call.callback_number || null,
    follow_up_required: call.follow_up_required || false,
    follow_up_notes: call.follow_up_notes || null,
    language: call.language || 'nl',
    recording_url: call.recording_url || null,
    tags: Array.isArray(call.tags) ? call.tags : [],
    messages: Array.isArray(call.messages) ? call.messages : []
  };
}

export const processVapiCalls = async (supabaseClient: any, calls: any[]) => {
  let processedCalls = 0;
  const errors: any[] = [];
  
  for (const call of calls) {
    try {
      if (!call || typeof call !== 'object') {
        console.error('Invalid call object:', call);
        continue;
      }

      console.log(`Processing call ${call.id}...`);
      console.log('Raw call data:', JSON.stringify(call, null, 2));
      
      const supabaseId = crypto.randomUUID();
      const { assistantName, assistantId } = processAssistantInfo(call);
      const workflowData = processWorkflowData(call);
      const { sentiment_analysis, urgency_score } = processSentimentAndUrgency(call);
      const metadata = processCallMetadata(call);
      
      const callData = {
        id: supabaseId,
        call_id: call.id,
        caller_number: call.from || call.caller_number || null,
        recipient_number: call.to || call.recipient_number || null,
        duration: call.duration ? Math.round(Number(call.duration)) : null,
        status: call.status || 'unknown',
        transcription: call.transcript || call.transcription || null,
        created_at: call.created_at ? new Date(call.created_at).toISOString() : new Date().toISOString(),
        summary: call.summary || null,
        assistant_name: assistantName,
        assistant_id: assistantId,
        caller_name: call.caller_name || null,
        sentiment_analysis,
        urgency_score,
        ...metadata,
        ...workflowData
      };

      console.log('Processed call data:', JSON.stringify(callData, null, 2));

      const { error } = await supabaseClient
        .from('vapi_calls')
        .upsert(callData);

      if (error) {
        console.error('Error inserting call:', {
          callId: call.id,
          error: error.message,
          details: error
        });
        errors.push({ id: call.id, error });
      } else {
        processedCalls++;
        console.log(`Successfully processed call ${call.id} with Supabase ID ${supabaseId}`);
      }
    } catch (error) {
      console.error(`Error processing call ${call.id}:`, error);
      errors.push({ id: call.id, error });
    }
  }

  return { processedCalls, errors };
}