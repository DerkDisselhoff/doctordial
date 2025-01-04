import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Users, UserPlus, UserCheck, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientManagementSection } from "@/components/client-management/ClientManagementSection";

const Clients = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  
  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client');
      return data || [];
    },
  });

  const stats = [
    {
      title: "Total Clients",
      value: profiles?.length || 0,
      icon: Users,
      description: "Active medical practices",
    },
    {
      title: "New This Month",
      value: "3",
      icon: UserPlus,
      description: "Recently onboarded",
    },
    {
      title: "Active Users",
      value: "89%",
      icon: UserCheck,
      description: "Usage rate",
    },
    {
      title: "Churned",
      value: "2",
      icon: UserMinus,
      description: "Last 30 days",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-forest">Client Management</h2>
          <p className="text-gray-500">Monitor and manage your medical practice clients</p>
        </div>
        <Button 
          onClick={() => setShowInviteForm(true)}
          className="bg-mint hover:bg-mint/90 text-forest"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          New Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showInviteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-forest">Invite New Client</h3>
              <Button
                variant="ghost"
                onClick={() => setShowInviteForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <ClientManagementSection />
          </div>
        </div>
      )}

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-forest">Recent Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profiles?.slice(0, 5).map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-white"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">{profile.company_name || 'Unnamed Practice'}</p>
                    <p className="text-sm text-gray-500">{profile.username || 'No username set'}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-mint/10 text-mint rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;