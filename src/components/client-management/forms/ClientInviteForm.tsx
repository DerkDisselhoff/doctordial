import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createSignatureRequest } from "@/services/helloSignService";
import { Send, Loader } from "lucide-react";
import { PackageSelect } from "../selects/PackageSelect";
import { ContractLengthSelect } from "../selects/ContractLengthSelect";
import { PaymentFrequencySelect } from "../selects/PaymentFrequencySelect";

interface FormData {
  clientName: string;
  clientEmail: string;
  packageName: string;
  contractLength: string;
  paymentFrequency: string;
}

export const ClientInviteForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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

        <PackageSelect
          value={formData.packageName}
          onChange={(value) => setFormData({ ...formData, packageName: value })}
        />

        <ContractLengthSelect
          value={formData.contractLength}
          onChange={(value) => setFormData({ ...formData, contractLength: value })}
        />

        <PaymentFrequencySelect
          value={formData.paymentFrequency}
          onChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
        />
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
  );
};