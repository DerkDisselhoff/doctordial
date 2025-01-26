import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell, Shield, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [practiceName, setPracticeName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name, username')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setPracticeName(profile.company_name || '');
          setUsername(profile.username || '');
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
          username: username,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Changes saved",
        description: "Your information has been updated successfully.",
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
        <h2 className="text-2xl font-bold text-gray-dark">General Settings</h2>
        <p className="text-gray">Manage your account and application preferences</p>
      </div>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-mint" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-dark">Your Name</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-dark">Practice Name</Label>
            <Input
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Enter practice name"
            />
          </div>
          <Button 
            onClick={handleSaveChanges} 
            className="cta-button"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Bell className="w-5 h-5 text-mint" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Email notifications", "SMS alerts", "Weekly reports"].map((setting) => (
              <div key={setting} className="flex items-center justify-between">
                <span className="text-gray-dark">{setting}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Globe className="w-5 h-5 text-mint" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-dark">Language</Label>
              <select className="w-full p-2 bg-white border border-gray-muted rounded-md text-gray-dark focus:border-mint focus:ring-mint/20">
                <option>English</option>
                <option>Dutch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-dark">Time Zone</Label>
              <select className="w-full p-2 bg-white border border-gray-muted rounded-md text-gray-dark focus:border-mint focus:ring-mint/20">
                <option>UTC+01:00 Amsterdam</option>
                <option>UTC+00:00 London</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Shield className="w-5 h-5 text-mint" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Login History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;