import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockCalls = [
  {
    id: 1,
    timestamp: "10:30",
    caller: "Emma T.",
    summary: "Prescription renewal",
    urgency: "medium",
  },
  {
    id: 2,
    timestamp: "11:15",
    caller: "James W.",
    summary: "Routine check-up",
    urgency: "low",
  },
  {
    id: 3,
    timestamp: "12:00",
    caller: "Sarah D.",
    summary: "Urgent consultation",
    urgency: "high",
  },
];

export function ActivityListPreview() {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-white mb-3">Recent Activity</h3>
      <div className="rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-forest border-mint/10">
              <TableHead className="text-white/70 text-xs whitespace-nowrap py-2">Time</TableHead>
              <TableHead className="text-white/70 text-xs whitespace-nowrap py-2">Patient</TableHead>
              <TableHead className="text-white/70 text-xs whitespace-nowrap py-2">Summary</TableHead>
              <TableHead className="text-white/70 text-xs whitespace-nowrap py-2">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCalls.map((call) => (
              <TableRow key={call.id} className="hover:bg-forest border-mint/10">
                <TableCell className="text-white/70 text-xs whitespace-nowrap py-2">{call.timestamp}</TableCell>
                <TableCell className="text-white/70 text-xs whitespace-nowrap py-2">{call.caller}</TableCell>
                <TableCell className="text-white/70 text-xs">
                  <div className="max-w-[120px] truncate" title={call.summary}>
                    {call.summary}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    call.urgency === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : call.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {call.urgency}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}