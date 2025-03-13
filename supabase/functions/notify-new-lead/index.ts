
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.0';
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("🟢 Edge function initialized");
console.log("SUPABASE_URL present:", !!Deno.env.get("SUPABASE_URL"));
console.log("SUPABASE_SERVICE_ROLE_KEY present:", !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
console.log("RESEND_API_KEY present:", !!Deno.env.get("RESEND_API_KEY"));
console.log("RESEND_API_KEY length:", Deno.env.get("RESEND_API_KEY")?.length || 0);

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend client
const resendApiKey = Deno.env.get('RESEND_API_KEY');
if (!resendApiKey) {
  console.error("❌ ERROR: RESEND_API_KEY is missing or empty");
}
const resend = new Resend(resendApiKey);

interface LeadData {
  id: number;
  name: string;
  email: string;
  phone: string;
  practice_count: string;
  company_name: string;
  role: string;
  created_at: string;
}

// Function to manually test the email sending
export async function testEmailSending() {
  const testEmailContent = `
    <h1>Test Email from DoctorDial Notification System</h1>
    <p>This is a test email to verify that the email sending functionality is working correctly.</p>
    <p>If you're receiving this email, it means that Resend is configured properly.</p>
  `;
  
  try {
    const { data, error } = await resend.emails.send({
      from: "DoctorDial <onboarding@resend.dev>",
      to: ["jelmer@doctordial.com", "derk@doctordial.com"],
      subject: "[TEST] DoctorDial Email System Test",
      html: testEmailContent,
    });
    
    if (error) {
      console.error("❌ Test email sending failed:", error);
      return { success: false, error };
    }
    
    console.log("✅ Test email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Test email sending exception:", error);
    return { success: false, error };
  }
}

serve(async (req) => {
  console.log("🔵 Received request to notify-new-lead function");
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if we're getting a test request
    const url = new URL(req.url);
    const isTest = url.searchParams.get('test') === 'true';
    const isEmailTest = url.searchParams.get('testEmail') === 'true';
    
    // If this is a test for email sending specifically
    if (isEmailTest) {
      console.log("🧪 Running email send test");
      const testResult = await testEmailSending();
      return new Response(
        JSON.stringify(testResult),
        {
          status: testResult.success ? 200 : 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    let leadData: LeadData;
    
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
      
      // If body is empty, return error
      if (!bodyString || bodyString.trim() === '') {
        throw new Error("Request body is empty");
      }
      
      // Try to parse as JSON
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
    
    // Fetch email configuration from the database
    console.log("🔍 Fetching email configuration from database...");
    const { data: emailConfig, error: configError } = await supabase
      .from('email_config')
      .select('from_email, from_name, to_emails')
      .eq('type', 'lead_notification')
      .single();
    
    if (configError) {
      console.error("❌ Error fetching email configuration:", configError);
      throw new Error(`Database error: Failed to fetch email configuration: ${configError.message}`);
    }

    let finalConfig;
    if (!emailConfig) {
      console.warn("⚠️ No email configuration found for lead_notification type. Using defaults.");
      
      // For testing purposes, use a default config if none is found
      finalConfig = {
        from_email: "notifications@doctordial.io",
        from_name: "DoctorDial",
        to_emails: ["jelmer@doctordial.com", "derk@doctordial.com"]
      };
    } else {
      finalConfig = emailConfig;
    }

    console.log("📧 Using email configuration:", finalConfig);
    
    if (!finalConfig.from_email || !finalConfig.from_name || !finalConfig.to_emails || finalConfig.to_emails.length === 0) {
      console.error("❌ Email configuration is incomplete");
      throw new Error("Email configuration is incomplete. Missing from_email, from_name, or to_emails.");
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
    `;

    try {
      // Send email using Resend
      console.log("📤 Preparing to send email via Resend...");
      console.log("From:", `${finalConfig.from_name} <${finalConfig.from_email}>`);
      console.log("To:", finalConfig.to_emails);
      console.log("Subject:", `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`);
      
      const emailResponse = await resend.emails.send({
        from: `${finalConfig.from_name} <${finalConfig.from_email}>`,
        to: finalConfig.to_emails,
        subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        html: emailContent,
      });

      console.log("📧 Resend API response:", emailResponse);

      if (!emailResponse || emailResponse.error) {
        console.error("❌ Failed to send email:", emailResponse?.error);
        throw new Error(`Failed to send email: ${emailResponse?.error?.message || "Unknown error"}`);
      }
      
      console.log("✅ Email notification sent successfully!");

      return new Response(
        JSON.stringify({ success: true, message: "Email notification sent", data: emailResponse }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (sendError) {
      console.error("❌ Error sending email:", sendError);
      throw new Error(`Failed to send email: ${sendError.message}`);
    }
  } catch (error) {
    console.error("❌ Error in notify-new-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
