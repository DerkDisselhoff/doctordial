export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API...')
  try {
    if (!vapiKey) {
      throw new Error('VAPI API key is required')
    }

    // Fetch calls with complete data including workflow and assistant info
    const response = await fetch('https://api.vapi.ai/call?include=assistant,workflow,messages,variables', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
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

    // Fetch additional data for each call
    const enrichedCalls = await Promise.all(data.map(async (call) => {
      try {
        // Fetch detailed call data including output schema
        const detailResponse = await fetch(`https://api.vapi.ai/call/${call.id}?include=workflow,messages,variables`, {
          headers: {
            'Authorization': `Bearer ${vapiKey}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (!detailResponse.ok) {
          console.warn(`Could not fetch details for call ${call.id}`);
          return call;
        }
        
        const detailData = await detailResponse.json();
        return { ...call, ...detailData };
      } catch (error) {
        console.warn(`Error fetching details for call ${call.id}:`, error);
        return call;
      }
    }));

    console.log(`Received ${enrichedCalls.length} enriched calls from VAPI`);
    console.log('Sample enriched call data:', JSON.stringify(enrichedCalls[0], null, 2));
    return enrichedCalls;
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    })
    throw error;
  }
}