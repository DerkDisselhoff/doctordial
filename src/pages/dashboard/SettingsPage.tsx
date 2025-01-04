import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, Globe, Phone } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Settings</h1>
          <p className="text-gray-500 mt-2">Manage your account and application settings</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-forest mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Your company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" placeholder="Europe/Amsterdam" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-forest mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-forest">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates about your account</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-forest">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Get SMS alerts for urgent updates</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-forest mb-6">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-forest">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-forest mb-6">Regional Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Globe className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-forest">Language</p>
                    <p className="text-sm text-gray-500">Choose your preferred language</p>
                  </div>
                </div>
                <div className="w-40">
                  <Input defaultValue="English" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-forest hover:bg-forest-light text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}