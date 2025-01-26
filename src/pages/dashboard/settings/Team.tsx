import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Edit2, Trash2, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Team() {
  const { toast } = useToast();

  const handleInvite = () => {
    toast({
      title: "Invitation sent",
      description: "Team member will receive an email invitation shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-dark mb-2">Team Management</h2>
        <p className="text-gray">Manage your team members and their access levels</p>
      </div>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-dark">Team Members</CardTitle>
              <CardDescription className="text-gray">
                Invite and manage team members
              </CardDescription>
            </div>
            <Button onClick={handleInvite} className="bg-blue-dark hover:bg-blue-dark/90 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current team members */}
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Johnson",
                  email: "sarah@centrum.nl",
                  role: "Admin",
                  status: "Active",
                },
                {
                  name: "Mike Peters",
                  email: "mike@centrum.nl",
                  role: "Member",
                  status: "Pending",
                },
              ].map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-muted"
                >
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-dark">{member.name}</p>
                      <p className="text-sm text-gray">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="outline"
                      className={
                        member.status === "Active"
                          ? "bg-mint-light text-mint border-mint/20"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }
                    >
                      {member.status}
                    </Badge>
                    <Badge variant="outline" className="bg-mint-light text-mint border-mint/20">
                      {member.role}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-gray hover:text-gray-dark hover:bg-gray-muted">
                      <Edit2 className="w-4 h-4 text-mint" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray hover:text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pending invitations */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-dark mb-4">Pending Invitations</h3>
              <div className="space-y-4">
                {[
                  {
                    email: "john@centrum.nl",
                    role: "Member",
                    sent: "2 days ago",
                  },
                ].map((invite) => (
                  <div
                    key={invite.email}
                    className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-muted"
                  >
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-mint" />
                      <div>
                        <p className="text-gray-dark">{invite.email}</p>
                        <p className="text-sm text-gray">Sent {invite.sent}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-mint-light text-mint border-mint/20">
                        {invite.role}
                      </Badge>
                      <Button variant="ghost" size="icon" className="text-gray hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}