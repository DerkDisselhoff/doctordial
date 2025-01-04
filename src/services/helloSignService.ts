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
    const { data: { HELLOSIGN_API_KEY }, error: secretError } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'HELLOSIGN_API_KEY' }
      });

    if (secretError) throw new Error('Failed to get HelloSign API key');

    const response = await fetch('https://api.hellosign.com/v3/signature_request/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HELLOSIGN_API_KEY}`,
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
    const { data: { HELLOSIGN_API_KEY }, error: secretError } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'HELLOSIGN_API_KEY' }
      });

    if (secretError) throw new Error('Failed to get HelloSign API key');

    const response = await fetch(`https://api.hellosign.com/v3/signature_request/${signatureId}`, {
      headers: {
        'Authorization': `Bearer ${HELLOSIGN_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get signature status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting signature status:', error);
    throw error;
  }
}