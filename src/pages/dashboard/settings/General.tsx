import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell } from "lucide-react";

const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-forest">General Settings</h2>
        <p className="text-gray-500">Manage your practice preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Practice Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
              <label className="text-sm font-medium text-forest">Contact Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="contact@practice.com"
              />
            </div>
          </div>
          <Button className="bg-mint hover:bg-mint/90 text-forest">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Email notifications", "SMS alerts", "Weekly reports"].map((setting) => (
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
    </div>
  );
};

export default GeneralSettings;