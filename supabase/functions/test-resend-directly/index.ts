
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
    // Use the new Resend.com secret directly
    const resendApiKey = Deno.env.get("Resend.com");
    
    // Log API key info (safely)
    console.log("API key from Resend.com secret:", resendApiKey ? 
      `Found (starts with ${resendApiKey.substring(0, 4)}..., length: ${resendApiKey.length})` : 
      "NOT FOUND!");
    
    if (!resendApiKey) {
      throw new Error("No Resend API key available in the 'Resend.com' secret");
    }
    
    // Get recipient from URL parameter or use default
    const url = new URL(req.url);
    const recipient = url.searchParams.get('email') || "derk.disselhoff@doctordial.io";
    
    // Initialize Resend with the API key
    console.log("🔌 Initializing Resend client with key from 'Resend.com' secret");
    const resend = new Resend(resendApiKey);
    
    console.log("📧 Sending test email to:", recipient);
    
    // Create a timestamp to uniquely identify this email
    const timestamp = new Date().toISOString();
    const testId = Math.random().toString(36).substring(2, 10);
    
    // Send a test email
    const emailResult = await resend.emails.send({
      from: "DoctorDial <onboarding@resend.dev>",
      to: [recipient],
      subject: `Test Email - New API Key [${testId}]`,
      html: `
        <h1>Resend API Test Email</h1>
        <p>This is a test of the Resend API using the new API key.</p>
        <p><strong>Test ID:</strong> ${testId}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <hr>
        <p>If you received this email, it confirms that the Resend API is working correctly.</p>
      `,
    });
    
    console.log("✅ Email result:", JSON.stringify(emailResult));
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test email sent via Resend API!", 
        details: {
          result: emailResult,
          testId,
          recipient,
          timestamp
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error in direct test function:", error);
    
    // Return detailed error response
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
