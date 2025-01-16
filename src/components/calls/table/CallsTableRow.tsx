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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'U1':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'U2':
        return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'U3':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'U4':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'U5':
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <TableRow 
      key={call.id}
      className="border-b border-mint/5 hover:bg-mint/5 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <TableCell className="p-4 text-white whitespace-nowrap">
        {new Date(call.created_at || '').toLocaleString()}
      </TableCell>
      <TableCell className="p-4 text-white whitespace-nowrap">
        {call.caller_number}
      </TableCell>
      <TableCell className="p-4 text-white/70">
        <div className="max-w-[200px] truncate" title={call.transcription}>
          {call.transcription}
        </div>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(call.sentiment_analysis?.urgency || '')}`}>
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
        <span className={`px-2 py-1 rounded-full text-xs ${
          call.status === 'completed'
            ? 'bg-green-100 text-green-700 border border-green-200'
            : call.status === 'scheduled'
            ? 'bg-blue-100 text-blue-700 border border-blue-200'
            : call.status === 'missed'
            ? 'bg-red-100 text-red-700 border border-red-200'
            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        }`}>
          {call.status}
        </span>
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        {call.status === 'completed' || call.status === 'scheduled' ? (
          <span className="px-2 py-1 rounded-full text-xs bg-mint/10 text-mint">
            Yes
          </span>
        ) : (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-500/10 text-gray-400">
            No
          </span>
        )}
      </TableCell>
      <TableCell className="p-4 text-white/70 whitespace-nowrap">
        {call.duration ? `${call.duration}s` : 'N/A'}
      </TableCell>
      <TableCell className="p-4 whitespace-nowrap">
        <div className="actions-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-4 w-4 text-white/70 hover:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-forest-light border-mint/10">
              <DropdownMenuItem className="text-white hover:bg-mint/10 cursor-pointer">
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