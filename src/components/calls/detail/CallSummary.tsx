
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

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
        <CardTitle className="text-xl font-semibold text-gray-dark flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-mint" />
          Gespreksamenvatting
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.conversation_summary || ''}
            onChange={(e) => handleInputChange('conversation_summary', e.target.value)}
            className="mb-4 bg-white text-gray-dark placeholder-gray border-gray-muted min-h-24"
            placeholder="Voer gespreksamenvatting in"
          />
        ) : (
          <div className="p-3 bg-gray-50 rounded-md mb-4 min-h-24">
            <p className="text-base text-gray leading-relaxed">
              {call.conversation_summary || 'Geen samenvatting beschikbaar'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
