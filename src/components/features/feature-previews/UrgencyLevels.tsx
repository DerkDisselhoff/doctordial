import { Card } from "@/components/ui/card";
import { Clock, AlertCircle, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Logo } from "@/components/Logo";

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
    patientName: "K. de V.",
    symptoms: "Mild allergic reaction",
    urgencyLevel: "U4",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 22, 11:00",
    actions: ["Follow-up required"],
    resolution: "Antihistamines prescribed"
  },
  {
    id: 4,
    patientName: "P. Jansen",
    symptoms: "Routine check-up",
    urgencyLevel: "U5",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 25, 15:45",
    actions: ["Regular follow-up"],
    resolution: "Annual health review completed"
  },
  {
    id: 5,
    patientName: "L. van den H.",
    symptoms: "Acute abdominal pain",
    urgencyLevel: "U3",
    appointmentStatus: "Scheduled",
    appointmentDate: "Mar 21, 09:15",
    actions: ["Schedule ultrasound"],
    resolution: "Diagnostic tests scheduled"
  },
  {
    id: 6,
    patientName: "R. de Boer",
    symptoms: "Mild headache, no other symptoms",
    urgencyLevel: "U5",
    appointmentStatus: "Advised",
    appointmentDate: null,
    actions: ["Call back if symptoms worsen"],
    resolution: "Self-care advice given, no immediate appointment needed"
  }
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

export function UrgencyLevels() {
  return (
    <TooltipProvider>
      <div className="p-3 md:p-6">
        <div className="flex items-center gap-2 md:gap-4 mb-4">
          <Logo className="text-white w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="overflow-x-auto -mx-3 md:mx-0">
          <div className="min-w-[640px] md:min-w-0">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-mint/10">
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Patient</th>
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Symptoms</th>
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Urgency</th>
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Appointment</th>
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Actions</th>
                  <th className="pb-2 md:pb-3 text-xs md:text-sm font-bold text-white/90 px-2 md:px-4 text-left">Resolution</th>
                </tr>
              </thead>
              <tbody>
                {mockUrgentCases.map((case_, index) => (
                  <tr 
                    key={case_.id} 
                    className={`border-b border-mint/5 ${
                      index % 2 === 0 ? 'bg-forest-light/30' : ''
                    }`}
                  >
                    <td className="py-2 md:py-4 text-xs md:text-sm text-white px-2 md:px-4 text-left">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            {case_.patientName}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Patient ID: {case_.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 md:py-4 text-xs md:text-sm text-white/70 px-2 md:px-4 text-left">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help truncate max-w-[80px] md:max-w-[200px]">
                            {case_.symptoms}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{case_.symptoms}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 md:py-4 px-2 md:px-4 text-left">
                      <span className={`inline-flex px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium border ${getUrgencyColor(case_.urgencyLevel)}`}>
                        {case_.urgencyLevel}
                      </span>
                    </td>
                    <td className="py-2 md:py-4 text-xs md:text-sm text-white/70 px-2 md:px-4 text-left">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                        <span className={`inline-flex px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs ${
                          case_.appointmentStatus === 'Scheduled' 
                            ? 'bg-mint/10 text-mint' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {case_.appointmentStatus}
                        </span>
                        {case_.appointmentDate && (
                          <span className="flex items-center gap-1 text-white/50 text-[10px] md:text-xs">
                            <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />
                            {case_.appointmentDate}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 md:py-4 text-xs md:text-sm px-2 md:px-4 text-left">
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {case_.actions.map((action, i) => (
                          <span 
                            key={i}
                            className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-mint/10 text-mint rounded-full whitespace-nowrap"
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 md:py-4 text-xs md:text-sm text-white/70 px-2 md:px-4 text-left">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help truncate max-w-[80px] md:max-w-[200px]">
                            {case_.resolution}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{case_.resolution}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}