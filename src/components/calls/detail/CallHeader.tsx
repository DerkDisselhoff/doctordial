import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

interface CallHeaderProps {
  callId: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleSave: () => void;
  isFlagged: boolean;
  refetch: () => void;
}

export function CallHeader({ 
  callId, 
  isEditing, 
  setIsEditing, 
  handleSave,
  isFlagged,
  refetch 
}: CallHeaderProps) {
  const { toast } = useToast();

  const handleFlag = async (reason: string) => {
    try {
      const flaggingData = {
        reason,
        timestamp: new Date().toISOString(),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      };

      const { error } = await supabase
        .from('call_logs')
        .update({ flagging: flaggingData })
        .eq('call_id', callId);

      if (error) throw error;

      toast({
        title: "Call flagged successfully",
        description: "The issue has been recorded.",
      });

      refetch();
    } catch (error) {
      console.error("Error flagging call:", error);
      toast({
        title: "Error flagging call",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="flex-1" />
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${isFlagged ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : ''}`}
                  >
                    <Flag className="h-4 w-4" />
                    Flag This Call
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] bg-forest-light border-mint/10">
                  <div className="px-2 py-1.5 text-sm font-medium text-white/70">
                    Reason for Flagging
                  </div>
                  <DropdownMenuItem
                    className="text-white hover:bg-mint/10"
                    onClick={() => handleFlag("The urgency level (U1–U5) was incorrect")}
                  >
                    The urgency level (U1–U5) was incorrect
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:bg-mint/10"
                    onClick={() => handleFlag("The advice given was not helpful or clear")}
                  >
                    The advice given was not helpful or clear
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:bg-mint/10"
                    onClick={() => handleFlag("The system didn't consider all information")}
                  >
                    The system didn't consider all information
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:bg-mint/10"
                    onClick={() => handleFlag("Response wasn't approriate, it missed empathy")}
                  >
                    Response wasn't approriate, it missed empathy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:bg-mint/10"
                    onClick={() => handleFlag("Wrong action or referral")}
                  >
                    Wrong action or referral
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to flag if the system's outcome was not correct or helpful</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {isEditing ? (
          <div className="space-x-2">
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="text-white hover:text-forest"
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  );
}