import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { ClientInviteForm } from "./forms/ClientInviteForm";

export const ClientManagementSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-forest">Client Management</h2>
          <p className="text-gray-500">Invite and manage medical practice clients</p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-mint" />
            <h3 className="text-xl font-semibold text-forest">Invite New Client</h3>
          </div>
          <ClientInviteForm />
        </div>
      </Card>
    </div>
  );
};