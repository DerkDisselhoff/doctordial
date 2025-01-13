import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

const getUrgencyColor = (level: string) => {
  switch (level) {
    case 'U1': return 'bg-red-100 text-red-700 border border-red-200';
    case 'U2': return 'bg-orange-100 text-orange-700 border border-orange-200';
    case 'U3': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'U4': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'U5': return 'bg-green-100 text-green-700 border border-green-200';
    default: return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

export function UrgentCases() {
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");

  const filteredCases = mockUrgentCases.filter(
    (case_) => selectedUrgency === "all" || case_.urgencyLevel === selectedUrgency
  );

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="flex flex-row items-center justify-between border-b border-mint/10 pb-6">
        <div>
          <CardTitle className="text-white">Urgent Cases</CardTitle>
          <p className="text-white/60">Monitor and manage urgent patient cases</p>
        </div>
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-mint/10">
                <TableHead className="text-white/70">Patient Name</TableHead>
                <TableHead className="text-white/70">Summary</TableHead>
                <TableHead className="text-white/70">Follow-up</TableHead>
                <TableHead className="text-white/70">Urgency</TableHead>
                <TableHead className="text-white/70">Appointment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id} className="border-b border-mint/5">
                  <TableCell className="text-white">{case_.patientName}</TableCell>
                  <TableCell className="text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.summary}>
                      {case_.summary}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">{case_.followUp}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(case_.urgencyLevel)}`}>
                      {case_.urgencyLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        case_.appointmentMade ? 'bg-mint/10 text-mint' : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {case_.appointmentMade ? 'Yes' : 'No'}
                      </span>
                      {case_.appointmentDate && (
                        <span className="text-white/50 text-xs">
                          {case_.appointmentDate}
                        </span>
                      )}
                    </div>
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
