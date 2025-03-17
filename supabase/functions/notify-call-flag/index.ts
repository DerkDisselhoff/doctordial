
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define the interface for the flag data
interface CallFlagData {
  id: string;
  call_id: string;
  reason: string;
  correct_urgency: string | null;
  additional_notes: string | null;
  assistant_name: string | null;
  created_by: string;
  created_at: string;
}

// Database client for fetching more data
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Get user profile info by ID
async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, company_name")
    .eq("id", userId)
    .single();
  
  if (error) {
    console.error("Error fetching user profile:", error);
    return { username: "Unknown User", company_name: "Unknown Organization" };
  }
  
  return {
    username: data.username || "Unnamed User",
    company_name: data.company_name || "Unknown Organization"
  };
}

// Get call details by ID
async function getCallDetails(callId: string) {
  // First try to get from call_logs_triage
  const { data: triageData, error: triageError } = await supabase
    .from("call_logs_triage")
    .select("Name, Urgencylevel, duration_seconds, start_time")
    .eq("call_id", callId)
    .single();
  
  if (!triageError && triageData) {
    return {
      patient_name: triageData.Name || "Unknown Patient",
      urgency_level: triageData.Urgencylevel || "Not specified",
      duration: triageData.duration_seconds || "Unknown",
      date: triageData.start_time ? new Date(triageData.start_time).toLocaleString('nl-NL') : "Unknown date"
    };
  }
  
  // If not found in triage, try medications
  const { data: medData, error: medError } = await supabase
    .from("call_logs_medications")
    .select("patient_name, duration_seconds, start_time")
    .eq("call_id", callId)
    .single();
  
  if (!medError && medData) {
    return {
      patient_name: medData.patient_name || "Unknown Patient",
      urgency_level: "N/A (Medication)",
      duration: medData.duration_seconds || "Unknown",
      date: medData.start_time ? new Date(medData.start_time).toLocaleString('nl-NL') : "Unknown date"
    };
  }
  
  // If not found in medications, try research
  const { data: researchData, error: researchError } = await supabase
    .from("call_logs_researchresults")
    .select("patient_name, duration_seconds, start_time")
    .eq("call_id", callId)
    .single();
  
  if (!researchError && researchData) {
    return {
      patient_name: researchData.patient_name || "Unknown Patient",
      urgency_level: "N/A (Research)",
      duration: researchData.duration_seconds || "Unknown",
      date: researchData.start_time ? new Date(researchData.start_time).toLocaleString('nl-NL') : "Unknown date"
    };
  }
  
  return {
    patient_name: "Unknown Patient",
    urgency_level: "Unknown",
    duration: "Unknown",
    date: "Unknown date"
  };
}

// Handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Resend API key from the environment
    const resendApiKey = Deno.env.get('Resend.com');
    
    if (!resendApiKey) {
      throw new Error("Resend API key not found in 'Resend.com' secret");
    }
    
    // Initialize Resend client with API key
    const resend = new Resend(resendApiKey);

    // Parse the request body
    let flagData: CallFlagData;
    try {
      // Check if we're getting test data or real data
      const url = new URL(req.url);
      const isTest = url.searchParams.get('test') === 'true';
      
      if (isTest) {
        // Use test data
        console.log("Using test data for call flag notification");
        flagData = {
          id: "test-id",
          call_id: "test-call-id",
          reason: "Wrong Urgency Level",
          correct_urgency: "U2",
          additional_notes: "This call should have been marked as urgent",
          assistant_name: "Sarah",
          created_by: "test-user-id",
          created_at: new Date().toISOString()
        };
      } else {
        // Parse real data from the request
        flagData = await req.json();
      }
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      throw new Error(`Failed to parse request body: ${parseError.message}`);
    }
    
    console.log("Processing call flag notification for flag ID:", flagData.id);
    
    // Get additional user info
    const userProfile = await getUserProfile(flagData.created_by);
    
    // Get additional call info
    const callDetails = await getCallDetails(flagData.call_id);
    
    // Format the date
    const formattedDate = new Date(flagData.created_at).toLocaleString('nl-NL', {
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
      white: "#FFFFFF",
      red: "#EF4444",
      yellow: "#F59E0B",
      orange: "#F97316"
    };

    // Set flag reason color based on the type
    let reasonColor = colors.blue;
    if (flagData.reason.includes("Wrong Urgency")) {
      reasonColor = colors.yellow;
    } else if (flagData.reason.includes("Messy")) {
      reasonColor = colors.orange;
    } else if (flagData.reason.includes("Wrong Questions")) {
      reasonColor = colors.red;
    }

    // Create the HTML email template with DoctorDial styling
    const emailHtml = `
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
          .reason-tag {
            display: inline-block;
            background-color: ${reasonColor}20;
            color: ${reasonColor};
            border-radius: 16px;
            padding: 4px 12px;
            font-size: 14px;
            font-weight: 500;
          }
          .notes {
            background-color: ${colors.mintLight};
            border-left: 4px solid ${colors.mint};
            padding: 12px;
            margin-top: 8px;
            border-radius: 0 8px 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://doctordial.io/assets/logo.svg" alt="DoctorDial Logo" class="logo" />
            <h1>Call Flag Notification</h1>
            <div class="date">Datum: ${formattedDate}</div>
          </div>
          <div class="content">
            <div class="section">
              <h2>Flag Details</h2>
              <div class="field"><strong>Flag Reason:</strong> <span class="reason-tag">${flagData.reason}</span></div>
              ${flagData.correct_urgency ? `<div class="field"><strong>Correct Urgency Level:</strong> <span class="tag">${flagData.correct_urgency}</span></div>` : ''}
              <div class="field"><strong>Reported By:</strong> ${userProfile.username} (${userProfile.company_name})</div>
              ${flagData.additional_notes ? `
                <div class="field">
                  <strong>Additional Notes:</strong>
                  <div class="notes">${flagData.additional_notes}</div>
                </div>
              ` : ''}
            </div>
            
            <div class="section">
              <h2>Call Information</h2>
              <div class="field"><strong>Call ID:</strong> ${flagData.call_id}</div>
              <div class="field"><strong>Patient Name:</strong> ${callDetails.patient_name}</div>
              <div class="field"><strong>Original Urgency Level:</strong> ${callDetails.urgency_level}</div>
              <div class="field"><strong>Call Duration:</strong> ${callDetails.duration}</div>
              <div class="field"><strong>Call Date:</strong> ${callDetails.date}</div>
              <div class="field"><strong>Assistant Name:</strong> ${flagData.assistant_name || 'Unknown Assistant'}</div>
            </div>
          </div>
          <div class="footer">
            <p>This notification was automatically sent by the DoctorDial call monitoring system</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email using Resend
    const emailResult = await resend.emails.send({
      from: "DoctorDial Team <team@doctordial.io>",
      to: ["derk.disselhoff@doctordial.io", "jelmer.botman@doctordial.io"],
      subject: `Call Flagged: ${flagData.reason} - ${callDetails.patient_name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in notify-call-flag function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
