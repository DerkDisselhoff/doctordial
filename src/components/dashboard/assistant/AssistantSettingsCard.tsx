import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
    <Card className="bg-white border-gray-muted shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-dark flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-dark" />
          Assistant Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Identity Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-dark border-b border-gray-muted pb-2">Identity Settings</h3>
          <div className="space-y-2">
            <Label className="text-gray-dark font-medium">Assistant Name</Label>
            <Input 
              placeholder="Sarah" 
              className="bg-white border-gray-muted"
              value={assistantName}
              onChange={handleNameChange}
            />
          </div>
        </section>

        {/* Availability Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-dark border-b border-gray-muted pb-2">Availability Settings</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-dark font-medium">Active Outside Work Hours</Label>
              <p className="text-gray">Enable AI assistant during non-business hours</p>
            </div>
            <Switch 
              className="bg-gray-muted data-[state=checked]:bg-blue-dark data-[state=checked]:border-blue-dark hover:bg-gray-muted/80" 
              onCheckedChange={onSettingChange} 
            />
          </div>
        </section>

        {/* Greeting Settings Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-dark border-b border-gray-muted pb-2">Greeting Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-gray-dark font-medium">Use Greeting Variations</Label>
              <Switch 
                className="bg-gray-muted data-[state=checked]:bg-blue-dark data-[state=checked]:border-blue-dark hover:bg-gray-muted/80" 
                onCheckedChange={onSettingChange} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-dark font-medium">Default Greeting</Label>
              <Input 
                placeholder="Welcome to [Practice Name], this is Sarah, how may I help you?"
                className="bg-white border-gray-muted"
                onChange={onSettingChange}
              />
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};