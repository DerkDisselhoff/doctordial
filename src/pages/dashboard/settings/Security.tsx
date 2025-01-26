import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key, Smartphone, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-dark">Security & Privacy</h2>
        <p className="text-gray">Manage your account security settings</p>
      </div>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Key className="w-5 h-5 text-mint" />
            Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-dark">Current Password</Label>
            <Input
              type="password"
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-dark">New Password</Label>
            <Input
              type="password"
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-dark">Confirm New Password</Label>
            <Input
              type="password"
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Confirm new password"
            />
          </div>
          <Button className="cta-button">Update Password</Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-mint" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-muted rounded-lg bg-white">
            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-mint" />
              <div>
                <p className="font-medium text-gray-dark">Two-Factor Authentication</p>
                <p className="text-sm text-gray">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" className="border-gray-muted hover:bg-gray-50 text-gray-dark">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <History className="w-5 h-5 text-mint" />
            Login History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { device: "Windows PC", location: "Amsterdam, NL", time: "2 hours ago" },
              { device: "iPhone 13", location: "Amsterdam, NL", time: "1 day ago" },
            ].map((login, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-muted rounded-lg bg-white">
                <div>
                  <p className="font-medium text-gray-dark">{login.device}</p>
                  <p className="text-sm text-gray">{login.location}</p>
                </div>
                <p className="text-sm text-gray">{login.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;