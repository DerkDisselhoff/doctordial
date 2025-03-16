
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DirectResendTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [email, setEmail] = useState("derk.disselhoff@doctordial.io");
  const { toast } = useToast();

  const testResendDirectly = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      toast({
        title: "Testing Resend API directly",
        description: "Sending a test email using the DoctorDial API key...",
      });
      
      const response = await fetch(
        `https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/test-resend-directly?email=${encodeURIComponent(email)}`, 
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        }
      );
      
      const data = await response.json();
      console.log("Direct Resend test result:", data);
      
      setResult(data);
      
      if (data.success) {
        toast({
          title: "Test email sent!",
          description: `Email sent to ${email}. Check your inbox and the Resend dashboard.`,
        });
      } else {
        toast({
          title: "Test failed",
          description: data.message || "Error sending test email",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error running direct Resend test:", error);
      setResult({ error: String(error) });
      
      toast({
        title: "Error during test",
        description: "Check console for details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusIcon = () => {
    if (!result) return null;
    if (result.error || !result.success) return <XCircle className="h-5 w-5 text-red-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Direct Resend API Test</CardTitle>
        <CardDescription>
          Test Resend API directly with the DoctorDial Email key that has full access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Recipient Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        
        <Button 
          onClick={testResendDirectly} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : "Send Test Email With Full Access Key"}
        </Button>
        
        {result && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md bg-slate-50">
              <h3 className="font-medium">Test Status:</h3>
              <div className="flex items-center">
                {getStatusIcon()}
                <span className={`ml-2 ${result.error || !result.success ? 'text-red-500' : 'text-green-500'}`}>
                  {result.error || !result.success ? 'Failed' : 'Success'}
                </span>
              </div>
            </div>
            
            {result.details && (
              <div className="p-4 border rounded-md bg-slate-50">
                <h3 className="font-medium mb-2">API Key Information:</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Key Prefix:</strong> {result.details.apiKeyInfo?.keyPrefix || 'N/A'}</li>
                  <li><strong>Using DoctorDial Key:</strong> {result.details.apiKeyInfo?.isExpectedKey ? 'Yes' : 'No'}</li>
                  <li><strong>Key Length:</strong> {result.details.apiKeyInfo?.keyLength || 'N/A'}</li>
                </ul>
              </div>
            )}
            
            <div className="p-4 border rounded-md bg-slate-50">
              <h3 className="font-medium mb-2">Full Test Results:</h3>
              <pre className="text-xs overflow-auto p-2 bg-white border rounded max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Troubleshooting Steps:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-xs text-blue-700 mt-1 space-y-1">
                    <li>Check if you received the test email at {email}</li>
                    <li>Look for the email in your spam folder</li>
                    <li>Check the Resend dashboard for activity at <a href="https://resend.com/emails" target="_blank" className="underline">https://resend.com/emails</a></li>
                    <li>If no activity shows in Resend, try creating a brand new API key with full access</li>
                    <li>Make sure your Resend account is fully activated and not in trial/limited mode</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
