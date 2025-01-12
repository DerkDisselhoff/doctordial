import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const mockUrgentCases = [
  {
    id: 1,
    patientName: "Emma Thompson",
    summary: "Severe chest pain, referred to emergency",
    followUp: "Schedule cardiology consultation",
    urgencyLevel: "U1",
    appointmentMade: true,
    appointmentDate: "Mar 20, 14:30",
    resolution: "Referred to cardiology, emergency care provided"
  },
  {
    id: 2,
    patientName: "James Wilson",
    summary: "High fever and difficulty breathing",
    followUp: "Monitor symptoms, follow-up in 24h",
    urgencyLevel: "U2",
    appointmentMade: false,
    resolution: "Prescribed medication, home care instructions given"
  },
  {
    id: 3,
    patientName: "Sarah Davis",
    summary: "Severe allergic reaction",
    followUp: "Allergy specialist referral",
    urgencyLevel: "U1",
    appointmentMade: true,
    appointmentDate: "Mar 22, 11:00",
    resolution: "Emergency antihistamines administered, specialist referral"
  },
  {
    id: 4,
    patientName: "Michael Brown",
    summary: "Acute abdominal pain",
    followUp: "Schedule ultrasound",
    urgencyLevel: "U3",
    appointmentMade: true,
    appointmentDate: "Mar 21, 09:15",
    resolution: "Diagnostic tests scheduled, pain management plan"
  },
  {
    id: 5,
    patientName: "Lisa Anderson",
    summary: "Severe migraine, unresponsive to medication",
    followUp: "Neurologist consultation",
    urgencyLevel: "U2",
    appointmentMade: false,
    resolution: "Alternative medication prescribed, follow-up scheduled"
  },
];

export function UrgencyLevels() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Urgent Cases</h3>
        <div className="flex gap-2">
          <Button size="sm" className="bg-forest hover:bg-forest-light text-white">All</Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">U1</Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">U2</Button>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">U3</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-mint/10">
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Patient Name</th>
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Summary</th>
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Follow-up</th>
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Urgency</th>
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Appointment</th>
              <th className="pb-3 text-sm font-medium text-white/70 text-left">Resolution</th>
            </tr>
          </thead>
          <tbody>
            {mockUrgentCases.map((case_) => (
              <tr key={case_.id} className="border-b border-mint/5">
                <td className="py-3 text-sm text-white border-l-2 border-mint/20 pl-4 text-left">
                  {case_.patientName}
                </td>
                <td className="py-3 text-sm text-white/70 text-left">
                  {case_.summary}
                </td>
                <td className="py-3 text-sm text-white/70 text-left">
                  {case_.followUp}
                </td>
                <td className="py-3 text-left">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.urgencyLevel === 'U1' 
                      ? 'bg-red-100 text-red-700'
                      : case_.urgencyLevel === 'U2'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {case_.urgencyLevel}
                  </span>
                </td>
                <td className="py-3 text-left">
                  {case_.appointmentMade ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-white/70">{case_.appointmentDate}</span>
                    </div>
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </td>
                <td className="py-3 text-sm text-white/70 text-left">
                  {case_.resolution}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}