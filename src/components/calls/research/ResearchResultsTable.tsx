
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResearchLog, isValidDate } from "./types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

interface ResearchResultsTableProps {
  calls: ResearchLog[];
  currentPage: number;
  itemsPerPage: number;
  formatDate: (date: string | null) => string;
}

export function ResearchResultsTable({ calls, currentPage, itemsPerPage, formatDate }: ResearchResultsTableProps) {
  // Filter out calls with invalid dates before pagination
  const validCalls = calls.filter(call => isValidDate(call.created_at));
  
  // Get paginated calls from the filtered list
  const paginatedCalls = validCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (validCalls.length === 0) {
    return (
      <div className="text-center py-8 text-gray flex flex-col items-center gap-2">
        <Info className="h-5 w-5 text-blue-400" />
        <p>Geen onderzoeksresultaten gevonden</p>
        <p className="text-sm text-gray-400">Er zijn mogelijk lege of onvolledige records in de database.</p>
      </div>
    );
  }

  // Show a warning if some calls were filtered out
  const filteredCount = calls.length - validCalls.length;

  return (
    <div className="overflow-x-auto">
      {filteredCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 text-amber-700 text-sm">
          <Info className="h-4 w-4 inline-block mr-2" />
          {filteredCount} record(s) met ongeldige datums worden niet weergegeven.
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-muted/10 hover:bg-transparent">
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Datum</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Patiënt</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Onderzoek</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Bevindingen</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Advies</TableHead>
            <TableHead className="text-left p-4 text-gray whitespace-nowrap font-semibold">Betrouwbaarheid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCalls.map((call) => (
            <TableRow
              key={call.id}
              className="border-b border-gray-muted/20 hover:bg-gray-muted/5 transition-colors cursor-pointer"
              onClick={() => {}}
            >
              <TableCell className="p-4 text-gray-dark whitespace-nowrap">
                <Link to={`/dashboard/calls/research/${call.call_id}`} className="hover:underline">
                  {formatDate(call.created_at)}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-dark">
                {call.patient_name || "Onbekend"}
              </TableCell>
              <TableCell className="p-4 text-gray-dark">
                {call.research_name || "Niet gespecificeerd"}
              </TableCell>
              <TableCell className="p-4 text-gray-dark">
                <div className="max-w-[200px] truncate">
                  {call.findings || "Niet gespecificeerd"}
                </div>
              </TableCell>
              <TableCell className="p-4 text-gray-dark">
                <div className="max-w-[200px] truncate">
                  {call.recommendation || "Geen advies"}
                </div>
              </TableCell>
              <TableCell className="p-4 text-gray-dark">
                {call.confidence_level || "Niet beoordeeld"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
