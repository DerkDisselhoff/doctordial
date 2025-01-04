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
    console.log("Starting createSignatureRequest...");
    
    // Fetch API key from Supabase
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
    console.log('API Key retrieved successfully');

    // Create Basic Auth header
    const authHeader = Buffer.from(`${apiKey}:`).toString('base64');
    console.log('Auth header created');

    // Prepare request body
    const requestBody = {
      test_mode: 1,
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
      }
    };

    console.log('Making request to Dropbox Sign API...', {
      url: 'https://api.hellosign.com/v3/signature_request/send',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody, null, 2)
    });

    const response = await fetch('https://api.hellosign.com/v3/signature_request/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse API response:', e);
      throw new Error('Invalid API response format');
    }

    if (!response.ok) {
      console.error('Dropbox Sign API error response:', data);
      throw new Error(data.error?.error_msg || 'Unknown error occurred');
    }

    console.log('Dropbox Sign API response:', data);
    return data;
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

    console.log('Fetching signature status from Dropbox Sign API...');
    const response = await fetch(`https://api.hellosign.com/v3/signature_request/${signatureId}`, {
      headers: {
        'Authorization': `Basic ${authHeader}`
      }
    });

    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse API response:', e);
      throw new Error('Invalid API response format');
    }

    if (!response.ok) {
      console.error('Dropbox Sign API error response:', data);
      throw new Error(data.error?.error_msg || 'Unknown error occurred');
    }

    console.log('Dropbox Sign API status response:', data);
    return data;
  } catch (error) {
    console.error('Error in getSignatureStatus:', error);
    throw error;
  }
}