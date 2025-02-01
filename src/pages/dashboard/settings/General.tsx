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
        title: "Wijzigingen opgeslagen",
        description: "Je informatie is succesvol bijgewerkt.",
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: "Fout bij het opslaan van wijzigingen",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-dark">Algemene Instellingen</h2>
        <p className="text-gray">Beheer je account- en applicatievoorkeuren</p>
      </div>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-mint" />
            Account Informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-dark">Jouw Naam</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Voer je naam in"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-dark">Praktijknaam</Label>
            <Input
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              className="bg-white border-gray-muted focus:border-mint focus:ring-mint/20"
              placeholder="Voer praktijknaam in"
            />
          </div>
          <Button 
            onClick={handleSaveChanges} 
            className="cta-button"
            disabled={isLoading}
          >
            {isLoading ? "Opslaan..." : "Wijzigingen Opslaan"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Bell className="w-5 h-5 text-mint" />
            Notificaties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["E-mail notificaties", "SMS meldingen", "Wekelijkse rapporten"].map((setting) => (
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
            Taal & Regio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-dark">Taal</Label>
              <select className="w-full p-2 bg-white border border-gray-muted rounded-md text-gray-dark focus:border-mint focus:ring-mint/20">
                <option>Nederlands</option>
                <option>Engels</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-dark">Tijdzone</Label>
              <select className="w-full p-2 bg-white border border-gray-muted rounded-md text-gray-dark focus:border-mint focus:ring-mint/20">
                <option>UTC+01:00 Amsterdam</option>
                <option>UTC+00:00 Londen</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Shield className="w-5 h-5 text-mint" />
            Beveiliging
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Wachtwoord Wijzigen
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Twee-factor Authenticatie
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray hover:text-gray-dark hover:bg-gray-50">
              Inloggeschiedenis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
