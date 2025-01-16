import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { getUrgencyColor } from "@/utils/urgencyUtils";

interface UrgentCase {
  id: string;
  Name: string | null;
  Symptoms: any;
  Urgencylevel: string | null;
  Status: string | null;
  appointment_date: string | null;
  Action: string | null;
  conversation_summary: string | null;
}

export function UrgentCases() {
  const [urgentCases, setUrgentCases] = useState<UrgentCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrgentCases = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) throw new Error('No session found');

        const { data: assistantData, error: assistantError } = await supabase
          .from('assistant_status')
          .select('assistant_id')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (assistantError) throw assistantError;
        if (!assistantData?.assistant_id) throw new Error('No assistant ID found');

        const { data: callData, error: callError } = await supabase
          .from('call_logs')
          .select('*')
          .eq('assistant_id', assistantData.assistant_id)
          .in('Urgencylevel', ['U1', 'U2'])
          .order('start_time', { ascending: false });

        if (callError) throw callError;
        setUrgentCases(callData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching urgent cases:', error);
        setLoading(false);
      }
    };

    fetchUrgentCases();
  }, []);

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

  if (loading) {
    return (
      <Card className="bg-forest-light/50 border-mint/10">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white">Urgent Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-mint/10">
                <TableHead className="text-left p-4 text-white/70">Patient</TableHead>
                <TableHead className="text-left p-4 text-white/70">Symptoms</TableHead>
                <TableHead className="text-left p-4 text-white/70">Urgency</TableHead>
                <TableHead className="text-left p-4 text-white/70">Status</TableHead>
                <TableHead className="text-left p-4 text-white/70">Actions</TableHead>
                <TableHead className="text-left p-4 text-white/70">Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urgentCases.map((case_) => (
                <TableRow key={case_.id} className="border-b border-mint/5">
                  <TableCell className="p-4 text-white">{case_.Name || 'Unknown'}</TableCell>
                  <TableCell className="p-4 text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.Symptoms}>
                      {case_.Symptoms}
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(case_.Urgencylevel || '')}`}>
                      {case_.Urgencylevel}
                    </span>
                  </TableCell>
                  <TableCell className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(case_.Status || '')}`}>
                      {case_.Status}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.Action}>
                      {case_.Action}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.conversation_summary}>
                      {case_.conversation_summary}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}