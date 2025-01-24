import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CallSOEPProps {
  isEditing: boolean;
  soepNotes: Record<string, string>;
  editedCall: any;
  handleInputChange: (field: string, value: string) => void;
}

export function CallSOEP({ isEditing, soepNotes, editedCall, handleInputChange }: CallSOEPProps) {
  return (
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-dark">SOEP</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedCall.follow_up_notes || ''}
            onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
            className="min-h-[200px] mb-4 bg-white text-gray-dark placeholder-gray border-gray-muted"
            placeholder="Enter SOEP notes (Format: S: ... O: ... E: ... P: ...)"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(soepNotes).map(([section, content]) => (
              <div key={section} className="p-4 bg-gray-muted/10 rounded-lg border border-gray-muted">
                <h4 className="text-base font-medium text-blue-dark mb-2">
                  {section === 'S' ? 'Subjective' :
                   section === 'O' ? 'Objective' :
                   section === 'E' ? 'Evaluation' :
                   section === 'P' ? 'Plan' : section}
                </h4>
                <p className="text-base text-gray leading-relaxed">{content || 'No information available'}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}