export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Starting VAPI API call...');
  
  try {
    if (!vapiKey) {
      throw new Error('VAPI API key is required');
    }

    // Log request configuration
    const requestConfig = {
      url: 'https://api.vapi.ai/call',
      params: {
        limit: 500,
        include_transcription: true,
        include_sentiment: true
      },
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    console.log('VAPI Request Configuration:', {
      url: requestConfig.url,
      params: requestConfig.params,
      headers: {
        ...requestConfig.headers,
        'Authorization': 'Bearer [REDACTED]' // Don't log the actual key
      }
    });

    // Construct URL with query parameters
    const url = new URL(requestConfig.url);
    Object.entries(requestConfig.params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: requestConfig.headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint: '/call'
      });
      throw new Error(`VAPI API error: ${errorText}`);
    }

    const data = await response.json();
    
    // Log response metadata
    console.log('VAPI API Response:', {
      status: response.status,
      recordCount: Array.isArray(data) ? data.length : 'Not an array',
      firstRecord: data[0] ? {
        id: data[0].id,
        status: data[0].status,
        hasTranscription: !!data[0].transcription,
        hasSentiment: !!data[0].sentiment
      } : null
    });

    if (!data || !Array.isArray(data)) {
      console.error('Invalid response format from VAPI:', data);
      throw new Error('Invalid response format from VAPI');
    }

    return data;
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}