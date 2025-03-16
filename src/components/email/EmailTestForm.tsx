
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { DirectResendTest } from "./DirectResendTest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EmailTestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const testSMTP = async () => {
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
        title: "Starting email tests",
        description: "Testing both SMTP and API methods...",
      });
      
      // SMTP test
      let smtpResult = null;
      try {
        const smtpResponse = await fetch(
          "https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead-smtp", 
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(testPayload)
          }
        );
        
        smtpResult = await smtpResponse.json();
        console.log("SMTP test result:", smtpResult);
      } catch (smtpError) {
        console.error("SMTP test error:", smtpError);
        smtpResult = { error: String(smtpError) };
      }
      
      // API test
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
        smtp: smtpResult,
        api: apiResult,
        timestamp: new Date().toISOString()
      };
      
      setResult(finalResult);
      
      const smtpSuccess = !smtpResult?.error;
      const apiSuccess = !apiResult?.error;
      
      toast({
        title: smtpSuccess || apiSuccess ? "Tests completed" : "All tests failed",
        description: smtpSuccess || apiSuccess 
          ? `${smtpSuccess ? 'SMTP: Success' : 'SMTP: Failed'}, ${apiSuccess ? 'API: Success' : 'API: Failed'}`
          : "Both email methods failed. Check the results display for details",
        variant: smtpSuccess || apiSuccess ? "default" : "destructive"
      });
    } catch (error) {
      console.error("Test error:", error);
      setResult({ error: String(error) });
      
      toast({
        title: "Error during tests",
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
    <Tabs defaultValue="direct" className="w-full max-w-3xl mx-auto">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="standard">Standard Email Tests</TabsTrigger>
        <TabsTrigger value="direct">Direct Resend Test</TabsTrigger>
      </TabsList>
      
      <TabsContent value="standard">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Email Delivery Test</CardTitle>
            <CardDescription>
              Test the email delivery system directly without filling forms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testSMTP} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : "Run Email Tests"}
            </Button>
            
            {result && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forest">SMTP Method</h3>
                      {getStatusIcon(result.smtp)}
                    </div>
                    <div className={`text-sm ${result.smtp?.error ? 'text-red-500' : 'text-green-500'}`}>
                      {result.smtp?.error 
                        ? `Failed: ${result.smtp.error}` 
                        : "Success: Email likely sent"}
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forest">API Method</h3>
                      {getStatusIcon(result.api)}
                    </div>
                    <div className={`text-sm ${result.api?.error ? 'text-red-500' : 'text-green-500'}`}>
                      {result.api?.error 
                        ? `Failed: ${result.api.error}` 
                        : "Success: Email likely sent"}
                    </div>
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
                        <strong>Note:</strong> Even when tests show success here, emails might still not arrive due to:
                      </p>
                      <ul className="list-disc pl-5 text-xs text-blue-700 mt-1 space-y-1">
                        <li>Resend.com rate limits or account restrictions</li>
                        <li>Email delivery delays (can take up to 10 minutes)</li>
                        <li>Recipient email spam filtering</li>
                        <li>Incorrect email configuration in Resend.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500 mt-4">
              <p>Direct test URLs:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <a 
                    href="https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead-smtp?test=true" 
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Test SMTP delivery (opens in new tab)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead?test=true" 
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Test API delivery (opens in new tab)
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="direct">
        <DirectResendTest />
      </TabsContent>
    </Tabs>
  );
}
