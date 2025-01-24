import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

interface CallSummaryProps {
  isEditing: boolean;
  editedCall: any;
  handleInputChange: (field: string, value: string) => void;
  call: any;
}

export function CallSummary({ isEditing, editedCall, handleInputChange, call }: CallSummaryProps) {
  return (
    <Card className="bg-surface border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-text-primary">Call Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.conversation_summary || ''}
            onChange={(e) => handleInputChange('conversation_summary', e.target.value)}
            className="mb-4 bg-surface-secondary text-text-primary placeholder-text-muted border-border"
            placeholder="Enter call summary"
          />
        ) : (
          <p className="text-text-secondary mb-4">{call.conversation_summary || 'No summary available'}</p>
        )}
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Follow-up Details</h3>
          <div className="p-3 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-text-primary font-medium mb-1">Forwarded</p>
                {isEditing ? (
                  <Textarea
                    value={editedCall.Action || ''}
                    onChange={(e) => handleInputChange('Action', e.target.value)}
                    className="bg-surface-secondary text-text-primary placeholder-text-muted border-border"
                    placeholder="Enter forwarding details"
                  />
                ) : (
                  <p className="text-text-secondary">{call.Action || 'No action required'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}