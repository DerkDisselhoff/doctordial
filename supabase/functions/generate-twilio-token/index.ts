import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Twilio } from "npm:twilio@4.22.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
    const TWILIO_TWIML_APP_SID = 'AP92ef3d41a025711810178aa9f282fd22'

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_TWIML_APP_SID) {
      throw new Error('Missing required Twilio configuration')
    }

    console.log('Generating Twilio token with Account SID:', TWILIO_ACCOUNT_SID)

    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    const token = await client.tokens.create({
      ttl: 3600,
      identity: 'browser-client'
    })

    console.log('Successfully generated Twilio token')

    return new Response(
      JSON.stringify({ token: token.token }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error generating token:', error)
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