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
                    message.role === 'AI' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`flex items-start gap-4 max-w-[80%] ${
                    message.role === 'AI' ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    <div className={`flex-shrink-0 w-12 text-sm font-medium pt-2 ${
                      message.role === 'AI' ? 'text-blue-dark text-left' : 'text-gray-dark text-right'
                    }`}>
                      {message.role}
                    </div>
                    <div className={`flex-grow p-3 rounded-lg ${
                      message.role === 'AI' 
                        ? 'bg-blue-light border border-blue/20' 
                        : 'bg-mint-light border border-mint-light'
                    }`}>
                      <p className="text-sm text-gray-dark leading-relaxed">{message.content}</p>
                    </div>
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