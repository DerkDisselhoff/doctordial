import { useEffect, useState } from "react";
import { fetchVapiCalls, VapiCall } from "@/services/vapiService";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VapiCallsList = () => {
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCalls = async () => {
      try {
        const data = await fetchVapiCalls();
        setCalls(data);
      } catch (error) {
        toast({
          title: "Error loading calls",
          description: "Failed to load VAPI calls. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [toast]);

  if (loading) {
    return <div className="flex justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
    </div>;
  }

  if (calls.length === 0) {
    return <div className="flex justify-center p-8 text-forest/60">No calls found.</div>;
  }

  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="text-forest/70">Call ID</TableHead>
            <TableHead className="text-forest/70">Caller</TableHead>
            <TableHead className="text-forest/70">Recipient</TableHead>
            <TableHead className="text-forest/70">Duration</TableHead>
            <TableHead className="text-forest/70">Status</TableHead>
            <TableHead className="text-forest/70">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium text-forest">{call.call_id}</TableCell>
              <TableCell className="text-forest/80">{call.caller_number || 'N/A'}</TableCell>
              <TableCell className="text-forest/80">{call.recipient_number || 'N/A'}</TableCell>
              <TableCell className="text-forest/80">{call.duration ? `${call.duration}s` : 'N/A'}</TableCell>
              <TableCell>
                <span className={`status-badge ${
                  call.status === 'completed' ? 'status-badge-success' :
                  call.status === 'failed' ? 'status-badge-error' :
                  'status-badge-pending'
                }`}>
                  {call.status || 'N/A'}
                </span>
              </TableCell>
              <TableCell className="text-forest/60">
                {call.created_at 
                  ? new Date(call.created_at).toLocaleString()
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default VapiCallsList;