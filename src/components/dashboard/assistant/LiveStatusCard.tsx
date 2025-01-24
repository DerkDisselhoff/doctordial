import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface LiveStatusCardProps {
  isLive?: boolean;
  onStatusChange?: (status: boolean) => void;
}

export const LiveStatusCard = ({ isLive = false, onStatusChange }: LiveStatusCardProps) => {
  const [status, setStatus] = useState(isLive);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('is_live')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (statusData?.is_live !== undefined) {
          setStatus(statusData.is_live);
        }
      }
    };

    fetchStatus();
  }, []);

  const handleStatusChange = async (newStatus: boolean) => {
    setStatus(newStatus);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('assistant_status')
        .update({ is_live: newStatus })
        .eq('profile_id', session.user.id);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update assistant status. Please try again.",
          variant: "destructive",
        });
        return;
      }

      onStatusChange?.(newStatus);
    }
  };

  return (
    <Card className="bg-white border-gray-muted shadow-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-dark">Daniel Status</h3>
          <p className="text-gray">{status ? 'Live - Ready to take calls' : 'Offline - Not accepting calls'}</p>
        </div>
        <Switch
          checked={status}
          onCheckedChange={handleStatusChange}
          className="bg-gray-muted data-[state=checked]:bg-blue-dark data-[state=checked]:border-blue-dark hover:bg-gray-muted/80"
        />
      </CardContent>
    </Card>
  );
};