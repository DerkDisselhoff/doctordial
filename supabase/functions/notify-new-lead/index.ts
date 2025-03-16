
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This function uses the Resend.com API to send email notifications about new leads
serve(async (req) => {
  console.log("🔵 Received request to notify-new-lead function");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API key from the Resend.com secret
    const resendApiKey = Deno.env.get('Resend.com');
    console.log("Resend.com secret available:", !!resendApiKey, resendApiKey ? `(length: ${resendApiKey.length})` : "");
    
    if (!resendApiKey) {
      throw new Error("Resend API key not found in 'Resend.com' secret");
    }
    
    // Initialize Resend client with API key
    const resend = new Resend(resendApiKey);
    
    // Check if we're getting a test request
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
      try {
        const rawBody = await req.text();
        console.log("📝 Raw request body:", rawBody);
        
        if (!rawBody || rawBody.trim() === '') {
          throw new Error("Request body is empty");
        }
        
        leadData = JSON.parse(rawBody);
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

    // Recipients - include both Derk and Jelmer as recipients
    const toEmails = ["derk.disselhoff@doctordial.io", "jelmer.botman@doctordial.io"];
    console.log("To emails:", toEmails);
    
    try {
      // Send email with Resend using verified domain email address
      console.log("📩 Sending email with Resend API");
      const emailResult = await resend.emails.send({
        from: "DoctorDial Team <team@doctordial.io>",  // Using verified domain
        to: toEmails,
        subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        html: emailContent,
      });
      
      console.log("✅ Email result:", emailResult);
      
      if (emailResult.error) {
        throw emailResult.error;
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Email notification sent", data: emailResult }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (emailError) {
      console.error("❌ Error sending email:", emailError);
      throw new Error(`Failed to send email: ${JSON.stringify(emailError)}`);
    }
  } catch (error) {
    console.error("❌ Error in notify-new-lead function:", error);
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
