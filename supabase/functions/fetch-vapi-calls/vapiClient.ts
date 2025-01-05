export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API...')
  try {
    // Generate a UUID for the request
    const requestId = crypto.randomUUID()
    console.log('Using request ID:', requestId)

    const response = await fetch('https://api.vapi.ai/call/list', {
      method: 'POST', // Changed to POST method
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: requestId,
        page: 1,
        limit: 100 // Adjust this value based on your needs
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('VAPI API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint: '/call/list'
      })
      throw new Error(`VAPI API error: ${errorText}`)
    }

    const data = await response.json()
    
    // VAPI returns data in { data: [] } format
    if (!data || !data.data) {
      console.error('Invalid response format from VAPI:', data)
      throw new Error('Invalid response format from VAPI')
    }

    console.log(`Received ${data.data.length || 0} calls from VAPI`)
    return data.data
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    })
    throw error
  }
}