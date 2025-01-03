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
    return <div className="flex justify-center p-8">Loading calls...</div>;
  }

  if (calls.length === 0) {
    return <div className="flex justify-center p-8">No calls found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Recent Calls</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Call ID</TableHead>
              <TableHead>Caller</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{call.call_id}</TableCell>
                <TableCell>{call.caller_number || 'N/A'}</TableCell>
                <TableCell>{call.recipient_number || 'N/A'}</TableCell>
                <TableCell>{call.duration ? `${call.duration}s` : 'N/A'}</TableCell>
                <TableCell>{call.status || 'N/A'}</TableCell>
                <TableCell>
                  {call.timestamp 
                    ? new Date(call.timestamp).toLocaleString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VapiCallsList;