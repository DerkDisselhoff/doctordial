
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
      const { error } = await supabase
        .from('demo_requests')
        .insert(demoRequest);
        
      if (error) throw error;
      
      setIsSubmitted(true);
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
      <DialogContent className="sm:max-w-lg">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-forest">
                {t("demo.title")}
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                {t("demo.subtitle")}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">{t("demo.firstName")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("demo.firstName")}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-gray-700">{t("demo.lastName")}</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder={t("demo.lastName")}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">{t("demo.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane.smith@practice.com"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">{t("demo.phone")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+31 6 12345678"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practice" className="text-gray-700">{t("demo.practice")}</Label>
                <Input
                  id="practice"
                  name="practice"
                  placeholder={t("demo.practice")}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practitioners" className="text-gray-700">{t("demo.practitioners")}</Label>
                <Input
                  id="practitioners"
                  name="practitioners"
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-dark hover:bg-blue-dark/90 text-white"
                disabled={isLoading}
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
