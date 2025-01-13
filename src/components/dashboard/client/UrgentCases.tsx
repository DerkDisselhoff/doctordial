import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockUrgentCases = [
  {
    id: 1,
    patientName: "J. van der Berg",
    symptoms: "Severe chest pain",
    urgencyLevel: "U1",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 20, 14:30",
    actions: ["Refer to cardiology"],
    resolution: "Emergency care provided, cardiology referral"
  },
  {
    id: 2,
    patientName: "M. van der B.",
    symptoms: "High fever, difficulty breathing",
    urgencyLevel: "U2",
    appointmentStatus: "Pending",
    actions: ["Schedule urgent consultation"],
    resolution: "Prescribed medication, home care instructions"
  },
  {
    id: 3,
    patientName: "S. Johnson",
    symptoms: "Severe allergic reaction",
    urgencyLevel: "U1",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 22, 11:00",
    actions: ["Allergy specialist referral"],
    resolution: "Emergency care provided, allergy referral"
  },
  {
    id: 4,
    patientName: "L. Anderson",
    symptoms: "Acute abdominal pain",
    urgencyLevel: "U3",
    appointmentStatus: "Pending",
    actions: ["Schedule ultrasound"],
    resolution: "Diagnostic tests scheduled"
  },
  {
    id: 5,
    patientName: "M. Brown",
    symptoms: "Severe migraine, unresponsive to medication",
    urgencyLevel: "U2",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 21, 09:15",
    actions: ["Neurologist consultation"],
    resolution: "Emergency care provided, neurology referral"
  },
];

const getUrgencyColor = (level: string) => {
  switch (level) {
    case 'U1': return 'bg-red-100 text-red-700 border-red-200';
    case 'U2': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'U3': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'U4': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'U5': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function UrgentCases() {
  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white">Recent Patient Interactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-mint/10">
                <TableHead className="text-white/70">Patient</TableHead>
                <TableHead className="text-white/70">Symptoms</TableHead>
                <TableHead className="text-white/70">Urgency</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Actions</TableHead>
                <TableHead className="text-white/70">Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUrgentCases.map((case_) => (
                <TableRow key={case_.id} className="border-b border-mint/5">
                  <TableCell className="text-white">{case_.patientName}</TableCell>
                  <TableCell className="text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.symptoms}>
                      {case_.symptoms}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(case_.urgencyLevel)}`}>
                      {case_.urgencyLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        case_.appointmentStatus === 'Scheduled' 
                          ? 'bg-mint/10 text-mint' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {case_.appointmentStatus}
                      </span>
                      {case_.appointmentDate && (
                        <span className="text-white/50 text-xs">
                          {case_.appointmentDate}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {case_.actions.map((action, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 text-xs bg-mint/10 text-mint rounded-full"
                          title={action}
                        >
                          {action.length > 20 ? `${action.substring(0, 17)}...` : action}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">
                    <div className="max-w-[200px] truncate" title={case_.resolution}>
                      {case_.resolution}
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
