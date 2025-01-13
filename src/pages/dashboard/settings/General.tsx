import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GeneralSettings = () => {
  const { toast } = useToast();

  const handleInviteTeamMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would send an invitation email
    toast({
      title: "Invitation Sent",
      description: "Your team member will receive an email invitation shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">General Settings</h2>
        <p className="text-white/60">Manage your practice preferences</p>
      </div>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Practice Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Practice Name</label>
              <input
                type="text"
                className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
                placeholder="Enter practice name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Contact Email</label>
              <input
                type="email"
                className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
                placeholder="contact@practice.com"
              />
            </div>
          </div>
          <Button className="bg-mint hover:bg-mint/90 text-forest">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Email notifications", "SMS alerts", "Weekly reports"].map((setting) => (
              <div key={setting} className="flex items-center justify-between">
                <span className="text-white">{setting}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-forest peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Team Members Section */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Team Members</CardTitle>
            <p className="text-sm text-white/60 mt-1">Invite and manage your team members</p>
          </div>
          <UserPlus className="h-5 w-5 text-mint" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInviteTeamMember} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white">Name</Label>
                <Input
                  placeholder="John Doe"
                  className="bg-forest border-mint/20 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-forest border-mint/20 text-white placeholder:text-white/40"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Role</Label>
              <select className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white">
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <Button type="submit" className="bg-mint hover:bg-mint/90 text-forest">
              <UserPlus className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;