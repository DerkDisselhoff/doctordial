import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchVapiCalls, VapiCall } from "@/services/vapiService";
import { ChevronLeft, ChevronRight, Clock, MessageCircle, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DetailedCallsList() {
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCalls = async () => {
      try {
        const data = await fetchVapiCalls();
        setCalls(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        toast({
          title: "Error loading calls",
          description: "Failed to load call data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [toast]);

  const paginatedCalls = calls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Card className="bg-white">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-forest">Call History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-forest"><Calendar className="h-4 w-4" /></TableHead>
              <TableHead className="text-forest"><User className="h-4 w-4" /></TableHead>
              <TableHead className="text-forest"><MessageCircle className="h-4 w-4" /></TableHead>
              <TableHead className="text-forest">Urgency</TableHead>
              <TableHead className="text-forest">Sentiment</TableHead>
              <TableHead className="text-forest">Outcome</TableHead>
              <TableHead className="text-forest">Appointment</TableHead>
              <TableHead className="text-forest"><Clock className="h-4 w-4" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCalls.map((call) => (
              <TableRow 
                key={call.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
              >
                <TableCell className="text-forest">
                  {new Date(call.created_at || '').toLocaleString()}
                </TableCell>
                <TableCell className="text-forest">
                  {call.caller_number || 'Unknown'}
                </TableCell>
                <TableCell className="text-forest max-w-xs truncate">
                  {call.transcription || 'No transcription available'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${call.sentiment_analysis?.urgency === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : call.sentiment_analysis?.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                    }`}>
                    {call.sentiment_analysis?.urgency || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${call.sentiment_analysis?.sentiment === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : call.sentiment_analysis?.sentiment === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                    }`}>
                    {call.sentiment_analysis?.sentiment || 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="text-forest">
                  {call.status || 'N/A'}
                </TableCell>
                <TableCell>
                  {call.status === 'completed' ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-mint/10 text-mint">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-forest">
                  {call.duration ? `${call.duration}s` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-forest"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-forest">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-forest"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}