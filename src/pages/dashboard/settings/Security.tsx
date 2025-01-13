import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key, Smartphone } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-forest">Security & Privacy</h2>
        <p className="text-gray-500">Manage your account security settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-forest">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-forest">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-forest">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              placeholder="Confirm new password"
            />
          </div>
          <Button className="bg-mint hover:bg-mint/90 text-forest">Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <Smartphone className="h-6 w-6 text-mint" />
              <div>
                <p className="font-medium text-forest">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" className="border-mint text-forest hover:bg-mint/10">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { device: "Windows PC", location: "Amsterdam, NL", time: "2 hours ago" },
              { device: "iPhone 13", location: "Amsterdam, NL", time: "1 day ago" },
            ].map((login, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-forest">{login.device}</p>
                  <p className="text-sm text-gray-500">{login.location}</p>
                </div>
                <p className="text-sm text-gray-500">{login.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;