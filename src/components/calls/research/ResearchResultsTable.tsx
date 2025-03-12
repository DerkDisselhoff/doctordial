
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Calendar, Microscope, User, FileText } from "lucide-react";
import { ResearchLog } from "../research/types";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface ResearchResultsTableProps {
  filteredCalls: ResearchLog[];
  currentPage: number;
  itemsPerPage: number;
  formatDate: (dateString: string | null) => string;
  isDemoAccount: boolean;
}

export function ResearchResultsTable({ 
  filteredCalls, 
  currentPage, 
  itemsPerPage,
  formatDate,
  isDemoAccount
}: ResearchResultsTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (callId: string) => {
    navigate(`/dashboard/calls/research/${callId}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-muted/10 hover:bg-transparent">
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Datum</span>
              </div>
            </TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Samenvatting</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Patiënt</span>
              </div>
            </TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Geboortedatum</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
              <div className="flex items-center">
                <Microscope className="h-4 w-4 mr-2" />
                <span>Onderzoek</span>
              </div>
            </TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Onderzoek datum</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCalls.length > 0 ? (
            filteredCalls
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((call) => (
              <TableRow 
                key={call.id} 
                className="border-b border-gray-muted/20 hover:bg-gray-muted/5 transition-colors cursor-pointer"
                onClick={() => handleRowClick(call.call_id || '')}
              >
                <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                  {formatDate(call.created_at)}
                </TableCell>
                <TableCell className="p-4 text-gray-dark">
                  <div className="max-w-[200px] truncate" title={call.conversation_summary || "Geen samenvatting"}>
                    {call.conversation_summary || "Geen samenvatting"}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                  {call.patient_name || "Onbekend"}
                </TableCell>
                <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                  {call.date_of_birth || "Niet gespecificeerd"}
                </TableCell>
                <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                  {call.research_name || "Niet gespecificeerd"}
                </TableCell>
                <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                  {call.research_date || "Niet gespecificeerd"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray">
                {isDemoAccount ? 
                  "Dit is een demo account. Er zijn nog geen onderzoek uitslagen geconfigureerd." : 
                  "Geen onderzoek uitslagen gesprekken gevonden"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
