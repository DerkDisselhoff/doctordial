
import { EmailTestForm } from "@/components/email/EmailTestForm";

export default function EmailTesting() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Email Integration Testing</h1>
        <p className="text-gray-600 mb-8">
          Use this page to test the email integration with Resend.com. The tests will use the API key stored in the "Resend.com" secret.
        </p>
        
        <EmailTestForm />
      </div>
    </div>
  );
}
