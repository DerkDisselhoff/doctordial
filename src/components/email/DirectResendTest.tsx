
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DirectResendTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [email, setEmail] = useState("derk.disselhoff@doctordial.io");
  const [customApiKey, setCustomApiKey] = useState("");
  const { toast } = useToast();

  const testResendDirectly = async (useCustomKey = false) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      toast({
        title: "Testing Resend API directly",
        description: `Sending a test email to ${email}...`,
      });
      
      let url = `https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/test-resend-directly?email=${encodeURIComponent(email)}`;
      
      // If using custom API key, add it to the URL
      if (useCustomKey && customApiKey) {
        url += `&apiKey=${encodeURIComponent(customApiKey)}`;
      }
      
      const response = await fetch(url, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
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
        <CardTitle>Direct Resend API Test</CardTitle>
        <CardDescription>
          Test Resend API directly with environment or custom API key
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
        
        <Tabs defaultValue="env" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="env">Use Environment Key</TabsTrigger>
            <TabsTrigger value="custom">Use Custom Key</TabsTrigger>
          </TabsList>
          
          <TabsContent value="env">
            <Button 
              onClick={() => testResendDirectly(false)} 
              disabled={isLoading}
              className="w-full mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing with Environment Key...
                </>
              ) : "Send Test With Environment Key"}
            </Button>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="space-y-2 mb-4">
              <Label htmlFor="apiKey">Custom Resend API Key</Label>
              <Input 
                id="apiKey" 
                type="password" 
                value={customApiKey} 
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="re_..."
              />
              <p className="text-xs text-gray-500">Enter a Resend API key with full access from your Resend dashboard</p>
            </div>
            
            <Button 
              onClick={() => testResendDirectly(true)} 
              disabled={isLoading || !customApiKey}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing with Custom Key...
                </>
              ) : "Send Test With Custom Key"}
            </Button>
          </TabsContent>
        </Tabs>
        
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
                  <li><strong>Key Length:</strong> {result.details.apiKeyInfo?.keyLength || 'N/A'}</li>
                  <li><strong>Test ID:</strong> {result.details.apiKeyInfo?.testId || 'N/A'}</li>
                </ul>
              </div>
            )}
            
            {result.details?.environmentVariables && (
              <div className="p-4 border rounded-md bg-slate-50">
                <h3 className="font-medium mb-2">Available Environment Variables:</h3>
                <ul className="space-y-1 text-xs">
                  {result.details.environmentVariables.map((envVar: string) => (
                    <li key={envVar}>{envVar}</li>
                  ))}
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
                    <strong>Resend API Key Troubleshooting:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-xs text-blue-700 mt-1 space-y-1">
                    <li>Check if RESEND_API_KEY is correctly set in Supabase Function Secrets</li>
                    <li>Verify the API key starts with <code>re_</code> and has not expired</li>
                    <li>Try using a completely new API key with full access permissions</li>
                    <li>Make sure your Resend domain is verified at <a href="https://resend.com/domains" target="_blank" className="underline">https://resend.com/domains</a></li>
                    <li>Check if your Resend account has any sending limitations or is in sandbox mode</li>
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
