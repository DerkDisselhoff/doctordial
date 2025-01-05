export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API...')
  try {
    const response = await fetch('https://api.vapi.ai/call/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
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
    console.log(`Received ${data.data?.length || 0} calls from VAPI`)
    return data
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    })
    throw error
  }
}