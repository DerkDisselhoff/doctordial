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

export function BookDemoForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Here you would typically send this data to your backend
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      practice: formData.get('practice'),
      practitioners: formData.get('practitioners')
    });
    
    setOpen(false);
    toast({
      title: "Demo Request Received",
      description: "We'll contact you shortly to schedule your demo.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mint hover:bg-mint/90 text-forest font-medium">
          Book a Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">Book a Demo</DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill out the form below and we'll get in touch to schedule your personalized demo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Dr. Jane Smith"
              className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane.smith@practice.com"
              className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+31 6 12345678"
              className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="practice" className="text-gray-700">Company Name</Label>
            <Input
              id="practice"
              name="practice"
              placeholder="Smith Medical Group"
              className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="practitioners" className="text-gray-700">Number of Practices</Label>
            <Input
              id="practitioners"
              name="practitioners"
              type="number"
              min="1"
              placeholder="1"
              className="mt-1 text-gray-900 bg-white border-gray-300 focus:border-mint focus:ring-mint"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-forest hover:bg-forest-light text-white">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}