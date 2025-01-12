import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockCalls = [
  {
    id: 1,
    timestamp: "2024-03-15 09:30",
    caller: "Emma Thompson",
    summary: "Prescription renewal request",
    urgency: "medium",
    sentiment: "positive",
    outcome: "completed",
  },
  {
    id: 2,
    timestamp: "2024-03-15 10:15",
    caller: "James Wilson",
    summary: "Scheduling routine check-up",
    urgency: "low",
    sentiment: "neutral",
    outcome: "scheduled",
  },
  {
    id: 3,
    timestamp: "2024-03-15 11:00",
    caller: "Sarah Davis",
    summary: "Discussing test results",
    urgency: "high",
    sentiment: "negative",
    outcome: "escalated",
  },
];

export function ActivityListPreview() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-forest border-mint/10">
              <TableHead className="text-white whitespace-nowrap">Time</TableHead>
              <TableHead className="text-white whitespace-nowrap">Caller</TableHead>
              <TableHead className="text-white whitespace-nowrap">Summary</TableHead>
              <TableHead className="text-white whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCalls.map((call) => (
              <TableRow key={call.id} className="hover:bg-forest border-mint/10">
                <TableCell className="text-white/70 whitespace-nowrap">{call.timestamp}</TableCell>
                <TableCell className="text-white/70 whitespace-nowrap">{call.caller}</TableCell>
                <TableCell className="text-white/70">
                  <div className="max-w-[200px] truncate" title={call.summary}>
                    {call.summary}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
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