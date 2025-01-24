import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CallTranscriptProps {
  isEditing: boolean;
  editedCall: any;
  handleInputChange: (field: string, value: string) => void;
  transcriptMessages: Array<{role: string, content: string}>;
}

export function CallTranscript({ 
  isEditing, 
  editedCall, 
  handleInputChange, 
  transcriptMessages 
}: CallTranscriptProps) {
  return (
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-dark">Call Transcript</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.transcript || ''}
            onChange={(e) => handleInputChange('transcript', e.target.value)}
            className="min-h-[300px] bg-white text-gray-dark placeholder-gray border-gray-muted"
            placeholder="Enter transcript (Format: AI: ... User: ...)"
          />
        ) : (
          <div className="space-y-4">
            {transcriptMessages.length > 0 ? (
              transcriptMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.role === 'AI' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-shrink-0 w-16 text-base font-medium ${
                    message.role === 'AI' ? 'text-blue-dark' : 'text-gray-dark'
                  }`}>
                    {message.role}
                  </div>
                  <div className={`flex-grow p-4 rounded-lg ${
                    message.role === 'AI' 
                      ? 'bg-gray-muted/10 border border-gray-muted' 
                      : 'bg-blue/10 border border-blue/20'
                  }`}>
                    <p className="text-base text-gray leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base text-gray">No transcript available</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}