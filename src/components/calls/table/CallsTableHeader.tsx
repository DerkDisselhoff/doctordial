import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, MessageCircle, Clock, MoreVertical } from "lucide-react";

export function CallsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-mint/10">
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">
          <Calendar className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">
          <User className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">
          <MessageCircle className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">Urgency</TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">Sentiment</TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">Status</TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">Appointment</TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">
          <Clock className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-white/70 whitespace-nowrap">
          <MoreVertical className="h-4 w-4" />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}