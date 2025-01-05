const VAPI_API_URL = 'https://api.vapi.ai/api/call';

export const fetchVapiCalls = async (apiKey: string) => {
  console.log('Fetching VAPI calls...');
  
  try {
    const response = await fetch(VAPI_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`VAPI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('VAPI API Response:', JSON.stringify(data, null, 2));

    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from VAPI API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching VAPI calls:', error);
    throw error;
  }
}