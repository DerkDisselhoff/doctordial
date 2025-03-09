
import { Button } from "@/components/ui/button";
import { Edit2, Save, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";

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
      // Determine which table to update based on the URL
      const pathname = window.location.pathname;
      let tableName = 'call_logs_triage';
      
      if (pathname.includes('/medication')) {
        tableName = 'call_logs_medications';
      } else if (pathname.includes('/research')) {
        tableName = 'call_logs_researchresults';
      }
      
      const { error } = await supabase
        .from(tableName)
        .update({ 
          flagging: {
            reason,
            timestamp: new Date().toISOString()
          }
        })
        .eq('call_id', callId);

      if (error) throw error;

      toast({
        title: "Call flagged",
        description: `The call has been flagged for ${reason}.`,
      });

      refetch();
    } catch (error) {
      console.error('Error flagging call:', error);
      toast({
        title: "Error flagging call",
        description: "There was a problem flagging the call.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-dark">Call Details</h2>
      <div className="flex gap-2">
        {!isEditing ? (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="border-mint hover:bg-mint-light/50 text-mint"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`border-mint ${isFlagged ? 'bg-mint-light/50' : ''} hover:bg-mint-light/50 text-mint`}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {isFlagged ? 'Flagged' : 'Flag This Call'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-muted">
                <DropdownMenuItem 
                  onClick={() => handleFlag('Needs Review')}
                  className="text-gray-dark hover:bg-mint-light/50 cursor-pointer"
                >
                  Needs Review
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleFlag('Follow Up Required')}
                  className="text-gray-dark hover:bg-mint-light/50 cursor-pointer"
                >
                  Follow Up Required
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleFlag('Incorrect Information')}
                  className="text-gray-dark hover:bg-mint-light/50 cursor-pointer"
                >
                  Incorrect Information
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-mint hover:bg-mint-light/50 text-mint"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-dark hover:bg-blue-dark/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
