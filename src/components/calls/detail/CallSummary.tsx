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
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-dark">Call Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.conversation_summary || ''}
            onChange={(e) => handleInputChange('conversation_summary', e.target.value)}
            className="mb-4 bg-white text-gray-dark placeholder-gray border-gray-muted"
            placeholder="Enter call summary"
          />
        ) : (
          <p className="text-gray mb-4">{call.conversation_summary || 'No summary available'}</p>
        )}
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-dark">Follow-up Details</h3>
          <div className="p-3 bg-gray-muted/10 rounded-lg border border-gray-muted">
            <div className="flex items-start space-x-3">
              <ArrowRight className="h-5 w-5 text-blue-dark mt-0.5" />
              <div>
                <p className="text-gray-dark font-medium mb-1">Forwarded</p>
                {isEditing ? (
                  <Textarea
                    value={editedCall.Action || ''}
                    onChange={(e) => handleInputChange('Action', e.target.value)}
                    className="bg-white text-gray-dark placeholder-gray border-gray-muted"
                    placeholder="Enter forwarding details"
                  />
                ) : (
                  <p className="text-gray">{call.Action || 'No action required'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}