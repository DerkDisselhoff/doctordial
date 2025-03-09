
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
        <CardTitle className="text-xl font-semibold text-gray-dark">Gespreksamenvatting</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.conversation_summary || ''}
            onChange={(e) => handleInputChange('conversation_summary', e.target.value)}
            className="mb-4 bg-white text-gray-dark placeholder-gray border-gray-muted"
            placeholder="Voer gespreksamenvatting in"
          />
        ) : (
          <p className="text-base text-gray leading-relaxed mb-4">{call.conversation_summary || 'Geen samenvatting beschikbaar'}</p>
        )}
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-dark">Follow-up Details</h3>
          <div className="p-3 bg-gray-muted/10 rounded-lg border border-gray-muted">
            <div className="flex items-start space-x-3">
              <ArrowRight className="h-5 w-5 text-blue-dark mt-0.5" />
              <div>
                <p className="text-base font-medium text-gray-dark mb-1">Doorgestuurd</p>
                {isEditing ? (
                  <Textarea
                    value={editedCall.Action || ''}
                    onChange={(e) => handleInputChange('Action', e.target.value)}
                    className="bg-white text-gray-dark placeholder-gray border-gray-muted"
                    placeholder="Voer doorstuurdetails in"
                  />
                ) : (
                  <p className="text-base text-gray leading-relaxed">{call.Action || 'Geen actie vereist'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
