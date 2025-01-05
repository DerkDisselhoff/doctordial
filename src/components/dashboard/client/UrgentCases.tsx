import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { format } from "date-fns";

// Mock data for urgent cases
const mockUrgentCases = [
  {
    id: 1,
    patientName: "Emma Thompson",
    summary: "Severe chest pain, referred to emergency",
    followUp: "Schedule cardiology consultation",
    appointmentMade: true,
    appointmentDate: "2024-03-20T14:30:00",
    urgencyLevel: "U1",
    timestamp: "2024-03-15T09:30:00",
  },
  {
    id: 2,
    patientName: "James Wilson",
    summary: "High fever and difficulty breathing",
    followUp: "Monitor symptoms, follow-up in 24h",
    appointmentMade: false,
    appointmentDate: null,
    urgencyLevel: "U2",
    timestamp: "2024-03-15T10:15:00",
  },
  {
    id: 3,
    patientName: "Sarah Davis",
    summary: "Severe allergic reaction",
    followUp: "Allergy specialist referral",
    appointmentMade: true,
    appointmentDate: "2024-03-22T11:00:00",
    urgencyLevel: "U1",
    timestamp: "2024-03-15T11:00:00",
  },
  {
    id: 4,
    patientName: "Michael Brown",
    summary: "Acute abdominal pain",
    followUp: "Schedule ultrasound",
    appointmentMade: true,
    appointmentDate: "2024-03-21T09:15:00",
    urgencyLevel: "U3",
    timestamp: "2024-03-15T11:45:00",
  },
  {
    id: 5,
    patientName: "Lisa Anderson",
    summary: "Severe migraine, unresponsive to medication",
    followUp: "Neurologist consultation",
    appointmentMade: false,
    appointmentDate: null,
    urgencyLevel: "U2",
    timestamp: "2024-03-15T12:30:00",
  },
];

export function UrgentCases() {
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");

  const filteredCases = mockUrgentCases.filter(
    (case_) => selectedUrgency === "all" || case_.urgencyLevel === selectedUrgency
  );

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-6">
        <CardTitle className="dashboard-card-title">Urgent Cases</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedUrgency === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedUrgency("all")}
            className="text-xs bg-forest hover:bg-forest-light text-white"
          >
            All
          </Button>
          <Button
            variant={selectedUrgency === "U1" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedUrgency("U1")}
            className="text-xs bg-red-500 hover:bg-red-600 text-white"
          >
            U1
          </Button>
          <Button
            variant={selectedUrgency === "U2" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedUrgency("U2")}
            className="text-xs bg-orange-500 hover:bg-orange-600 text-white"
          >
            U2
          </Button>
          <Button
            variant={selectedUrgency === "U3" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedUrgency("U3")}
            className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            U3
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="dashboard-table">
          <Table>
            <TableHeader className="dashboard-table-header">
              <TableRow>
                <TableHead className="text-left">Patient Name</TableHead>
                <TableHead className="text-left">Summary</TableHead>
                <TableHead className="text-left">Follow-up</TableHead>
                <TableHead className="text-left">Urgency</TableHead>
                <TableHead className="text-left">Appointment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id} className="dashboard-table-row">
                  <TableCell className="dashboard-table-cell font-medium border-l-2 border-mint/20 pl-4 text-left">
                    {case_.patientName}
                  </TableCell>
                  <TableCell className="dashboard-table-cell text-left">
                    {case_.summary}
                  </TableCell>
                  <TableCell className="dashboard-table-cell text-left">
                    {case_.followUp}
                  </TableCell>
                  <TableCell className="dashboard-table-cell text-left">
                    <span className={`urgency-badge urgency-badge-${case_.urgencyLevel.toLowerCase()}`}>
                      {case_.urgencyLevel}
                    </span>
                  </TableCell>
                  <TableCell className="dashboard-table-cell text-left">
                    {case_.appointmentMade ? (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {format(new Date(case_.appointmentDate!), "MMM d, HH:mm")}
                        </span>
                      </div>
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}