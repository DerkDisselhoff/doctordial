
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
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
        title: "Testing Resend API",
        description: `Sending a test email to ${email} using the new API key...`,
      });
      
      // Get the Supabase anon key from environment variables
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!anonKey) {
        throw new Error("Missing VITE_SUPABASE_ANON_KEY environment variable");
      }
      
      console.log("Using anon key:", anonKey ? `${anonKey.substring(0, 8)}...` : 'undefined');
      
      const url = `https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/test-resend-directly?email=${encodeURIComponent(email)}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`
        }
      });
      
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
        <CardTitle>Resend API Test</CardTitle>
        <CardDescription>
          Test the new Resend API key from the 'Resend.com' secret
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
          className="w-full mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing with New API Key...
            </>
          ) : "Send Test Email"}
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
            
            <div className="p-4 border rounded-md bg-slate-50">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <pre className="text-xs overflow-auto p-2 bg-white border rounded max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
