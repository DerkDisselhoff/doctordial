
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { DirectResendTest } from "./DirectResendTest";

export function EmailTestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const testEmailDelivery = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Hardcoded test payload
      const testPayload = {
        id: 9999,
        name: "Test User",
        email: "test@example.com",
        phone: "+31612345678",
        practice_count: "2-3",
        company_name: "Test Practice",
        role: "Manager",
        created_at: new Date().toISOString()
      };
      
      // Show test start notification
      toast({
        title: "Testing email delivery",
        description: "Testing the email delivery system with the new API key...",
      });
      
      // API test with new Resend.com secret
      let apiResult = null;
      try {
        const apiResponse = await fetch(
          "https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead", 
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(testPayload)
          }
        );
        
        apiResult = await apiResponse.json();
        console.log("API test result:", apiResult);
      } catch (apiError) {
        console.error("API test error:", apiError);
        apiResult = { error: String(apiError) };
      }
      
      // Set and display results
      const finalResult = {
        api: apiResult,
        timestamp: new Date().toISOString()
      };
      
      setResult(finalResult);
      
      const apiSuccess = !apiResult?.error;
      
      toast({
        title: apiSuccess ? "Test completed" : "Test failed",
        description: apiSuccess 
          ? "Email was sent successfully. Check the recipient inbox and Resend dashboard."
          : "Email delivery failed. Check the results for details.",
        variant: apiSuccess ? "default" : "destructive"
      });
    } catch (error) {
      console.error("Test error:", error);
      setResult({ error: String(error) });
      
      toast({
        title: "Error during test",
        description: "Check console and results for details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusIcon = (result: any) => {
    if (!result) return null;
    if (result.error) return <XCircle className="h-5 w-5 text-red-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email System Test</CardTitle>
          <CardDescription>
            Test the email notification system with the new Resend API key
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testEmailDelivery} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : "Test Email System"}
          </Button>
          
          {result && (
            <div className="mt-4 space-y-4">
              <div className="border rounded-md p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">API Test Result:</h3>
                  {getStatusIcon(result.api)}
                </div>
                <div className={`text-sm ${result.api?.error ? 'text-red-500' : 'text-green-500'}`}>
                  {result.api?.error 
                    ? `Failed: ${result.api.error}` 
                    : "Success: Email likely sent"}
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50">
                <h3 className="font-medium mb-2">Detailed Results:</h3>
                <pre className="text-xs overflow-auto p-2 bg-white border rounded max-h-60">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Next Steps:</strong> Check the Resend dashboard at <a href="https://resend.com/email" target="_blank" className="underline">resend.com/email</a> to verify email delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <DirectResendTest />
    </div>
  );
}
