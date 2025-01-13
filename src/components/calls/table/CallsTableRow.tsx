import { TableCell, TableRow } from "@/components/ui/table";
import { VapiCall } from "@/services/vapiService";
import { useNavigate } from "react-router-dom";

interface CallsTableRowProps {
  call: VapiCall;
}

export function CallsTableRow({ call }: CallsTableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow 
      key={call.id}
      className="border-b border-mint/5 hover:bg-mint/5 cursor-pointer transition-colors"
      onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
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
        <span className={`px-2 py-1 rounded-full text-xs ${
          call.sentiment_analysis?.urgency === 'high' 
            ? 'bg-red-500/10 text-red-500' 
            : call.sentiment_analysis?.urgency === 'medium'
            ? 'bg-yellow-500/10 text-yellow-500'
            : 'bg-green-500/10 text-green-500'
        }`}>
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
      <TableCell className="p-4 text-white/70 whitespace-nowrap">
        {call.status}
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
    </TableRow>
  );
}