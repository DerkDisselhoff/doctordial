import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface UrgentCasesProps {
  isIrrelevant: boolean;
}

export function UrgentCases({ isIrrelevant }: UrgentCasesProps) {
  const navigate = useNavigate();

  const { data: calls } = useQuery({
    queryKey: ['urgent-calls', isIrrelevant],
    queryFn: async () => {
      const { data: assistantStatus } = await supabase
        .from('assistant_status')
        .select('assistant_id')
        .single();

      if (!assistantStatus?.assistant_id) return [];

      const { data } = await supabase
        .from('call_logs')
        .select('*')
        .eq('assistant_id', assistantStatus.assistant_id)
        .eq('action_required', !isIrrelevant)
        .order('created_at', { ascending: false })
        .limit(5);

      return data || [];
    }
  });

  return (
    <Card className="bg-surface border-surface-input">
      <CardHeader>
        <CardTitle className="text-text-primary">
          {isIrrelevant ? 'Irrelevant Cases' : 'Relevant Cases'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-surface-secondary/50">
              <TableHead className="text-text-secondary">Time</TableHead>
              <TableHead className="text-text-secondary">Patient</TableHead>
              <TableHead className="text-text-secondary">Summary</TableHead>
              <TableHead className="text-text-secondary">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls?.map((call) => (
              <TableRow 
                key={call.id}
                className="cursor-pointer hover:bg-surface-secondary/50"
                onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
              >
                <TableCell className="text-text-primary">
                  {new Date(call.created_at).toLocaleTimeString()}
                </TableCell>
                <TableCell className="text-text-primary">{call.Name || 'Unknown'}</TableCell>
                <TableCell className="text-text-primary max-w-[200px] truncate">
                  {call.conversation_summary || 'No summary available'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.Status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : call.Status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {call.Status || 'Unknown'}
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