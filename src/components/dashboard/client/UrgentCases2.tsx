import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { Button } from "@/components/ui/button";

interface CallLog {
  id: string;
  call_id: string;
  Name: string;
  Symptoms: any;
  Urgencylevel: string;
  Status: string;
  appointment_date: string;
  Action: string;
  conversation_summary: string;
  start_time: string;
  duration_seconds: string;
}

const fetchUrgentCalls = async () => {
  const { data: assistantStatus } = await supabase
    .from('assistant_status')
    .select('assistant_id')
    .eq('profile_id', (await supabase.auth.getSession()).data.session?.user.id)
    .single();

  if (!assistantStatus?.assistant_id) {
    throw new Error('No assistant ID found');
  }

  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('assistant_id', assistantStatus.assistant_id)
    .in('Urgencylevel', ['U2', 'U3', 'U4'])
    .order('start_time', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as CallLog[];
};

export function UrgentCases2() {
  const navigate = useNavigate();
  const { data: calls, isLoading, error } = useQuery({
    queryKey: ['urgentCalls2'],
    queryFn: fetchUrgentCalls,
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
          <p className="text-center text-white/70">Error loading relevant cases</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-sky-500/20 border-sky-500/30 text-sky-500';
      case 'scheduled':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
      case 'missed':
        return 'bg-indigo-500/20 border-indigo-500/30 text-indigo-500';
      case 'rescheduled':
        return 'bg-cyan-500/20 border-cyan-500/30 text-cyan-500';
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-500';
    }
  };

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-white">Relevant Cases 2</CardTitle>
            <div className="flex items-center gap-2">
              {['U2', 'U3', 'U4'].map((level) => (
                <span
                  key={level}
                  className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(level)}`}
                >
                  {level}
                </span>
              ))}
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
              <TableHead className="text-left p-4 text-white/70">Status</TableHead>
              <TableHead className="text-left p-4 text-white/70">Resolution</TableHead>
              <TableHead className="text-left p-4 text-white/70">Duration</TableHead>
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
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(call.Status)}`}>
                    {call.Status}
                  </span>
                </TableCell>
                <TableCell className="p-4 text-white/70">
                  <div className="max-w-[200px] truncate" title={call.conversation_summary}>
                    {call.conversation_summary}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-white/70">
                  {call.duration_seconds ? `${call.duration_seconds}s` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}