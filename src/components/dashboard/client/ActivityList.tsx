import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, Clock, MessageCircle, Phone, User } from "lucide-react";

const activityData = [
  {
    id: 1,
    caller: "John Smith",
    message: "Requested urgent appointment due to severe back pain",
    urgency: "U1",
    sentiment: "Distressed",
    outcome: "Immediate callback scheduled",
    appointmentMade: true,
    timestamp: "2024-03-20 09:30"
  },
  {
    id: 2,
    caller: "Emma Wilson",
    message: "Follow-up about medication side effects",
    urgency: "U3",
    sentiment: "Concerned",
    outcome: "Advice provided",
    appointmentMade: false,
    timestamp: "2024-03-20 10:15"
  },
  {
    id: 3,
    caller: "Michael Brown",
    message: "Regular check-up scheduling",
    urgency: "U4",
    sentiment: "Neutral",
    outcome: "Appointment scheduled",
    appointmentMade: true,
    timestamp: "2024-03-20 11:00"
  },
];

export function ActivityList() {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="dashboard-card-title">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="dashboard-table">
          <TableHeader className="dashboard-table-header">
            <TableRow>
              <TableHead><User className="h-4 w-4 text-white/70" /></TableHead>
              <TableHead><MessageCircle className="h-4 w-4 text-white/70" /></TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead><Clock className="h-4 w-4 text-white/70" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity) => (
              <TableRow key={activity.id} className="dashboard-table-row">
                <TableCell className="dashboard-table-cell">{activity.caller}</TableCell>
                <TableCell className="dashboard-table-cell max-w-xs truncate">
                  {activity.message}
                </TableCell>
                <TableCell className="dashboard-table-cell">
                  <span className={`urgency-badge urgency-badge-${activity.urgency.toLowerCase()}`}>
                    {activity.urgency}
                  </span>
                </TableCell>
                <TableCell className="dashboard-table-cell">{activity.sentiment}</TableCell>
                <TableCell className="dashboard-table-cell">{activity.outcome}</TableCell>
                <TableCell className="dashboard-table-cell">
                  {activity.appointmentMade ? 
                    <CheckCircle className="h-4 w-4 text-mint" /> : 
                    <AlertCircle className="h-4 w-4 text-white/30" />
                  }
                </TableCell>
                <TableCell className="dashboard-table-cell text-white/60">
                  {activity.timestamp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}