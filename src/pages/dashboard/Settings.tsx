import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, Phone, Globe, Palette } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Settings</h2>
        <p className="text-gray-500">Manage your account and application preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <p className="text-sm text-gray-500">Manage your account information</p>
            </div>
            <SettingsIcon className="w-5 h-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest">Practice Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter practice name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <p className="text-sm text-gray-500">Configure how you receive notifications</p>
            </div>
            <Bell className="w-5 h-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Urgent call alerts",
                "Daily summary reports",
                "System updates",
                "New feature announcements",
              ].map((setting) => (
                <div key={setting} className="flex items-center justify-between">
                  <span className="text-forest">{setting}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Security</CardTitle>
                <p className="text-sm text-gray-500">Manage security settings</p>
              </div>
              <Shield className="w-5 h-5 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Login History
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Preferences</CardTitle>
                <p className="text-sm text-gray-500">Customize your experience</p>
              </div>
              <Palette className="w-5 h-5 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest">Language</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Dutch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest">Time Zone</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>UTC+01:00 Amsterdam</option>
                    <option>UTC+00:00 London</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Call Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure call handling preferences</p>
            </div>
            <Phone className="w-5 h-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Business Hours</label>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md"
                    defaultValue="09:00"
                  />
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md"
                    defaultValue="17:00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Voice Settings</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Natural voice</option>
                  <option>Professional voice</option>
                  <option>Friendly voice</option>
                </select>
              </div>
              <Button>Update Call Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
