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
    return <div className="flex justify-center p-8 text-gray-500">No calls found.</div>;
  }

  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-forest">Call ID</TableHead>
            <TableHead className="text-forest">Caller</TableHead>
            <TableHead className="text-forest">Recipient</TableHead>
            <TableHead className="text-forest">Duration</TableHead>
            <TableHead className="text-forest">Status</TableHead>
            <TableHead className="text-forest">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{call.call_id}</TableCell>
              <TableCell>{call.caller_number || 'N/A'}</TableCell>
              <TableCell>{call.recipient_number || 'N/A'}</TableCell>
              <TableCell>{call.duration ? `${call.duration}s` : 'N/A'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  call.status === 'completed' ? 'bg-green-100 text-green-800' :
                  call.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {call.status || 'N/A'}
                </span>
              </TableCell>
              <TableCell className="text-gray-500">
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