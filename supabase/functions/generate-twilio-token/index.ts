import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Twilio } from "npm:twilio@4.22.0"

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
    console.log('Generating Twilio token')
    
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
    const TWILIO_TWIML_APP_SID = Deno.env.get('TWILIO_TWIML_APP_SID')

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_TWIML_APP_SID) {
      throw new Error('Missing required Twilio configuration')
    }

    // Create an AccessToken
    const capability = new Twilio.jwt.ClientCapability({
      accountSid: TWILIO_ACCOUNT_SID,
      authToken: TWILIO_AUTH_TOKEN,
      ttl: 3600,
    })

    // Add outgoing calls scope
    capability.addScope(
      new Twilio.jwt.ClientCapability.OutgoingClientScope({
        applicationSid: TWILIO_TWIML_APP_SID,
      })
    )

    const token = capability.toJwt()
    console.log('Token generated successfully')

    return new Response(
      JSON.stringify({ token }),
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