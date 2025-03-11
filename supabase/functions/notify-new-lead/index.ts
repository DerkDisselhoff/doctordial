
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Log environment variables (without revealing values)
console.log("Edge function initialized");
console.log("RESEND_API_KEY present:", !!Deno.env.get("RESEND_API_KEY"));
console.log("SUPABASE_URL present:", !!Deno.env.get("SUPABASE_URL"));
console.log("SUPABASE_SERVICE_ROLE_KEY present:", !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("CRITICAL ERROR: Missing RESEND_API_KEY environment variable");
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend client
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

// Function to invoke a test of the edge function
async function testNotificationFunction() {
  try {
    console.log("🧪 Running automated test of notify-new-lead function");
    
    // Test data
    const testData = {
      id: 9999,
      name: "Test User",
      email: "test@example.com",
      phone: "+31612345678",
      practice_count: "2-3",
      company_name: "Test Practice",
      role: "Manager",
      created_at: new Date().toISOString()
    };
    
    // Fetch email configuration
    const { data: emailConfig, error: configError } = await supabase
      .from('email_config')
      .select('from_email, from_name, to_emails')
      .eq('type', 'lead_notification')
      .single();
      
    if (configError) {
      console.error("❌ Test failed: Error fetching email configuration:", configError);
      return;
    }
    
    // Use default config if none found in database
    const finalConfig = emailConfig || {
      from_email: "noreply@doctordial.com",
      from_name: "DoctorDial Test",
      to_emails: ["test@doctordial.com"]
    };
    
    console.log("📧 Test using email configuration:", finalConfig);
    
    // Format date for email
    const formattedDate = new Date(testData.created_at).toLocaleString('nl-NL', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Configure email content
    const emailContent = `
      <h1>Nieuwe Lead via DoctorDial Pricing Formulier</h1>
      <p><strong>Datum:</strong> ${formattedDate}</p>
      <h2>Contact Informatie:</h2>
      <ul>
        <li><strong>Naam:</strong> ${testData.name}</li>
        <li><strong>Email:</strong> ${testData.email}</li>
        <li><strong>Telefoon:</strong> ${testData.phone || 'Niet ingevuld'}</li>
        <li><strong>Rol:</strong> ${testData.role || 'Niet ingevuld'}</li>
      </ul>
      <h2>Praktijk Informatie:</h2>
      <ul>
        <li><strong>Bedrijfsnaam:</strong> ${testData.company_name || 'Niet ingevuld'}</li>
        <li><strong>Aantal Praktijken:</strong> ${testData.practice_count || 'Niet ingevuld'}</li>
      </ul>
    `;
    
    // Send test email
    try {
      const emailResult = await resend.emails.send({
        from: `${finalConfig.from_name} <${finalConfig.from_email}>`,
        to: finalConfig.to_emails,
        subject: `[TEST] Nieuwe Lead: ${testData.name}${testData.company_name ? ` - ${testData.company_name}` : ''}`,
        html: emailContent,
      });
      
      if (emailResult.error) {
        console.error("❌ Test failed: Resend API error:", emailResult.error);
        return;
      }
      
      console.log("✅ Test successful: Email sent", emailResult.data);
    } catch (sendError) {
      console.error("❌ Test failed: Error sending email:", sendError);
    }
  } catch (error) {
    console.error("❌ Test failed with error:", error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to notify-new-lead function");
    console.log("Request method:", req.method);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Check if we're getting a test request
    const url = new URL(req.url);
    const isTest = url.searchParams.get('test') === 'true';
    const isAutoTest = url.searchParams.get('autotest') === 'true';
    
    // If this is an automated test request, run the test function
    if (isAutoTest) {
      console.log("Running automated test function");
      await testNotificationFunction();
      return new Response(
        JSON.stringify({ success: true, message: "Automated test completed, check logs for results" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    let leadData: LeadData;
    
    if (isTest) {
      // Use test data if this is a test run
      console.log("Using test data for email notification");
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
      console.log("Raw request body:", bodyString);
      
      // If body is empty, return error
      if (!bodyString || bodyString.trim() === '') {
        throw new Error("Request body is empty");
      }
      
      // Try to parse as JSON
      try {
        leadData = JSON.parse(bodyString);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        throw new Error(`Failed to parse request body as JSON: ${parseError.message}`);
      }
    }
    
    console.log("Lead data parsed successfully:", leadData);
    
    // Validate required fields in lead data
    if (!leadData.name || !leadData.email) {
      throw new Error("Missing required fields in lead data: must include name and email");
    }
    
    // Fetch email configuration from the database
    const { data: emailConfig, error: configError } = await supabase
      .from('email_config')
      .select('from_email, from_name, to_emails')
      .eq('type', 'lead_notification')
      .single();
    
    if (configError) {
      console.error("Error fetching email configuration:", configError);
      throw new Error(`Database error: Failed to fetch email configuration: ${configError.message}`);
    }

    if (!emailConfig) {
      console.error("No email configuration found for lead_notification type");
      
      // For testing purposes, use a default config if none is found
      if (isTest) {
        console.log("Using default email configuration for test");
        emailConfig = {
          from_email: "noreply@doctordial.com",
          from_name: "DoctorDial Test",
          to_emails: ["test@doctordial.com"]
        };
      } else {
        throw new Error("No email configuration found for lead_notification type");
      }
    }

    console.log("Using email configuration:", emailConfig);
    
    if (!emailConfig.from_email || !emailConfig.from_name || !emailConfig.to_emails || emailConfig.to_emails.length === 0) {
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

    console.log("Preparing to send email with config:", {
      from: `${emailConfig.from_name} <${emailConfig.from_email}>`,
      to: emailConfig.to_emails,
      subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`
    });

    try {
      // Send email using configuration from the database
      const emailResult = await resend.emails.send({
        from: `${emailConfig.from_name} <${emailConfig.from_email}>`,
        to: emailConfig.to_emails,
        subject: `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        html: emailContent,
      });

      console.log("Resend API response:", emailResult);
      
      if (emailResult.error) {
        throw new Error(`Resend API error: ${emailResult.error.message || JSON.stringify(emailResult.error)}`);
      }
      
      console.log("Email notification sent successfully", emailResult.data);

      return new Response(
        JSON.stringify({ success: true, message: "Email notification sent" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (sendError) {
      console.error("Error from Resend API:", sendError);
      throw new Error(`Failed to send email: ${sendError.message}`);
    }
  } catch (error) {
    console.error("Error in notify-new-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
