import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockUrgentCases = [
  {
    id: 1,
    patientName: "Emma Thompson",
    summary: "Severe chest pain",
    urgencyLevel: "U1",
    appointmentMade: true,
    appointmentDate: "2024-03-20T14:30:00",
  },
  {
    id: 2,
    patientName: "James Wilson",
    summary: "High fever",
    urgencyLevel: "U2",
    appointmentMade: false,
  },
  {
    id: 3,
    patientName: "Sarah Davis",
    summary: "Allergic reaction",
    urgencyLevel: "U1",
    appointmentMade: true,
    appointmentDate: "2024-03-22T11:00:00",
  },
];

export function UrgencyLevels() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Urgent Cases</h3>
        <div className="flex gap-2">
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">U1</Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">U2</Button>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">U3</Button>
        </div>
      </div>
      <div className="space-y-3">
        {mockUrgentCases.map((case_) => (
          <div
            key={case_.id}
            className="p-4 rounded-lg bg-forest border border-mint/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-white">{case_.patientName}</p>
                <p className="text-sm text-white/70">{case_.summary}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                case_.urgencyLevel === 'U1' 
                  ? 'bg-red-100 text-red-700'
                  : case_.urgencyLevel === 'U2'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {case_.urgencyLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}