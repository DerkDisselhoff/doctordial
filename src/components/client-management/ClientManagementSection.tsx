import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { ClientInviteForm } from "./forms/ClientInviteForm";

export const ClientManagementSection = () => {
  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <UserPlus className="w-6 h-6 text-mint" />
          <h2 className="text-2xl font-semibold text-forest">Invite New Client</h2>
        </div>
        <ClientInviteForm />
      </div>
    </Card>
  );
};