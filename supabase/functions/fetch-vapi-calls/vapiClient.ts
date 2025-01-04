export const fetchVapiCalls = async (vapiKey: string) => {
  console.log('Fetching calls from VAPI API...')
  try {
    const response = await fetch('https://api.vapi.ai/call/list', {
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
      
      // Instead of throwing, return empty data array
      return { data: [] }
    }

    const data = await response.json()
    console.log(`Received ${data.data?.length || 0} calls from VAPI`)
    return data
  } catch (error) {
    console.error('Error fetching VAPI calls:', {
      error: error.message,
      stack: error.stack
    })
    return { data: [] }
  }
}