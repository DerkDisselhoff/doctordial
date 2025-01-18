import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { useNavigate } from "react-router-dom";

interface UrgentCase {
  id: string;
  call_id: string;
  Name: string | null;
  Urgencylevel: string | null;
  Symptoms: string[] | null;
  Action: string | null;
}

export function UrgentCases() {
  const [cases, setCases] = useState<UrgentCase[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrgentCases = async () => {
      const { data: assistantStatus } = await supabase
        .from('assistant_status')
        .select('assistant_id')
        .eq('profile_id', (await supabase.auth.getSession()).data.session?.user.id)
        .single();

      if (assistantStatus?.assistant_id) {
        const { data } = await supabase
          .from('call_logs')
          .select('*')
          .eq('assistant_id', assistantStatus.assistant_id)
          .in('Urgencylevel', ['U2', 'U3', 'U4'])
          .order('created_at', { ascending: false })
          .limit(5);

        if (data) {
          setCases(data as UrgentCase[]);
        }
      }
    };

    fetchUrgentCases();
  }, []);

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="border-b border-mint/10">
        <CardTitle className="text-white">Relevant Cases (U2-U4)</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className="flex items-center justify-between p-4 bg-forest-light/30 rounded-lg border border-mint/10 cursor-pointer hover:bg-forest-light/40 transition-colors"
              onClick={() => navigate(`/dashboard/calls/${case_.call_id}`)}
            >
              <div className="space-y-1">
                <p className="text-white font-medium">{case_.Name || 'Unknown Patient'}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getUrgencyColor(case_.Urgencylevel || '')}`}>
                    {case_.Urgencylevel}
                  </span>
                  {case_.Symptoms && Array.isArray(case_.Symptoms) && (
                    <span className="text-white/60 text-sm">
                      {case_.Symptoms.join(', ')}
                    </span>
                  )}
                </div>
              </div>
              {case_.Action && (
                <span className="text-mint text-sm">
                  {case_.Action}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}