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

export function BookDemoForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const demoRequest = {
      first_name: formData.get('name'),
      last_name: formData.get('lastname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      practice_name: formData.get('practice'),
      practice_count: parseInt(formData.get('practitioners') as string),
    };
    
    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([demoRequest]);
        
      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Demo Request Received",
        description: "We'll contact you shortly to schedule your demo.",
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
      // Reset form state when dialog is closed
      setIsSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-mint hover:bg-mint/90 text-forest font-medium">
          Book a Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white p-8">
        {!isSubmitted ? (
          <>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-semibold text-forest">
                See DoctorDial in action
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600 mt-2">
                Schedule a 30-minute live product demo with expert Q&A
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">First Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane"
                    className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-gray-700 font-medium">Last Name</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Smith"
                    className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Work Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane.smith@practice.com"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+31 6 12345678"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practice" className="text-gray-700 font-medium">Practice Name</Label>
                <Input
                  id="practice"
                  name="practice"
                  placeholder="Smith Medical Group"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practitioners" className="text-gray-700 font-medium">Number of Practices</Label>
                <Input
                  id="practitioners"
                  name="practitioners"
                  type="number"
                  min="1"
                  placeholder="1"
                  className="h-12 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-forest hover:bg-forest-light text-white h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Next"}
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