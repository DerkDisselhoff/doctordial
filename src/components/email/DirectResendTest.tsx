
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";

export function DirectResendTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const testResendDirectly = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      toast({
        title: "Testing Resend email delivery",
        description: "Sending a test email directly to verify configuration...",
      });
      
      const response = await fetch(
        "https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/test-resend-directly", 
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
          description: "Check your inbox and the Resend dashboard for results.",
        });
      } else {
        toast({
          title: "Test failed",
          description: data.error || "Error sending test email",
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
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Direct Resend Test</CardTitle>
        <CardDescription>
          Test Resend API directly (bypasses all other systems)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          ) : "Send Test Email Directly"}
        </Button>
        
        {result && (
          <div className="mt-4 space-y-4">
            <div className="p-4 border rounded-md bg-slate-50">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <pre className="text-xs overflow-auto p-2 bg-white border rounded max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Troubleshooting Tips:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-xs text-blue-700 mt-1 space-y-1">
                    <li>Check if the result shows a valid API key was found</li>
                    <li>Verify your Resend account is active and not in trial mode</li>
                    <li>Check for any sending limits on your Resend account</li>
                    <li>Make sure the RESEND_API_KEY secret is properly set in Supabase</li>
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
