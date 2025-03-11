
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.0';

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Edge function initialized with Resend API key:", resendApiKey ? "Present" : "Missing");
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase key:", supabaseKey ? "Present" : "Missing");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

interface EmailConfig {
  from_email: string;
  from_name: string;
  to_emails: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    
    console.log("Received lead data:", leadData);
    
    // Fetch email configuration from the database
    const { data: emailConfig, error: configError } = await supabase
      .from('email_config')
      .select('from_email, from_name, to_emails')
      .eq('type', 'lead_notification')
      .single();
    
    if (configError) {
      console.error("Error fetching email configuration:", configError);
      throw configError;
    }

    console.log("Using email configuration:", emailConfig);
    
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
        <li><strong>Telefoon:</strong> ${leadData.phone}</li>
        <li><strong>Rol:</strong> ${leadData.role}</li>
      </ul>
      <h2>Praktijk Informatie:</h2>
      <ul>
        <li><strong>Bedrijfsnaam:</strong> ${leadData.company_name}</li>
        <li><strong>Aantal Praktijken:</strong> ${leadData.practice_count}</li>
      </ul>
    `;

    console.log("Preparing to send email with config:", {
      from: `${emailConfig.from_name} <${emailConfig.from_email}>`,
      to: emailConfig.to_emails,
      subject: `Nieuwe Lead: ${leadData.name} - ${leadData.company_name}`
    });

    // Send email using configuration from the database
    const { data, error } = await resend.emails.send({
      from: `${emailConfig.from_name} <${emailConfig.from_email}>`,
      to: emailConfig.to_emails,
      subject: `Nieuwe Lead: ${leadData.name} - ${leadData.company_name}`,
      html: emailContent,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("Email notification sent successfully", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in notify-new-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
