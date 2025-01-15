import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface IdentitySettingsCardProps {
  onSettingChange: () => void;
}

export const IdentitySettingsCard = ({ onSettingChange }: IdentitySettingsCardProps) => {
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
          <Bot className="w-5 h-5 text-mint" />
          Identity Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">Assistant Name</Label>
            <Input 
              placeholder="Sarah" 
              className="bg-forest border-mint/20"
              value={assistantName}
              onChange={handleNameChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white font-medium">Practice Phone Number</Label>
            <Select onValueChange={onSettingChange}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Select from active integrations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">+31 20 123 4567</SelectItem>
                <SelectItem value="2">+31 20 987 6543</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};