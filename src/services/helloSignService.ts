import { supabase } from "@/integrations/supabase/client";

interface SignatureRequest {
  title: string;
  subject: string;
  message: string;
  signerEmail: string;
  signerName: string;
  packageName: string;
  contractLength: string;
  paymentFrequency: string;
}

export async function createSignatureRequest({
  title,
  subject,
  message,
  signerEmail,
  signerName,
  packageName,
  contractLength,
  paymentFrequency,
}: SignatureRequest) {
  try {
    console.log("Fetching HelloSign API key from Supabase...");
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'HELLOSIGN_API_KEY')
      .single();

    if (secretError) {
      console.error('Error fetching HelloSign API key:', secretError);
      throw new Error('Failed to get HelloSign API key');
    }
    if (!secretData?.value) {
      console.error('HelloSign API key not found in secrets');
      throw new Error('HelloSign API key not found');
    }

    const apiKey = secretData.value;
    // Add a colon after the API key for Basic Auth
    const authHeader = Buffer.from(`${apiKey}:`).toString('base64');

    console.log('Making request to HelloSign API...');
    const response = await fetch('https://api.hellosign.com/v3/signature_request/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        subject,
        message,
        signers: [
          {
            email_address: signerEmail,
            name: signerName,
            order: 0
          }
        ],
        custom_fields: {
          package_name: packageName,
          contract_length: contractLength,
          payment_frequency: paymentFrequency
        },
        test_mode: 1
      })
    });

    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse API response:', e);
      throw new Error('Invalid API response format');
    }

    if (!response.ok) {
      console.error('HelloSign API error response:', errorData);
      throw new Error(`Failed to create signature request: ${errorData.error?.error_msg || 'Unknown error'}`);
    }

    console.log('HelloSign API response:', errorData);
    return errorData;
  } catch (error) {
    console.error('Error in createSignatureRequest:', error);
    throw error;
  }
}

export async function getSignatureStatus(signatureId: string) {
  try {
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'HELLOSIGN_API_KEY')
      .single();

    if (secretError) {
      console.error('Error fetching HelloSign API key:', secretError);
      throw new Error('Failed to get HelloSign API key');
    }
    if (!secretData?.value) {
      console.error('HelloSign API key not found in secrets');
      throw new Error('HelloSign API key not found');
    }

    const apiKey = secretData.value;
    const authHeader = Buffer.from(`${apiKey}:`).toString('base64');

    console.log('Fetching signature status from HelloSign API...');
    const response = await fetch(`https://api.hellosign.com/v3/signature_request/${signatureId}`, {
      headers: {
        'Authorization': `Basic ${authHeader}`
      }
    });

    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse API response:', e);
      throw new Error('Invalid API response format');
    }

    if (!response.ok) {
      console.error('HelloSign API error response:', errorData);
      throw new Error(`Failed to get signature status: ${errorData.error?.error_msg || 'Unknown error'}`);
    }

    console.log('HelloSign API status response:', errorData);
    return errorData;
  } catch (error) {
    console.error('Error in getSignatureStatus:', error);
    throw error;
  }
}