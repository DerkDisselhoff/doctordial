import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key, Smartphone } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Security & Privacy</h2>
        <p className="text-white/60">Manage your account security settings</p>
      </div>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Current Password</label>
            <input
              type="password"
              className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">New Password</label>
            <input
              type="password"
              className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
              placeholder="Confirm new password"
            />
          </div>
          <Button className="bg-mint hover:bg-mint/90 text-forest">Update Password</Button>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-mint/10 rounded-lg bg-forest">
            <div className="flex items-center space-x-4">
              <Smartphone className="h-6 w-6 text-mint" />
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="text-sm text-white/60">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" className="border-mint text-white hover:bg-mint/10">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { device: "Windows PC", location: "Amsterdam, NL", time: "2 hours ago" },
              { device: "iPhone 13", location: "Amsterdam, NL", time: "1 day ago" },
            ].map((login, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-mint/10 rounded-lg bg-forest">
                <div>
                  <p className="font-medium text-white">{login.device}</p>
                  <p className="text-sm text-white/60">{login.location}</p>
                </div>
                <p className="text-sm text-white/60">{login.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;