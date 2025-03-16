
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
    // Get the API key directly - both from environment and as a parameter for testing
    const url = new URL(req.url);
    const apiKeyParam = url.searchParams.get('apiKey');
    const apiKeyFromEnv = Deno.env.get("RESEND_API_KEY");
    
    // Recipient from parameter or default
    const recipient = url.searchParams.get('email') || "derk.disselhoff@doctordial.io";
    
    // Log all environment variables to see what's available (without values)
    const envVars = Object.keys(Deno.env.toObject());
    console.log("Available environment variables:", envVars);
    
    // Log API key details (safely)
    console.log("API key from env:", apiKeyFromEnv ? 
      `Found (starts with ${apiKeyFromEnv.substring(0, 8)}..., length: ${apiKeyFromEnv.length})` : 
      "NOT FOUND in environment variables!");
    
    console.log("API key from param:", apiKeyParam ? 
      `Found (starts with ${apiKeyParam.substring(0, 8)}..., length: ${apiKeyParam.length})` : 
      "Not provided in request parameters");
    
    // Decide which API key to use
    const finalApiKey = apiKeyParam || apiKeyFromEnv;
    
    if (!finalApiKey) {
      throw new Error("No Resend API key available - neither in environment variables nor provided as parameter");
    }
    
    // Initialize Resend with the selected API key
    console.log("🔌 Initializing Resend client with API key starting with:", finalApiKey.substring(0, 8));
    const resend = new Resend(finalApiKey);
    
    console.log("📧 Sending test email to:", recipient);
    
    // Create a timestamp to uniquely identify this email
    const timestamp = new Date().toISOString();
    const testId = Math.random().toString(36).substring(2, 10);
    
    // Send a test email with detailed metadata to help diagnose issues
    const emailResult = await resend.emails.send({
      from: "DoctorDial <onboarding@resend.dev>",
      to: [recipient],
      subject: `API Test - Direct Edge Function [${testId}]`,
      html: `
        <h1>Resend API Test Email</h1>
        <p>This is a direct test of the Resend API.</p>
        <p><strong>Test ID:</strong> ${testId}</p>
        <p><strong>Method:</strong> Direct edge function call</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>API Key Used:</strong> Starts with ${finalApiKey.substring(0, 8)}...</p>
        <hr>
        <p>If you received this email, it confirms that the Resend API is working correctly from our Supabase Edge Functions.</p>
      `,
    });
    
    console.log("✅ Email result:", JSON.stringify(emailResult));
    
    // Return detailed response for debugging
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test email sent directly via Resend API!", 
        details: {
          result: emailResult,
          apiKeyInfo: {
            keyPrefix: finalApiKey.substring(0, 8),
            keyLength: finalApiKey.length,
            timestamp,
            testId,
            recipient
          },
          environmentVariables: envVars
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error in direct test function:", error);
    
    // Return detailed error for debugging
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
