import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-2">
      <Label className="text-white font-medium">Assistant Name</Label>
      <Input 
        placeholder="Sarah" 
        className="bg-forest border-mint/20"
        value={assistantName}
        onChange={handleNameChange}
      />
    </div>
  );
};