
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("🟢 SMTP Edge function initialized");

// This function uses SMTP directly instead of Resend API - potentially more reliable
serve(async (req) => {
  console.log("🔵 Received request to notify-new-lead-smtp function");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const isTest = url.searchParams.get('test') === 'true';
    
    let leadData;
    
    if (isTest) {
      // Use test data if this is a test run
      console.log("🧪 Using test data for email notification");
      leadData = {
        id: 9999,
        name: "Test User",
        email: "test@example.com",
        phone: "+31612345678",
        practice_count: "2-3",
        company_name: "Test Practice",
        role: "Manager",
        created_at: new Date().toISOString()
      };
    } else {
      // Normal flow - parse the request body
      const rawBody = await req.arrayBuffer();
      const bodyString = new TextDecoder().decode(rawBody);
      console.log("📝 Raw request body:", bodyString);
      
      if (!bodyString || bodyString.trim() === '') {
        throw new Error("Request body is empty");
      }
      
      try {
        leadData = JSON.parse(bodyString);
        console.log("✅ Parsed lead data:", leadData);
      } catch (parseError) {
        console.error("❌ JSON parsing error:", parseError);
        throw new Error(`Failed to parse request body as JSON: ${parseError.message}`);
      }
    }
    
    // Validate required fields in lead data
    if (!leadData.name || !leadData.email) {
      console.error("❌ Missing required fields in lead data");
      throw new Error("Missing required fields in lead data: must include name and email");
    }
    
    // Format the date string
    const formattedDate = new Date(leadData.created_at).toLocaleString('nl-NL', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Configure the email content
    const emailContent = `
      <h1>Nieuwe Lead via DoctorDial Pricing Formulier</h1>
      <p><strong>Datum:</strong> ${formattedDate}</p>
      <h2>Contact Informatie:</h2>
      <ul>
        <li><strong>Naam:</strong> ${leadData.name}</li>
        <li><strong>Email:</strong> ${leadData.email}</li>
        <li><strong>Telefoon:</strong> ${leadData.phone || 'Niet ingevuld'}</li>
        <li><strong>Rol:</strong> ${leadData.role || 'Niet ingevuld'}</li>
      </ul>
      <h2>Praktijk Informatie:</h2>
      <ul>
        <li><strong>Bedrijfsnaam:</strong> ${leadData.company_name || 'Niet ingevuld'}</li>
        <li><strong>Aantal Praktijken:</strong> ${leadData.practice_count || 'Niet ingevuld'}</li>
      </ul>
      <p><em>Dit bericht is automatisch verzonden door het DoctorDial lead notification system op ${new Date().toISOString()}</em></p>
    `;
    
    // Get SMTP client configuration for the client
    const clientConfig = {
      host: "smtp.resend.com",
      port: 465,
      username: "resend",
      password: Deno.env.get("RESEND_API_KEY") || "",
      tls: true,
    };
    
    console.log("🔑 SMTP client config (without password):", {
      ...clientConfig,
      password: clientConfig.password ? "API KEY IS SET (length: " + clientConfig.password.length + ")" : "NO API KEY",
    });
    
    // Create the SMTP client
    const client = new SMTPClient(clientConfig);
    
    console.log("📧 Sending email with SMTP client...");
    
    const to = ["derk@doctordial.com", "jelmer@doctordial.com"];
    console.log("To emails:", to);
    
    try {
      // Try to send email with the SMTP client
      await client.send({
        from: "DoctorDial <onboarding@resend.dev>",
        to: to,
        subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        html: emailContent,
      });
      
      console.log("✅ Email sent successfully with SMTP!");
      
      await client.close();
      
      return new Response(
        JSON.stringify({ success: true, message: "Email notification sent via SMTP" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (smtpError) {
      console.error("❌ Error sending email with SMTP:", smtpError);
      
      await client.close();
      
      throw new Error(`Failed to send email via SMTP: ${smtpError.message}`);
    }
  } catch (error) {
    console.error("❌ Error in notify-new-lead-smtp function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
