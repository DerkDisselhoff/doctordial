
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
        if (data && data.length > 0) {
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
          
          // Try SMTP approach
          const SUPABASE_URL = "https://ngtckhrzlxgfuprgfjyp.supabase.co";
          
          // Attempt 1: Direct SMTP approach
          try {
            console.log("Email attempt 1: Using direct SMTP approach");
            const response = await fetch(`${SUPABASE_URL}/functions/v1/notify-new-lead-smtp`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify(emailPayload),
            });
            
            const result = await response.json();
            console.log("SMTP approach response:", result);
            
            if (!response.ok) {
              console.error("SMTP approach error:", result);
              // Continue to next attempt
            } else {
              console.log("Email sent successfully using SMTP approach");
            }
          } catch (err) {
            console.error("Exception during SMTP approach:", err);
          }
          
          // Attempt 2: Standard API approach
          try {
            console.log("Email attempt 2: Using standard API approach");
            const response = await fetch(`${SUPABASE_URL}/functions/v1/notify-new-lead`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify(emailPayload),
            });
            
            const result = await response.json();
            console.log("Standard API approach response:", result);
            
            if (!response.ok) {
              console.error("Standard API approach error:", result);
            } else {
              console.log("Email sent successfully using standard API approach");
            }
          } catch (err) {
            console.error("Exception during standard API approach:", err);
          }
        }
      } catch (notifyErr) {
        console.error("Failed to send notification:", notifyErr);
        // Form already submitted, so we'll just log the error
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
