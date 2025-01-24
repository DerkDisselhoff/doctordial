import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { getUrgencyColor } from "@/components/calls/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface UrgentCasesProps {
  isIrrelevant: boolean;
}

export function UrgentCases({ isIrrelevant }: UrgentCasesProps) {
  const { data: calls } = useQuery({
    queryKey: ['urgent-calls', isIrrelevant],
    queryFn: async () => {
      const { data } = await supabase
        .from('call_logs')
        .select('*')
        .eq('action_required', !isIrrelevant)
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  return (
    <Card className="bg-surface border-surface-input">
      <CardHeader>
        <CardTitle className="text-text-primary">
          {isIrrelevant ? "Irrelevant Cases" : "Relevant Cases"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls?.map((call) => (
            <div
              key={call.id}
              className="p-4 rounded-lg bg-surface-secondary border border-surface-input"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">
                    {call.Name || "Unknown Patient"}
                  </span>
                  {call.Urgencylevel && (
                    <Badge className={getUrgencyColor(call.Urgencylevel)}>
                      {call.Urgencylevel}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-text-secondary">
                  {format(new Date(call.created_at), "MMM d, HH:mm")}
                </span>
              </div>
              <p className="text-sm text-text-secondary line-clamp-2">
                {call.conversation_summary || "No summary available"}
              </p>
            </div>
          ))}
          {(!calls || calls.length === 0) && (
            <p className="text-center text-text-secondary py-4">
              No {isIrrelevant ? "irrelevant" : "relevant"} cases found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}