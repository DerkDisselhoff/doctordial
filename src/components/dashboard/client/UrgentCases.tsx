import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { Button } from "@/components/ui/button";
import { Filter, List } from "lucide-react";

interface CallLog {
  id: string;
  call_id: string;
  Name: string;
  Symptoms: any;
  Urgencylevel: string;
  Forwarded: boolean;
  appointment_date: string;
  Action: string;
  conversation_summary: string;
  start_time: string;
  duration_seconds: string;
  Emotion: string;
}

const fetchUrgentCalls = async (isIrrelevant: boolean = false) => {
  const { data: assistantStatus } = await supabase
    .from('assistant_status')
    .select('assistant_id')
    .eq('profile_id', (await supabase.auth.getSession()).data.session?.user.id)
    .single();

  if (!assistantStatus?.assistant_id) {
    throw new Error('No assistant ID found');
  }

  const urgencyLevels = isIrrelevant ? ['U1', 'U5'] : ['U2', 'U3', 'U4'];

  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('assistant_id', assistantStatus.assistant_id)
    .in('Urgencylevel', urgencyLevels)
    .order('start_time', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as CallLog[];
};

interface UrgentCasesProps {
  isIrrelevant?: boolean;
}

export function UrgentCases({ isIrrelevant = false }: UrgentCasesProps) {
  const navigate = useNavigate();
  const { data: calls, isLoading, error } = useQuery({
    queryKey: ['urgentCalls', isIrrelevant],
    queryFn: () => fetchUrgentCalls(isIrrelevant),
  });

  if (isLoading) {
    return (
      <Card className="bg-forest-light/50 border-mint/10">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-forest-light/50 border-mint/10">
        <CardContent className="p-4">
          <p className="text-center text-white/70">Error loading cases</p>
        </CardContent>
      </Card>
    );
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion?.toLowerCase()) {
      case 'happy':
        return 'bg-green-500/20 border-green-500/30 text-green-500';
      case 'sad':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
      case 'angry':
        return 'bg-red-500/20 border-red-500/30 text-red-500';
      case 'neutral':
        return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-500';
    }
  };

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-white">
              {isIrrelevant ? "Other cases (not forwarded)" : "Relevant Cases"}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isIrrelevant ? (
                <>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor('U1')}`}>U1</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor('U5')}`}>U5</span>
                  <span className="px-2 py-1 rounded-full text-xs border bg-gray-500/20 border-gray-500/30 text-gray-500">
                    <Filter className="w-3 h-3 inline-block mr-1" />
                    Other
                  </span>
                </>
              ) : (
                ['U2', 'U3', 'U4'].map((level) => (
                  <span
                    key={level}
                    className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(level)}`}
                  >
                    {level}
                  </span>
                ))
              )}
            </div>
          </div>
          <Button
            variant="outline"
            className="text-mint border-mint/20 hover:bg-mint/10"
            onClick={() => navigate('/dashboard/calls')}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-mint/10">
              <TableHead className="text-left p-4 text-white/70">Patient</TableHead>
              <TableHead className="text-left p-4 text-white/70">Symptoms</TableHead>
              <TableHead className="text-left p-4 text-white/70">Urgency</TableHead>
              <TableHead className="text-left p-4 text-white/70">Forwarded</TableHead>
              <TableHead className="text-left p-4 text-white/70">Summary</TableHead>
              <TableHead className="text-left p-4 text-white/70">Duration</TableHead>
              <TableHead className="text-left p-4 text-white/70">Emotion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls?.map((call) => (
              <TableRow 
                key={call.id} 
                className="border-b border-mint/5 hover:bg-mint/5 cursor-pointer transition-colors"
                onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
              >
                <TableCell className="p-4 text-white">{call.Name || 'Unknown'}</TableCell>
                <TableCell className="p-4 text-white/70">
                  <div className="max-w-[200px] truncate" title={call.Symptoms}>
                    {call.Symptoms}
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(call.Urgencylevel)}`}>
                    {call.Urgencylevel}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.Forwarded
                      ? 'bg-mint/10 text-mint'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {call.Forwarded ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell className="p-4 text-white/70">
                  <div className="max-w-[200px] truncate" title={call.conversation_summary}>
                    {call.conversation_summary}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-white/70">
                  {call.duration_seconds ? `${Math.round(parseFloat(call.duration_seconds))}s` : 'N/A'}
                </TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getEmotionColor(call.Emotion)}`}>
                    {call.Emotion || 'N/A'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}