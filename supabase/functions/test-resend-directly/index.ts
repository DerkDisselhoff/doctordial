
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("🚀 Direct Resend Test Function initialized");

serve(async (req) => {
  console.log("📨 Received request to test-resend-directly function");
  
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Collect all environment variables for debugging
    const allEnvVars = Object.keys(Deno.env.toObject());
    console.log("📋 Available environment variables:", allEnvVars);

    // Try multiple potential API key names
    const apiKeyOptions = [
      Deno.env.get("RESEND_API_KEY"),
      Deno.env.get("Resend Key"),
      Deno.env.get("resend_api_key"),
      Deno.env.get("RESEND_KEY")
    ];
    
    const apiKey = apiKeyOptions.find(key => key && key.length > 10);
    
    console.log("🔑 API key status:", apiKey ? 
      `Found valid API key (starting with ${apiKey.substring(0, 4)}...)` : 
      "No valid API key found");
    
    if (!apiKey) {
      throw new Error("No valid Resend API key found in environment variables");
    }

    // Initialize Resend with the API key
    console.log("🔌 Initializing Resend client...");
    const resend = new Resend(apiKey);
    
    // Extract parameters
    const url = new URL(req.url);
    const recipient = url.searchParams.get('email') || "derk.disselhoff@doctordial.io";
    console.log("📧 Recipient email:", recipient);

    // First try with default domain (most reliable)
    console.log("🧪 Testing with default Resend domain (onboarding@resend.dev)");
    try {
      const defaultDomainResult = await resend.emails.send({
        from: "DoctorDial <onboarding@resend.dev>",
        to: [recipient],
        subject: "Test Email (Default Domain)",
        html: `
          <h1>This is a test email from DoctorDial</h1>
          <p>This email was sent with the default Resend domain.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `,
      });
      
      console.log("✅ Default domain result:", defaultDomainResult);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Test email sent! Check Resend dashboard and your inbox.",
          result: defaultDomainResult 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (defaultErr) {
      console.error("❌ Error with default domain:", defaultErr);
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email", 
          details: defaultErr.message,
          recommendation: "Check your Resend API key and account status"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("❌ Critical error in test function:", error);
    return new Response(
      JSON.stringify({ 
        criticalError: error.message, 
        stack: error.stack,
        recommendation: "Check your Supabase secrets configuration"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
