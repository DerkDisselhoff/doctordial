
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.0';
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("🟢 Edge function initialized");

// Get all available environment variables for debugging
const envVars = Object.keys(Deno.env.toObject());
console.log("Available environment variables:", envVars);

// Try all possible Resend API key environment variable names
const possibleKeyNames = ['RESEND_API_KEY', 'Resend Key', 'RESEND_KEY', 'resend_api_key'];
let resendApiKey = null;

for (const keyName of possibleKeyNames) {
  const key = Deno.env.get(keyName);
  if (key) {
    console.log(`✅ Found Resend API key in '${keyName}' with length: ${key.length}`);
    console.log(`Key starts with: ${key.substring(0, 4)}...`);
    resendApiKey = key;
    break;
  } else {
    console.log(`❌ No key found in '${keyName}'`);
  }
}

if (!resendApiKey) {
  console.error("❌ CRITICAL ERROR: No Resend API key found in any environment variable!");
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend client with direct API key
const resend = resendApiKey ? new Resend(resendApiKey) : null;
console.log("Resend client initialized:", !!resend);

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

// Function to try multiple email sending configurations
async function tryMultipleEmailConfigs(toEmails, subject, htmlContent, fallbackContent) {
  const attempts = [
    // 1. Try verified domain with original API key
    {
      from: "DoctorDial <notifications@doctordial.io>",
      description: "verified domain with main API key"
    },
    // 2. Try Resend default domain with original API key
    {
      from: "DoctorDial <onboarding@resend.dev>",
      description: "Resend default domain with main API key"
    }
  ];
  
  let successResult = null;
  const errors = [];
  
  for (const attempt of attempts) {
    try {
      console.log(`📧 Attempt: Sending via ${attempt.description}`);
      
      const emailPayload = {
        from: attempt.from,
        to: toEmails,
        subject: subject,
        html: attempt.description.includes("default") 
          ? `${htmlContent}<p><em>(Sent using Resend default domain)</em></p>` 
          : htmlContent
      };
      
      console.log("Email payload:", JSON.stringify(emailPayload, null, 2));
      
      if (!resend) {
        throw new Error("Resend client not initialized - API key missing");
      }
      
      const result = await resend.emails.send(emailPayload);
      
      if (result.error) {
        console.error(`❌ Error with ${attempt.description}:`, result.error);
        errors.push({
          attempt: attempt.description,
          error: result.error
        });
      } else {
        console.log(`✅ Success with ${attempt.description}:`, result.data);
        successResult = {
          success: true,
          method: attempt.description,
          data: result.data
        };
        break; // Stop trying if successful
      }
    } catch (error) {
      console.error(`❌ Exception with ${attempt.description}:`, error);
      errors.push({
        attempt: attempt.description,
        error: error.message
      });
    }
  }
  
  if (successResult) {
    return successResult;
  } else {
    console.error("❌ All email sending attempts failed!");
    return {
      success: false,
      errors: errors
    };
  }
}

serve(async (req) => {
  console.log("🔵 Received request to notify-new-lead function");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if we're getting a test request
    const url = new URL(req.url);
    const isTest = url.searchParams.get('test') === 'true';
    const isEmailTest = url.searchParams.get('testEmail') === 'true';
    
    // Direct API key test to validate Resend connection
    if (isEmailTest) {
      console.log("🧪 Running direct API key test");
      
      const testHtml = `
        <h1>DoctorDial Email System Test</h1>
        <p>This is a direct API key test at ${new Date().toISOString()}</p>
        <p>API key status: ${resendApiKey ? "Found" : "Missing"}</p>
        <p>API key length: ${resendApiKey?.length || 0}</p>
        <p>First 4 chars: ${resendApiKey?.substring(0, 4) || "N/A"}</p>
      `;
      
      const testResult = await tryMultipleEmailConfigs(
        ["jelmer@doctordial.com", "derk@doctordial.com"],
        "[TEST] DoctorDial Direct API Test",
        testHtml,
        testHtml
      );
      
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
    
    // Hardcoded email configuration for reliability
    const finalConfig = {
      from_email: "notifications@doctordial.io",
      from_name: "DoctorDial",
      to_emails: ["jelmer@doctordial.com", "derk@doctordial.com"]
    };
    
    console.log("📧 Using email configuration:", finalConfig);
    
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

    try {
      // Send email using multiple configurations
      console.log("📩 Sending lead notification email");
      
      const emailResponse = await tryMultipleEmailConfigs(
        finalConfig.to_emails,
        `Nieuwe Lead: ${leadData.name}${leadData.company_name ? ` - ${leadData.company_name}` : ''}`,
        emailContent,
        emailContent
      );
      
      if (!emailResponse.success) {
        throw new Error(`All email sending attempts failed: ${JSON.stringify(emailResponse.errors)}`);
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
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack,
        apiKeyPresent: !!resendApiKey,
        apiKeyLength: resendApiKey?.length || 0
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
