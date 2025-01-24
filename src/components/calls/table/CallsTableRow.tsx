import { TableCell, TableRow } from "@/components/ui/table";
import { VapiCall } from "@/services/vapiService";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUrgencyColor, getSentimentColor, getStatusColor } from "../utils";

interface CallsTableRowProps {
  call: VapiCall;
}

export function CallsTableRow({ call }: CallsTableRowProps) {
  const navigate = useNavigate();

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on the actions dropdown
    if ((e.target as HTMLElement).closest('.actions-dropdown')) {
      e.stopPropagation();
      return;
    }
    navigate(`/dashboard/calls/${call.call_id}`);
  };

  return (
    <TableRow 
      key={call.id}
      className="border-b border-gray-muted/10 hover:bg-gray-muted/5 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <TableCell className="p-4 text-gray-dark whitespace-nowrap">
        {new Date(call.created_at || '').toLocaleString()}
      </TableCell>
      <TableCell className="p-4 text-gray-dark whitespace-nowrap">
        {call.caller_number}
      </TableCell>
      <TableCell className="p-4 text-gray">
        <div className="max-w-[200px] truncate" title={call.transcription}>
          {call.transcription}
        </div>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(call.sentiment_analysis?.urgency || '')}`}>
          {call.sentiment_analysis?.urgency || 'N/A'}
        </span>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs ${
          call.sentiment_analysis?.sentiment === 'positive'
            ? 'bg-green-500/10 text-green-500'
            : call.sentiment_analysis?.sentiment === 'negative'
            ? 'bg-red-500/10 text-red-500'
            : 'bg-gray-500/10 text-gray-400'
        }`}>
          {call.sentiment_analysis?.sentiment || 'N/A'}
        </span>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(call.status || '')}`}>
          {call.status}
        </span>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        {call.status === 'completed' || call.status === 'scheduled' ? (
          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
            Yes
          </span>
        ) : (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-500/10 text-gray-400">
            No
          </span>
        )}
      </TableCell>
      <TableCell className="p-4 text-gray whitespace-nowrap">
        {call.duration ? `${call.duration}s` : 'N/A'}
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <div className="actions-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-4 w-4 text-gray hover:text-gray-dark" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-muted">
              <DropdownMenuItem className="text-gray-dark hover:bg-gray-muted/10 cursor-pointer">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}