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
                    className={`flex items-center gap-2 border-gray-muted hover:bg-gray-muted/10 ${
                      isFlagged ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30' : 'text-gray'
                    }`}
                  >
                    <Flag className={`h-4 w-4 ${isFlagged ? 'text-red-500' : 'text-mint'}`} />
                    Flag This Call
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] bg-white border-gray-muted shadow-lg">
                  <div className="px-2 py-1.5 text-sm font-medium text-gray-dark border-b border-gray-muted">
                    Reason for Flagging
                  </div>
                  <DropdownMenuItem
                    className="text-gray hover:bg-gray-muted/10 focus:bg-gray-muted/10"
                    onClick={() => handleFlag("The urgency level (U1–U5) was incorrect")}
                  >
                    The urgency level (U1–U5) was incorrect
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray hover:bg-gray-muted/10 focus:bg-gray-muted/10"
                    onClick={() => handleFlag("The advice given was not helpful or clear")}
                  >
                    The advice given was not helpful or clear
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray hover:bg-gray-muted/10 focus:bg-gray-muted/10"
                    onClick={() => handleFlag("The system didn't consider all information")}
                  >
                    The system didn't consider all information
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray hover:bg-gray-muted/10 focus:bg-gray-muted/10"
                    onClick={() => handleFlag("Response wasn't approriate, it missed empathy")}
                  >
                    Response wasn't approriate, it missed empathy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray hover:bg-gray-muted/10 focus:bg-gray-muted/10"
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
              className="text-gray hover:bg-gray-muted/10 border-gray-muted"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-dark hover:bg-blue-dark/90 text-white"
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-blue-dark hover:bg-blue-dark/90 text-white"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}