
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
    // Hard-code the DoctorDial Email API key for testing
    // Note: We're only showing the beginning of the key for security, complete key will be accessed from env
    const doctordialKeyPrefix = "re_9xurg";
    
    // Get the API key from environment
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("🔑 API key from env:", apiKey ? 
      `Found (starts with ${apiKey.substring(0, 8)}...)` : 
      "NOT FOUND in environment variables!");
    
    if (!apiKey) {
      throw new Error("Resend API key not found in environment variables");
    }
    
    // Verify if it's the key we expect (the DoctorDial Email one with full access)
    const isExpectedKey = apiKey.startsWith(doctordialKeyPrefix);
    console.log("🔑 Using expected DoctorDial Email key:", isExpectedKey ? "Yes" : "No");
    
    // Initialize Resend with explicit API key (no variable substitution)
    console.log("🔌 Initializing Resend client...");
    const resend = new Resend(apiKey);
    
    // Extract recipient email
    const url = new URL(req.url);
    const recipient = url.searchParams.get('email') || "derk.disselhoff@doctordial.io";
    console.log("📧 Sending test email to:", recipient);

    console.log("📤 Sending direct test email...");
    
    // Send a test email with detailed metadata to help diagnose issues
    const emailResult = await resend.emails.send({
      from: "DoctorDial <onboarding@resend.dev>",
      to: [recipient],
      subject: "API Test - Direct Edge Function Call",
      html: `
        <h1>Resend API Test Email</h1>
        <p>This is a direct test of the Resend API.</p>
        <p><strong>Method:</strong> Direct edge function call</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>API Key Used:</strong> Starts with ${apiKey.substring(0, 8)}...</p>
        <p><strong>Is DoctorDial key:</strong> ${isExpectedKey ? "Yes" : "No"}</p>
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
            keyPrefix: apiKey.substring(0, 8),
            isExpectedKey,
            keyLength: apiKey.length
          },
          timestamp: new Date().toISOString(),
          recipient
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
