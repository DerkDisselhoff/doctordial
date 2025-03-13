
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { DemoSuccessStep } from "./DemoSuccessStep";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookDemoFormProps {
  children?: React.ReactNode;
}

export function BookDemoForm({ children }: BookDemoFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const demoRequest = {
      first_name: String(formData.get('name')),
      last_name: String(formData.get('lastname')),
      email: String(formData.get('email')),
      phone: String(formData.get('phone')),
      practice_name: String(formData.get('practice')),
      practice_count: parseInt(String(formData.get('practitioners'))),
    };
    
    try {
      console.log("Submitting demo request to Supabase:", demoRequest);
      const { data, error } = await supabase
        .from('demo_requests')
        .insert(demoRequest)
        .select();
        
      if (error) throw error;
      
      console.log("Demo request saved successfully:", data);
      
      // Mark form as submitted first to improve UX
      setIsSubmitted(true);
      
      // Send email notification with improved error handling in background
      try {
        const submissionData = data[0];
        const emailPayload = {
          id: submissionData.id,
          name: `${demoRequest.first_name} ${demoRequest.last_name}`,
          email: demoRequest.email,
          phone: demoRequest.phone || "",
          practice_count: String(demoRequest.practice_count) || "",
          company_name: demoRequest.practice_name || "",
          role: "",
          created_at: submissionData.created_at
        };
        
        console.log("Sending demo request notification:", emailPayload);
        
        // Make three attempts to send the email
        let success = false;
        let lastError = null;
        
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            console.log(`Email notification attempt ${attempt}/3...`);
            
            const functionResponse = await supabase.functions.invoke('notify-new-lead', {
              body: JSON.stringify(emailPayload),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            console.log(`Attempt ${attempt} response:`, functionResponse);
            
            if (functionResponse.error) {
              console.error(`Error from edge function (attempt ${attempt}):`, functionResponse.error);
              lastError = functionResponse.error;
              // Continue to next attempt
            } else {
              console.log(`Email notification sent successfully on attempt ${attempt}`);
              success = true;
              break; // Break out of retry loop
            }
          } catch (attemptErr) {
            console.error(`Exception during attempt ${attempt}:`, attemptErr);
            lastError = attemptErr;
            // Continue to next attempt
          }
          
          // Wait a short time before retrying
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        if (!success) {
          console.error("All email notification attempts failed:", lastError);
          // Form already submitted, so we'll just show a warning
          toast({
            title: "Note",
            description: "Your request was saved successfully, but we encountered an issue sending notification emails. Our team will still receive your request.",
            variant: "default",
          });
        }
      } catch (notifyErr) {
        console.error("Failed to send notification:", notifyErr);
        // Form already submitted, so we'll just show a warning
        toast({
          title: "Note",
          description: "Your request was saved successfully, but we encountered an issue sending notification emails. Our team will still receive your request.",
          variant: "default",
        });
      }
      
      toast({
        title: t("demo.success.title"),
        description: t("demo.success.message"),
      });
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
      // Don't set isSubmitted to true if there was an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setIsSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-blue-dark hover:bg-blue-dark/90 text-white font-medium">
            {t("nav.bookDemo")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white p-8 rounded-xl"
      >
        {!isSubmitted ? (
          <>
            <DialogHeader className="mb-6">
              <DialogTitle id="demo-form-title" className="text-3xl font-semibold text-forest">
                {t("demo.title")}
              </DialogTitle>
              <DialogDescription id="demo-form-description" className="text-lg text-gray-600 mt-2">
                {t("demo.subtitle")}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">{t("demo.firstName")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("demo.firstName")}
                    className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-gray-700 font-medium">{t("demo.lastName")}</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder={t("demo.lastName")}
                    className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">{t("demo.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane.smith@practice.com"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">{t("demo.phone")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+31 6 12345678"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practice" className="text-gray-700 font-medium">{t("demo.practice")}</Label>
                <Input
                  id="practice"
                  name="practice"
                  placeholder={t("demo.practice")}
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practitioners" className="text-gray-700 font-medium">{t("demo.practitioners")}</Label>
                <Input
                  id="practitioners"
                  name="practitioners"
                  type="number"
                  min="1"
                  placeholder="1"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                  aria-required="true"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-dark hover:bg-blue-dark/90 text-white h-12 text-lg"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? t("demo.submitting") : t("demo.submit")}
              </Button>
            </form>
          </>
        ) : (
          <DemoSuccessStep />
        )}
      </DialogContent>
    </Dialog>
  );
}
