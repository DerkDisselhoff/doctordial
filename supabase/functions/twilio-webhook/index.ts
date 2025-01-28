import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const body = await req.formData()
    const to = body.get('To')
    
    console.log('Received Twilio webhook request for number:', to)

    // Generate TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>Connecting your call</Say>
      <Dial callerId="${Deno.env.get('TWILIO_PHONE_NUMBER')}">
        ${to || ''}
      </Dial>
    </Response>`

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
      },
    )
  }
})