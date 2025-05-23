import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Received webhook request')
    const body = await req.formData()
    const to = body.get('To')
    
    if (!to) {
      throw new Error('Missing required "To" parameter')
    }

    console.log('Making outbound call to:', to)

    // Generate TwiML for outbound call
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Dial callerId="${Deno.env.get('TWILIO_PHONE_NUMBER')}">
        ${to}
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
      }
    )
  }
})