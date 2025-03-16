
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
        // Handle both text and JSON content types
        const contentType = req.headers.get("content-type") || "";
        
        if (contentType.includes("application/json")) {
          leadData = await req.json();
          console.log("✅ Parsed JSON lead data:", leadData);
        } else {
          const rawBody = await req.text();
          console.log("📝 Raw request body:", rawBody);
          
          if (!rawBody || rawBody.trim() === '') {
            throw new Error("Request body is empty");
          }
          
          leadData = JSON.parse(rawBody);
          console.log("✅ Parsed lead data from text:", leadData);
        }
      } catch (parseError) {
        console.error("❌ Body parsing error:", parseError);
        throw new Error(`Failed to parse request body: ${parseError.message}`);
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

    // DoctorDial brand colors
    const colors = {
      mint: "#10B981",
      mintLight: "#D1FAE5",
      forest: "#065F46",
      forestDark: "#064E3B",
      gray: "#4B5563",
      grayLight: "#F3F4F6",
      blue: "#2563EB",
      white: "#FFFFFF"
    };

    // Configure the admin notification email with DoctorDial styling
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: ${colors.gray};
            background-color: ${colors.grayLight};
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: ${colors.white};
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid ${colors.mintLight};
          }
          .header h1 {
            color: ${colors.forest};
            margin: 0;
            padding: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 0 15px;
          }
          .section {
            background-color: ${colors.grayLight};
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
          }
          .section h2 {
            color: ${colors.forest};
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .field {
            margin-bottom: 8px;
          }
          .field strong {
            color: ${colors.gray};
            font-weight: 500;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: ${colors.gray};
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid ${colors.mintLight};
          }
          .logo {
            display: block;
            margin: 0 auto 15px auto;
            max-width: 180px;
          }
          .tag {
            display: inline-block;
            background-color: ${colors.mintLight};
            color: ${colors.forest};
            border-radius: 16px;
            padding: 4px 12px;
            font-size: 14px;
            font-weight: 500;
          }
          .date {
            font-size: 14px;
            color: ${colors.gray};
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://doctordial.io/assets/logo.svg" alt="DoctorDial Logo" class="logo" />
            <h1>Nieuwe Lead via DoctorDial Pricing Formulier</h1>
            <div class="date">Datum: ${formattedDate}</div>
          </div>
          <div class="content">
            <div class="section">
              <h2>Contact Informatie</h2>
              <div class="field"><strong>Naam:</strong> ${leadData.name}</div>
              <div class="field"><strong>Email:</strong> ${leadData.email}</div>
              <div class="field"><strong>Telefoon:</strong> ${leadData.phone || 'Niet ingevuld'}</div>
              <div class="field"><strong>Rol:</strong> ${leadData.role || 'Niet ingevuld'}</div>
            </div>
            <div class="section">
              <h2>Praktijk Informatie</h2>
              <div class="field"><strong>Bedrijfsnaam:</strong> ${leadData.company_name || 'Niet ingevuld'}</div>
              <div class="field"><strong>Aantal Praktijken:</strong> <span class="tag">${leadData.practice_count || 'Niet ingevuld'}</span></div>
            </div>
          </div>
          <div class="footer">
            <p>Dit bericht is automatisch verzonden door het DoctorDial lead notification system</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a confirmation email template for the lead with fixed button color and logo
    const leadConfirmationContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: ${colors.gray};
            background-color: ${colors.grayLight};
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: ${colors.white};
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid ${colors.mintLight};
          }
          .header h1 {
            color: ${colors.forest};
            margin: 0;
            padding: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 0 15px;
            text-align: center;
          }
          .confirmation-message {
            background-color: ${colors.mintLight};
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 20px;
            text-align: center;
          }
          .confirmation-message h2 {
            color: ${colors.forest};
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 16px;
            font-weight: 600;
          }
          .confirmation-message p {
            color: ${colors.gray};
            font-size: 16px;
            margin: 0 0 16px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: ${colors.gray};
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid ${colors.mintLight};
          }
          .logo {
            display: block;
            margin: 0 auto 15px auto;
            max-width: 180px;
            height: auto;
          }
          .button {
            display: inline-block;
            background-color: ${colors.forest};
            color: ${colors.white} !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 500;
            margin-top: 16px;
          }
          .social-links {
            margin-top: 20px;
          }
          .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: ${colors.forest};
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://doctordial.io/assets/logo.png" alt="DoctorDial Logo" class="logo" />
            <h1>Bedankt voor je aanvraag, ${leadData.name}!</h1>
          </div>
          <div class="content">
            <div class="confirmation-message">
              <h2>We hebben je aanvraag ontvangen</h2>
              <p>Bedankt voor je interesse in DoctorDial. Ons team zal binnen 24 uur contact met je opnemen om de perfecte oplossing voor jouw praktijk te bespreken.</p>
              <p>Heb je in de tussentijd vragen? Aarzel niet om ons te contacteren.</p>
              <a href="https://doctordial.io/contact" class="button" style="color: #FFFFFF !important;">Neem Contact Op</a>
            </div>
            <p>Met vriendelijke groet,<br>Het DoctorDial Team</p>
            <div class="social-links">
              <a href="https://linkedin.com/company/doctordial">LinkedIn</a> |
              <a href="https://twitter.com/doctordial">Twitter</a> |
              <a href="https://facebook.com/doctordial">Facebook</a>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DoctorDial B.V. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Recipients for admin notification - include both Derk and Jelmer
    const adminEmails = ["derk.disselhoff@doctordial.io", "jelmer.botman@doctordial.io"];
    console.log("Admin notification recipients:", adminEmails);
    
    try {
      // 1. Send admin notification email with Resend
      console.log("📩 Sending admin notification email to team");
      const adminEmailResult = await resend.emails.send({
        from: "DoctorDial Team <team@doctordial.io>",  // Using verified domain
        to: adminEmails,
        subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        html: adminEmailContent,
      });
      
      console.log("✅ Admin email result:", adminEmailResult);
      
      if (adminEmailResult.error) {
        console.error("❌ Admin email error:", adminEmailResult.error);
        throw adminEmailResult.error;
      }
      
      // 2. Send confirmation email to the lead
      console.log("📩 Sending confirmation email to lead:", leadData.email);
      const leadEmailResult = await resend.emails.send({
        from: "DoctorDial Team <team@doctordial.io>",  // Using verified domain
        to: [leadData.email],
        subject: "Bedankt voor je aanvraag bij DoctorDial",
        html: leadConfirmationContent,
      });
      
      console.log("✅ Lead confirmation email result:", leadEmailResult);
      
      if (leadEmailResult.error) {
        console.error("❌ Lead confirmation email error:", leadEmailResult.error);
        // Log but don't throw - we still want to return success for the admin email
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email notifications sent", 
          adminEmail: adminEmailResult,
          leadEmail: leadEmailResult
        }),
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
