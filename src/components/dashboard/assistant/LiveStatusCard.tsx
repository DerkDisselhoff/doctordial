import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CirclePlay, CirclePause } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LiveStatusCardProps {
  isLive: boolean;
  onStatusChange: (status: boolean) => void;
}

interface AssistantStatus {
  is_live: boolean;
  assistant_name: string;
}

export const LiveStatusCard = ({ isLive, onStatusChange }: LiveStatusCardProps) => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingLiveState, setPendingLiveState] = useState(false);
  const [assistantName, setAssistantName] = useState('Assistant');

  useEffect(() => {
    const fetchInitialStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('is_live, assistant_name')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (statusData) {
          onStatusChange(statusData.is_live);
          setAssistantName(statusData.assistant_name || 'Assistant');
        } else {
          // Create initial status record if it doesn't exist
          const { error } = await supabase
            .from('assistant_status')
            .insert([{ 
              profile_id: session.user.id, 
              is_live: false,
              assistant_name: 'Assistant'
            }]);
            
          if (error) {
            console.error('Error creating initial assistant status:', error);
            return;
          }
          onStatusChange(false);
          setAssistantName('Assistant');
        }
      }
    };

    fetchInitialStatus();

    // Subscribe to assistant status changes
    const channel = supabase
      .channel('assistant_status_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assistant_status',
          filter: `profile_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        (payload) => {
          const newStatus = payload.new as AssistantStatus;
          if (newStatus) {
            setAssistantName(newStatus.assistant_name || 'Assistant');
            onStatusChange(newStatus.is_live);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onStatusChange]);

  const handleLiveToggle = (newState: boolean) => {
    setPendingLiveState(newState);
    setShowConfirmDialog(true);
  };

  const confirmLiveToggle = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('assistant_status')
        .update({ is_live: pendingLiveState })
        .eq('profile_id', session.user.id);

      if (error) {
        console.error('Error updating assistant status:', error);
        toast({
          title: "Error",
          description: "Failed to update assistant status. Please try again.",
          variant: "destructive",
        });
        return;
      }

      onStatusChange(pendingLiveState);
      setShowConfirmDialog(false);
      toast({
        title: pendingLiveState ? "Assistant is now live" : "Assistant is now offline",
        description: pendingLiveState 
          ? "Your AI assistant is now actively handling calls" 
          : "Your AI assistant has been deactivated",
      });
    }
  };

  return (
    <>
      <Card className="bg-forest-light/50 border-mint/10 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-mint/5 to-transparent transition-opacity duration-500 ${isLive ? 'opacity-100' : 'opacity-0'}`} />
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLive ? (
                <CirclePlay className="w-6 h-6 text-mint animate-pulse" />
              ) : (
                <CirclePause className="w-6 h-6 text-white/50" />
              )}
              {assistantName} Status
            </div>
            <Switch
              checked={isLive}
              onCheckedChange={handleLiveToggle}
              className="bg-mint/20 data-[state=checked]:bg-mint data-[state=checked]:border-mint hover:bg-mint/30 scale-125"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`h-3 w-3 rounded-full transition-colors duration-500 ${
              isLive ? 'bg-mint animate-pulse' : 'bg-white/30'
            }`} />
            <span className="text-white/70">
              {isLive ? `${assistantName} is actively handling calls` : `${assistantName} is currently offline`}
            </span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-forest border-mint/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {pendingLiveState ? `Activate ${assistantName}?` : `Deactivate ${assistantName}?`}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {pendingLiveState
                ? `${assistantName} will begin handling incoming calls. Make sure all settings are configured correctly.`
                : `${assistantName} will stop handling calls. All incoming calls will need to be handled manually.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowConfirmDialog(false)}
              className="bg-forest text-white hover:bg-forest-light"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmLiveToggle}
              className={pendingLiveState 
                ? "bg-mint text-forest hover:bg-mint-light" 
                : "bg-red-500 text-white hover:bg-red-600"
              }
            >
              {pendingLiveState ? 'Activate' : 'Deactivate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};