import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, User, Globe } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Settings</h1>

        <div className="grid gap-8">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center space-x-4">
              <User className="h-6 w-6 text-mint" />
              <div>
                <CardTitle className="text-forest">Profile Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+31 6 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Amsterdam Medical Center" />
                </div>
              </div>
              <Button className="bg-mint hover:bg-mint-light text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Bell className="h-6 w-6 text-mint" />
              <div>
                <CardTitle className="text-forest">Notification Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-forest/60">Receive email updates about your account</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-forest/60">Get important updates via SMS</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Lock className="h-6 w-6 text-mint" />
              <div>
                <CardTitle className="text-forest">Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="bg-mint hover:bg-mint-light text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Globe className="h-6 w-6 text-mint" />
              <div>
                <CardTitle className="text-forest">Language & Region</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="en">English</option>
                    <option value="nl">Dutch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="europe/amsterdam">Europe/Amsterdam</option>
                    <option value="europe/london">Europe/London</option>
                  </select>
                </div>
              </div>
              <Button className="bg-mint hover:bg-mint-light text-white">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;