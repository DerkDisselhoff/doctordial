import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createSignatureRequest } from "@/services/helloSignService";
import { UserPlus, Send, Loader } from "lucide-react";

const packages = [
  { id: "starter", name: "Starter" },
  { id: "growth", name: "Growth" },
  { id: "scale", name: "Scale" },
  { id: "enterprise", name: "Enterprise" },
];

const contractLengths = [
  { id: "12", name: "12 months" },
  { id: "24", name: "24 months" },
  { id: "36", name: "36 months" },
];

const paymentFrequencies = [
  { id: "monthly", name: "Monthly" },
  { id: "quarterly", name: "Quarterly" },
  { id: "annually", name: "Annually" },
];

export const ClientManagementSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    packageName: "",
    contractLength: "",
    paymentFrequency: "",
  });

  const handleInviteClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Starting signature request process...");
      const request = {
        title: "DoctorDial Service Agreement",
        subject: "Welcome to DoctorDial - Your Service Agreement",
        message: `Dear ${formData.clientName},\n\nWe're excited to have you on board! Please review and sign your DoctorDial service agreement.`,
        signerEmail: formData.clientEmail,
        signerName: formData.clientName,
        packageName: formData.packageName,
        contractLength: formData.contractLength,
        paymentFrequency: formData.paymentFrequency,
      };

      const response = await createSignatureRequest(request);
      console.log("Signature request response:", response);

      toast({
        title: "Client Invited Successfully",
        description: `An invitation has been sent to ${formData.clientEmail}`,
      });

      // Reset form
      setFormData({
        clientName: "",
        clientEmail: "",
        packageName: "",
        contractLength: "",
        paymentFrequency: "",
      });
    } catch (error) {
      console.error("Error in handleInviteClient:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send client invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <UserPlus className="w-6 h-6 text-mint" />
          <h2 className="text-2xl font-semibold text-forest">Invite New Client</h2>
        </div>

        <form onSubmit={handleInviteClient} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-forest">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Dr. Jane Smith"
                className="bg-white border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail" className="text-forest">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="jane.smith@practice.com"
                className="bg-white border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-forest">Package</Label>
              <Select
                value={formData.packageName}
                onValueChange={(value) => setFormData({ ...formData, packageName: value })}
                required
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {packages.map((pkg) => (
                    <SelectItem 
                      key={pkg.id} 
                      value={pkg.id}
                      className="hover:bg-gray-100"
                    >
                      {pkg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-forest">Contract Length</Label>
              <Select
                value={formData.contractLength}
                onValueChange={(value) => setFormData({ ...formData, contractLength: value })}
                required
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select contract length" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {contractLengths.map((length) => (
                    <SelectItem 
                      key={length.id} 
                      value={length.id}
                      className="hover:bg-gray-100"
                    >
                      {length.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-forest">Payment Frequency</Label>
              <Select
                value={formData.paymentFrequency}
                onValueChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
                required
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select payment frequency" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {paymentFrequencies.map((frequency) => (
                    <SelectItem 
                      key={frequency.id} 
                      value={frequency.id}
                      className="hover:bg-gray-100"
                    >
                      {frequency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto bg-mint hover:bg-mint/90 text-forest"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Sending Invitation...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Contract & Invitation
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};