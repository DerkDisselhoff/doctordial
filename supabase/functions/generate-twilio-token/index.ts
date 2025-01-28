import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@twilio/twilio-client@1.15.0'

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
    const TWILIO_TWIML_APP_SID = Deno.env.get('TWILIO_TWIML_APP_SID')

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_TWIML_APP_SID) {
      throw new Error('Missing required Twilio configuration')
    }

    console.log('Generating Twilio token with Account SID:', TWILIO_ACCOUNT_SID)

    const capability = new createClient.Capability(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    
    // Allow outgoing calls to an application
    capability.addScope(new createClient.OutgoingClientScope(TWILIO_TWIML_APP_SID))
    
    // Allow incoming calls
    capability.addScope(new createClient.IncomingClientScope('browser-client'))

    // Generate token
    const token = capability.toJwt()

    console.log('Successfully generated Twilio token')

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