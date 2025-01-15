import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [practiceName, setPracticeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.company_name) {
          setPracticeName(profile.company_name);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const { error } = await supabase
        .from('profiles')
        .update({ 
          company_name: practiceName,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Changes saved",
        description: "Your practice information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: "Error saving changes",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <div className="space-y-2">
            <Label className="text-white">Practice Name</Label>
            <Input
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              className="w-full p-2 bg-forest border border-mint/20 rounded-md text-white placeholder-white/40"
              placeholder="Enter practice name"
            />
          </div>
          <Button 
            onClick={handleSaveChanges} 
            className="bg-mint hover:bg-mint/90 text-forest"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Security</CardTitle>
          <p className="dashboard-card-content">Manage security settings</p>
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
        <CardHeader>
          <CardTitle className="text-white">Preferences</CardTitle>
          <p className="dashboard-card-content">Customize your experience</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Call Settings</CardTitle>
          <p className="dashboard-card-content">Configure call handling preferences</p>
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
  );
};

export default GeneralSettings;
