import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    <Card 
      className={cn(
        "border-gray-muted shadow-sm transition-all duration-500",
        status ? "bg-gradient-to-br from-white via-mint-light to-white animate-gradient" : "bg-white"
      )}
    >
      <CardContent className="flex items-center justify-between p-6 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h3 className="text-lg font-medium text-gray-dark">Daniel Status</h3>
          <p className={cn(
            "transition-colors duration-300",
            status ? "text-mint-dark" : "text-gray"
          )}>
            {status ? 'Live - Ready to take calls' : 'Offline - Not accepting calls'}
          </p>
        </div>

        {/* Animated background elements when status is on */}
        {status && (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint-light/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-mint-light/30 rounded-full blur-2xl animate-float-slow" />
          </>
        )}

        <Switch
          checked={status}
          onCheckedChange={handleStatusChange}
          className={cn(
            "transition-all duration-300",
            status 
              ? "bg-mint data-[state=checked]:bg-mint hover:bg-mint-dark data-[state=checked]:border-mint-dark" 
              : "bg-gray-muted hover:bg-gray-muted/80"
          )}
        />
      </CardContent>
    </Card>
  );
};