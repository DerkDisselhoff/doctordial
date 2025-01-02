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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Plan een Demo</DialogTitle>
          <DialogDescription>
            Vul het onderstaande formulier in en wij nemen contact met u op om uw persoonlijke demo in te plannen.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Volledige Naam</Label>
            <Input
              id="name"
              name="name"
              placeholder="Dr. Jane Smith"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane.smith@practice.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefoonnummer</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+31 6 12345678"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="practice">Bedrijfsnaam</Label>
            <Input
              id="practice"
              name="practice"
              placeholder="Smith Medical Group"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="practitioners">Aantal Praktijken</Label>
            <Input
              id="practitioners"
              name="practitioners"
              type="number"
              min="1"
              placeholder="1"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-mint hover:bg-mint/90 text-forest font-medium">
            Verstuur Aanvraag
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}