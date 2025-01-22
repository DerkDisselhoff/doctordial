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
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Call Transcript</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.transcript || ''}
            onChange={(e) => handleInputChange('transcript', e.target.value)}
            className="min-h-[300px] bg-forest-light/50 text-white placeholder-white/40 border-mint/20"
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
                  <div className={`flex-shrink-0 w-16 text-sm font-medium ${
                    message.role === 'AI' ? 'text-mint' : 'text-divine'
                  }`}>
                    {message.role}
                  </div>
                  <div className={`flex-grow p-3 rounded-lg ${
                    message.role === 'AI' 
                      ? 'bg-forest border border-mint/10' 
                      : 'bg-forest-light border border-divine/10'
                  }`}>
                    <p className="text-white/80">{message.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/60">No transcript available</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}