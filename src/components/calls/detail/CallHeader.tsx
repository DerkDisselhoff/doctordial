
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, Flag, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [flagReason, setFlagReason] = useState<string>("");
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [correctUrgency, setCorrectUrgency] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [assistantName, setAssistantName] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [callType, setCallType] = useState<'triage' | 'medication' | 'research'>('triage');
  
  useEffect(() => {
    // Determine call type based on URL
    const path = window.location.pathname;
    if (path.includes('/medication/')) {
      setCallType('medication');
    } else if (path.includes('/research/')) {
      setCallType('research');
    } else {
      setCallType('triage');
    }

    // Get the current user ID for storing in the flags
    const getUserId = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      }
    };

    // Get the assistant name from the appropriate call logs table
    const getCallData = async () => {
      const table = callType === 'medication' 
        ? 'call_logs_medications' 
        : callType === 'research' 
          ? 'call_logs_researchresults' 
          : 'call_logs_triage';

      const { data, error } = await supabase
        .from(table)
        .select('assistant_id')
        .eq('call_id', callId)
        .single();
      
      if (data && !error) {
        setAssistantName(data.assistant_id || "Unknown Assistant");
      }
    };

    getUserId();
    getCallData();
  }, [callId, callType]);

  const getFlagOptions = () => {
    switch (callType) {
      case 'medication':
        return [
          { reason: "Wrong questions from AI", icon: AlertTriangle, color: "text-yellow-500" },
          { reason: "Messy conversation, not smooth", icon: Flag, color: "text-orange-500" },
          { reason: "Other issue", icon: Flag, color: "text-blue-500" }
        ];
      case 'research':
        return [
          { reason: "Wrong questions from AI", icon: AlertTriangle, color: "text-yellow-500" },
          { reason: "Messy conversation, not smooth", icon: Flag, color: "text-orange-500" },
          { reason: "Other issue", icon: Flag, color: "text-blue-500" }
        ];
      default:
        return [
          { reason: "Wrong Urgency Level", icon: AlertTriangle, color: "text-yellow-500" },
          { reason: "Wrong Questions from AI", icon: Flag, color: "text-orange-500" },
          { reason: "Messy Conversation, Not Smooth", icon: Flag, color: "text-red-500" },
          { reason: "Other", icon: Flag, color: "text-blue-500" }
        ];
    }
  };

  const openFlagDialog = (reason: string) => {
    setFlagReason(reason);
    setShowFlagDialog(true);
  };

  const handleFlag = async () => {
    try {
      if (!userId) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to flag calls.",
          variant: "destructive",
        });
        return;
      }

      // Create a new flag entry in the call_flags table
      const { error } = await supabase
        .from('call_flags')
        .insert({
          call_id: callId,
          reason: flagReason,
          correct_urgency: flagReason === "Wrong Urgency Level" ? correctUrgency : null,
          additional_notes: additionalNotes,
          assistant_name: assistantName,
          created_by: userId
        });
        
      if (error) throw error;

      toast({
        title: "Call flagged",
        description: `The call has been flagged: ${flagReason}.`,
      });

      // Close dialog and reset states
      setShowFlagDialog(false);
      setFlagReason("");
      setCorrectUrgency("");
      setAdditionalNotes("");
      
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
    <>
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
                  {getFlagOptions().map(({ reason, icon: Icon, color }) => (
                    <DropdownMenuItem 
                      key={reason}
                      onClick={() => openFlagDialog(reason)}
                      className="text-gray-dark hover:bg-mint-light/50 cursor-pointer"
                    >
                      <Icon className={`h-4 w-4 mr-2 ${color}`} />
                      {reason}
                    </DropdownMenuItem>
                  ))}
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

      {/* Flag Dialog */}
      <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Flag Call: {flagReason}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {flagReason === "Wrong Urgency Level" && callType === 'triage' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="correctUrgency" className="text-right">
                  Correct Urgency
                </Label>
                <div className="col-span-3">
                  <Select 
                    onValueChange={setCorrectUrgency} 
                    defaultValue={correctUrgency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="U1">U1 - Immediately Life-threatening</SelectItem>
                      <SelectItem value="U2">U2 - Urgent</SelectItem>
                      <SelectItem value="U3">U3 - Less Urgent</SelectItem>
                      <SelectItem value="U4">U4 - Non-urgent</SelectItem>
                      <SelectItem value="U5">U5 - Advice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalNotes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="additionalNotes"
                className="col-span-3"
                placeholder="Please provide additional details..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowFlagDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleFlag} className="bg-mint hover:bg-mint-dark text-white">
              Submit Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
