import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, MessageCircle, Clock, MoreVertical } from "lucide-react";

export function CallsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-muted/10">
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">
          <Calendar className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">
          <User className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">
          <MessageCircle className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">Urgency</TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">Sentiment</TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">Status</TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">Appointment</TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">
          <Clock className="h-4 w-4" />
        </TableHead>
        <TableHead className="text-left p-4 text-gray whitespace-nowrap">
          <MoreVertical className="h-4 w-4" />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}