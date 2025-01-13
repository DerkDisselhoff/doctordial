import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, MessageCircle, Clock } from "lucide-react";

export function CallsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-mint/10">
        <TableHead className="text-white/70"><Calendar className="h-4 w-4" /></TableHead>
        <TableHead className="text-white/70"><User className="h-4 w-4" /></TableHead>
        <TableHead className="text-white/70"><MessageCircle className="h-4 w-4" /></TableHead>
        <TableHead className="text-white/70">Urgency</TableHead>
        <TableHead className="text-white/70">Sentiment</TableHead>
        <TableHead className="text-white/70">Outcome</TableHead>
        <TableHead className="text-white/70">Appointment</TableHead>
        <TableHead className="text-white/70"><Clock className="h-4 w-4" /></TableHead>
      </TableRow>
    </TableHeader>
  );
}