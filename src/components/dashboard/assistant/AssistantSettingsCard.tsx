import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface AssistantSettingsCardProps {
  onSettingChange: () => void;
}

export const AssistantSettingsCard = ({ onSettingChange }: AssistantSettingsCardProps) => {
  const [assistantName, setAssistantName] = useState('Assistant');
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssistantName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('assistant_name')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (statusData?.assistant_name) {
          setAssistantName(statusData.assistant_name);
        }
      }
    };

    fetchAssistantName();
  }, []);

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setAssistantName(newName);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('assistant_status')
        .update({ assistant_name: newName })
        .eq('profile_id', session.user.id);

      if (error) {
        console.error('Error updating assistant name:', error);
        toast({
          title: "Error",
          description: "Failed to update assistant name. Please try again.",
          variant: "destructive",
        });
        return;
      }

      onSettingChange();
    }
  };

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-mint" />
          Assistant Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Identity Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-mint/10 pb-2">Identity Settings</h3>
          <div className="space-y-2">
            <Label className="text-white font-medium">Assistant Name</Label>
            <Input 
              placeholder="Sarah" 
              className="bg-forest border-mint/20"
              value={assistantName}
              onChange={handleNameChange}
            />
          </div>
        </section>

        {/* Availability Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-mint/10 pb-2">Availability Settings</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white font-medium">Active Outside Work Hours</Label>
              <p className="text-white/70">Enable AI assistant during non-business hours</p>
            </div>
            <Switch 
              className="bg-mint/20 data-[state=checked]:bg-mint data-[state=checked]:border-mint hover:bg-mint/30" 
              onCheckedChange={onSettingChange} 
            />
          </div>
        </section>

        {/* Greeting Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-mint/10 pb-2">Greeting Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Use Greeting Variations</Label>
              <Switch 
                className="bg-mint/20 data-[state=checked]:bg-mint data-[state=checked]:border-mint hover:bg-mint/30" 
                onCheckedChange={onSettingChange} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Default Greeting</Label>
              <Input 
                placeholder="Welcome to [Practice Name], this is Sarah, how may I help you?"
                className="bg-forest border-mint/20"
                onChange={onSettingChange}
              />
            </div>
          </div>
        </section>

        {/* Voice Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-mint/10 pb-2">Voice Settings</h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white font-medium">Speaking Speed</Label>
              <Slider 
                defaultValue={[1]} 
                max={2} 
                step={0.1}
                onValueChange={onSettingChange}
                className="w-full [&>.relative]:bg-mint/20 [&>.relative]:h-2 [&>.relative]:rounded-full 
                          [&_[role=slider]]:bg-mint [&_[role=slider]]:border-mint [&_[role=slider]]:shadow-mint/20 
                          [&_[role=slider]]:hover:bg-mint-light [&_[role=slider]]:focus:ring-mint/50 
                          [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-full
                          [&>.relative>[data-orientation=horizontal]]:bg-mint"
              />
              <div className="flex justify-between text-white/70 text-sm">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-white font-medium">Friendliness Level</Label>
              <Slider 
                defaultValue={[0.7]} 
                max={1} 
                step={0.1}
                onValueChange={onSettingChange}
                className="w-full [&>.relative]:bg-mint/20 [&>.relative]:h-2 [&>.relative]:rounded-full 
                          [&_[role=slider]]:bg-mint [&_[role=slider]]:border-mint [&_[role=slider]]:shadow-mint/20 
                          [&_[role=slider]]:hover:bg-mint-light [&_[role=slider]]:focus:ring-mint/50 
                          [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-full
                          [&>.relative>[data-orientation=horizontal]]:bg-mint"
              />
              <div className="flex justify-between text-white/70 text-sm">
                <span>Professional</span>
                <span>Very Friendly</span>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-white font-medium">Voice Model</Label>
              <Select onValueChange={onSettingChange}>
                <SelectTrigger className="dropdown-trigger">
                  <SelectValue placeholder="Select a voice model" />
                </SelectTrigger>
                <SelectContent className="dropdown-content">
                  <SelectItem value="sarah" className="dropdown-item">
                    Sarah (Professional Medical)
                  </SelectItem>
                  <SelectItem value="emma" className="dropdown-item">
                    Emma (Warm and Caring)
                  </SelectItem>
                  <SelectItem value="james" className="dropdown-item">
                    James (Calm and Clear)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};