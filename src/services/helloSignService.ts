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
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'HELLOSIGN_API_KEY')
      .single();

    if (secretError) throw new Error('Failed to get HelloSign API key');
    if (!secretData?.value) throw new Error('HelloSign API key not found');

    const apiKey = secretData.value;
    const authHeader = Buffer.from(`${apiKey}:`).toString('base64');

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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HelloSign API error:', errorData);
      throw new Error('Failed to create signature request');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating signature request:', error);
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

    if (secretError) throw new Error('Failed to get HelloSign API key');
    if (!secretData?.value) throw new Error('HelloSign API key not found');

    const apiKey = secretData.value;
    const authHeader = Buffer.from(`${apiKey}:`).toString('base64');

    const response = await fetch(`https://api.hellosign.com/v3/signature_request/${signatureId}`, {
      headers: {
        'Authorization': `Basic ${authHeader}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HelloSign API error:', errorData);
      throw new Error('Failed to get signature status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting signature status:', error);
    throw error;
  }
}