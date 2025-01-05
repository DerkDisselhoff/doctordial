export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API with comprehensive parameters...')
  try {
    if (!vapiKey) {
      throw new Error('VAPI API key is required')
    }

    const url = new URL('https://api.vapi.ai/call')
    url.searchParams.append('limit', '200')
    url.searchParams.append('include_transcription', 'true')
    url.searchParams.append('include_sentiment', 'true')
    url.searchParams.append('include_messages', 'true')
    url.searchParams.append('include_workflow', 'true')
    url.searchParams.append('include_blocks', 'true')
    url.searchParams.append('include_variables', 'true')
    url.searchParams.append('include_metadata', 'true')

    console.log('Requesting VAPI data with URL:', url.toString())

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint: '/call'
      })
      throw new Error(`VAPI API error: ${errorText}`)
    }

    const data = await response.json()
    
    if (!data || !Array.isArray(data)) {
      console.error('Invalid response format from VAPI:', data)
      throw new Error('Invalid response format from VAPI')
    }

    console.log(`Received ${data.length || 0} calls from VAPI with full data`)
    console.log('Sample call data with all fields:', JSON.stringify(data[0], null, 2))
    
    // Validate that we're receiving all expected data points
    if (data.length > 0) {
      const sampleCall = data[0]
      console.log('Data completeness check:', {
        hasTranscription: !!sampleCall.transcription,
        hasSentiment: !!sampleCall.sentiment_analysis,
        hasMessages: Array.isArray(sampleCall.messages),
        hasWorkflow: !!sampleCall.workflow_id,
        hasBlocks: !!sampleCall.block_outputs,
        hasVariables: !!sampleCall.call_variables,
      })
    }

    return data
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const fetchVapiCallById = async (vapiKey: string, callId: string) => {
  console.log(`Fetching detailed call data for ID: ${callId}`)
  try {
    if (!vapiKey) {
      throw new Error('VAPI API key is required')
    }

    const url = new URL(`https://api.vapi.ai/call/${callId}`)
    url.searchParams.append('include_transcription', 'true')
    url.searchParams.append('include_sentiment', 'true')
    url.searchParams.append('include_messages', 'true')
    url.searchParams.append('include_workflow', 'true')
    url.searchParams.append('include_blocks', 'true')
    url.searchParams.append('include_variables', 'true')
    url.searchParams.append('include_metadata', 'true')

    console.log('Requesting detailed call data with URL:', url.toString())

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint: `/call/${callId}`
      })
      throw new Error(`VAPI API error: ${errorText}`)
    }

    const data = await response.json()
    console.log('Received detailed call data:', JSON.stringify(data, null, 2))
    
    return data
  } catch (error) {
    console.error('Error fetching VAPI call details:', {
      error: error.message,
      stack: error.stack,
      callId
    })
    throw error
  }
}