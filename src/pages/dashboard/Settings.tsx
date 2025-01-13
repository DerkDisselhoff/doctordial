import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, Phone, Globe, Palette } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="section-header">
        <h2 className="section-title">Settings</h2>
        <p className="section-description">Manage your account and application preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <p className="dashboard-card-content">Manage your account information</p>
            </div>
            <SettingsIcon className="w-5 h-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="form-label">Practice Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter practice name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <Button className="bg-mint hover:bg-mint/90 text-forest">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <p className="dashboard-card-content">Configure how you receive notifications</p>
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
                  <span className="text-white/70">{setting}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-forest-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Security</CardTitle>
                <p className="dashboard-card-content">Manage security settings</p>
              </div>
              <Shield className="w-5 h-5 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-white/70 hover:text-white hover:bg-mint/10">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-white/70 hover:text-white hover:bg-mint/10">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start text-white/70 hover:text-white hover:bg-mint/10">
                  Login History
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Preferences</CardTitle>
                <p className="dashboard-card-content">Customize your experience</p>
              </div>
              <Palette className="w-5 h-5 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="form-label">Language</label>
                  <select className="form-select">
                    <option>English</option>
                    <option>Dutch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="form-label">Time Zone</label>
                  <select className="form-select">
                    <option>UTC+01:00 Amsterdam</option>
                    <option>UTC+00:00 London</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Call Settings</CardTitle>
              <p className="dashboard-card-content">Configure call handling preferences</p>
            </div>
            <Phone className="w-5 h-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="form-label">Business Hours</label>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="time"
                    className="form-input"
                    defaultValue="09:00"
                  />
                  <input
                    type="time"
                    className="form-input"
                    defaultValue="17:00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="form-label">Voice Settings</label>
                <select className="form-select">
                  <option>Natural voice</option>
                  <option>Professional voice</option>
                  <option>Friendly voice</option>
                </select>
              </div>
              <Button className="bg-mint hover:bg-mint/90 text-forest">Update Call Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;