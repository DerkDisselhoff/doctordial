import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, Clock, MessageCircle, Phone, User } from "lucide-react";

// Mock data for the activity list
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
    <Card className="bg-white shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-forest">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-forest"><User className="h-4 w-4" /></TableHead>
              <TableHead className="text-forest"><MessageCircle className="h-4 w-4" /></TableHead>
              <TableHead className="text-forest">Urgency</TableHead>
              <TableHead className="text-forest">Sentiment</TableHead>
              <TableHead className="text-forest">Outcome</TableHead>
              <TableHead className="text-forest">Appointment</TableHead>
              <TableHead className="text-forest"><Clock className="h-4 w-4" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-gray-50">
                <TableCell>{activity.caller}</TableCell>
                <TableCell className="max-w-xs truncate">{activity.message}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.urgency === 'U1' ? 'bg-red-100 text-red-800' :
                    activity.urgency === 'U2' ? 'bg-orange-100 text-orange-800' :
                    activity.urgency === 'U3' ? 'bg-yellow-100 text-yellow-800' :
                    activity.urgency === 'U4' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.urgency}
                  </span>
                </TableCell>
                <TableCell>{activity.sentiment}</TableCell>
                <TableCell>{activity.outcome}</TableCell>
                <TableCell>
                  {activity.appointmentMade ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <AlertCircle className="h-4 w-4 text-gray-300" />
                  }
                </TableCell>
                <TableCell className="text-gray-500">{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}