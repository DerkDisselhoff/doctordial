const VAPI_API_URL = 'https://api.vapi.ai/v1';  // Base URL without the /calls endpoint

export const fetchVapiCalls = async (apiKey: string) => {
  console.log('Fetching VAPI calls...');
  
  try {
    const url = `${VAPI_API_URL}/calls?limit=200`;
    console.log('Request URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('VAPI API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: url,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`VAPI API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('VAPI API Response Data Structure:', JSON.stringify(data, null, 2));

    if (!Array.isArray(data)) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from VAPI API - expected array');
    }

    return data;
  } catch (error) {
    console.error('Error fetching VAPI calls:', error);
    throw error;
  }
}