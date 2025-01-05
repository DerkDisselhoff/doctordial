export const fetchVapiCalls = async (apiKey: string): Promise<any[]> => {
  let allCalls: any[] = [];
  let nextToken = null;
  
  do {
    try {
      // Construct URL with pagination and comprehensive parameters
      let url = 'https://api.vapi.ai/call?limit=100&include_transcription=true&include_sentiment=true';
      if (nextToken) {
        url += `&next=${nextToken}`;
      }

      console.log('Fetching VAPI calls from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
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

      const responseData = await response.json();
      console.log('VAPI API response:', {
        callsCount: responseData.data?.length || responseData.length,
        sampleCall: responseData.data?.[0] || responseData[0],
        hasMore: !!responseData.next
      });

      // Add calls to our collection
      if (Array.isArray(responseData.data)) {
        allCalls = allCalls.concat(responseData.data);
      } else if (Array.isArray(responseData)) {
        allCalls = allCalls.concat(responseData);
      }

      // Update next token for pagination
      nextToken = responseData.next || null;

    } catch (error) {
      console.error('Error fetching VAPI calls:', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  } while (nextToken);

  console.log(`Successfully fetched ${allCalls.length} total calls from VAPI`);
  return allCalls;
};