
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
      
      // SMTP test
      const smtpResponse = await fetch(
        "https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead-smtp", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload)
        }
      );
      
      const smtpResult = await smtpResponse.json();
      console.log("SMTP test result:", smtpResult);
      
      // API test
      const apiResponse = await fetch(
        "https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-new-lead", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload)
        }
      );
      
      const apiResult = await apiResponse.json();
      console.log("API test result:", apiResult);
      
      // Set and display results
      setResult({
        smtp: smtpResult,
        api: apiResult
      });
      
      toast({
        title: "Tests completed",
        description: "Check the results display for details",
      });
    } catch (error) {
      console.error("Test error:", error);
      setResult({ error: String(error) });
      
      toast({
        title: "Error during tests",
        description: "Check console for details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
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
          {isLoading ? "Testing..." : "Run Email Tests"}
        </Button>
        
        {result && (
          <div className="mt-4 p-4 border rounded-md bg-slate-50">
            <h3 className="font-medium mb-2">Test Results:</h3>
            <pre className="text-xs overflow-auto p-2 bg-white border rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
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
  );
}
