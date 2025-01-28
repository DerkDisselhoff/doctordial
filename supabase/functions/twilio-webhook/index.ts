import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Received webhook request:', req.method)
    
    // Parse the request body
    const body = await req.formData()
    const to = body.get('To')
    const from = Deno.env.get('TWILIO_PHONE_NUMBER')
    
    console.log('Processing call request:')
    console.log('To:', to)
    console.log('From:', from)

    if (!to) {
      console.error('Missing required "To" parameter')
      throw new Error('Missing required "To" parameter')
    }

    // Generate TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>Connecting your call</Say>
      <Dial callerId="${from || ''}">
        ${to}
      </Dial>
    </Response>`

    console.log('Generated TwiML response')

    return new Response(twiml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    console.error('Error in webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})