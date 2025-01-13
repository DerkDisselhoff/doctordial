import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell } from "lucide-react";

const GeneralSettings = () => {
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
    </div>
  );
};

export default GeneralSettings;