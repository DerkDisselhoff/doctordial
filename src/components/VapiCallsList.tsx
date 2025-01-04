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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    return (
      <Card className="dashboard-card">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  if (calls.length === 0) {
    return (
      <Card className="dashboard-card">
        <CardContent className="flex justify-center p-8">
          <p className="text-gray-500">No calls found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="dashboard-card-title">Recent Calls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="dashboard-table">
          <TableHeader className="dashboard-table-header">
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
              <TableRow key={call.id} className="dashboard-table-row">
                <TableCell className="dashboard-table-cell font-medium">{call.call_id}</TableCell>
                <TableCell className="dashboard-table-cell">{call.caller_number || 'N/A'}</TableCell>
                <TableCell className="dashboard-table-cell">{call.recipient_number || 'N/A'}</TableCell>
                <TableCell className="dashboard-table-cell">{call.duration ? `${call.duration}s` : 'N/A'}</TableCell>
                <TableCell className="dashboard-table-cell">
                  <span className={`status-badge ${
                    call.status === 'completed' ? 'status-badge-success' :
                    call.status === 'failed' ? 'status-badge-error' :
                    'status-badge-pending'
                  }`}>
                    {call.status || 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="dashboard-table-cell">
                  {call.created_at 
                    ? new Date(call.created_at).toLocaleString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default VapiCallsList;