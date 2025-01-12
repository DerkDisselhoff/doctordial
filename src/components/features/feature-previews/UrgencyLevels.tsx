import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar, Clock, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";

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

type SortConfig = {
  key: keyof typeof mockUrgentCases[0];
  direction: 'asc' | 'desc';
} | null;

export function UrgencyLevels() {
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: keyof typeof mockUrgentCases[0]) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedCases = [...mockUrgentCases].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCases = sortedCases.filter(
    case_ => selectedUrgency === "all" || case_.urgencyLevel === selectedUrgency
  );

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Urgent Cases</h3>
        <div className="flex gap-2">
          <Button size="sm" className={`bg-forest hover:bg-forest-light text-white ${selectedUrgency === "all" ? 'ring-2 ring-mint' : ''}`} onClick={() => setSelectedUrgency("all")}>
            All
          </Button>
          <Button size="sm" className={`bg-red-500 hover:bg-red-600 text-white ${selectedUrgency === "U1" ? 'ring-2 ring-mint' : ''}`} onClick={() => setSelectedUrgency("U1")}>
            U1
          </Button>
          <Button size="sm" className={`bg-orange-500 hover:bg-orange-600 text-white ${selectedUrgency === "U2" ? 'ring-2 ring-mint' : ''}`} onClick={() => setSelectedUrgency("U2")}>
            U2
          </Button>
          <Button size="sm" className={`bg-yellow-500 hover:bg-yellow-600 text-white ${selectedUrgency === "U3" ? 'ring-2 ring-mint' : ''}`} onClick={() => setSelectedUrgency("U3")}>
            U3
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-mint/10">
              <th className="pb-3 text-sm font-bold text-white/90 text-left cursor-pointer hover:text-white" onClick={() => handleSort('patientName')}>
                <div className="flex items-center gap-1">
                  Patient Info <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="pb-3 text-sm font-bold text-white/90 text-left cursor-pointer hover:text-white" onClick={() => handleSort('urgencyLevel')}>
                <div className="flex items-center gap-1">
                  Urgency <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="pb-3 text-sm font-bold text-white/90 text-left">Status & Actions</th>
              <th className="pb-3 text-sm font-bold text-white/90 text-left">Resolution</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((case_, index) => (
              <tr 
                key={case_.id} 
                className={`border-b border-mint/5 ${index % 2 === 0 ? 'bg-forest-light/30' : ''}`}
              >
                <td className="py-4 text-sm text-white border-l-2 border-mint/20 pl-4">
                  <Tooltip content={`${case_.summary}`}>
                    <div className="cursor-help">
                      <div className="font-medium">{case_.patientName}</div>
                      <div className="text-white/70 text-xs mt-1 truncate max-w-[300px]">
                        {case_.summary}
                      </div>
                    </div>
                  </Tooltip>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(case_.urgencyLevel)}`}>
                    {case_.urgencyLevel}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {case_.appointmentMade ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-white/70 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {case_.appointmentDate}
                          </span>
                        </>
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-white/70 text-xs">
                      {case_.followUp}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-white/70">
                  <Tooltip content={case_.resolution}>
                    <div className="cursor-help truncate max-w-[250px]">
                      {case_.resolution}
                    </div>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}