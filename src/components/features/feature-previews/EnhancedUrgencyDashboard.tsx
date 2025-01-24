import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  Calendar,
  ChartBar,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    symptoms: "Mild headache",
    urgencyLevel: "U5",
    appointmentStatus: "Advised",
    appointmentDate: null,
    actions: ["Call back if symptoms worsen"],
    resolution: "Self-care advice given"
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

const MenuItem = ({ icon: Icon, label, isActive = false }: { icon: any, label: string, isActive?: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors",
    isActive ? "bg-blue-light text-blue-dark" : "text-gray hover:bg-blue-light/5 hover:text-gray-dark"
  )}>
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, subtext }: { icon: any, label: string, value: string, subtext?: string }) => (
  <Card className="bg-white border-gray-muted p-4">
    <div className="flex items-start justify-between">
      <div className="text-left">
        <p className="text-gray text-sm">{label}</p>
        <h4 className="text-2xl font-bold text-gray-dark mt-1">{value}</h4>
        {subtext && <p className="text-xs text-gray-light mt-1">{subtext}</p>}
      </div>
      <div className="p-2 bg-blue-light rounded-lg">
        <Icon className="w-5 h-5 text-blue-dark" />
      </div>
    </div>
  </Card>
);

export function EnhancedUrgencyDashboard() {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Logo className="text-gray-dark" />
          <div className="border-l border-gray-muted pl-4 text-left">
            <h3 className="text-gray-dark font-medium">Centrum Medisch Centrum</h3>
            <p className="text-gray text-sm">Amsterdam, Netherlands</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-gray-dark">Dr. Anna van der Meer</p>
            <p className="text-gray">Practice Manager</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-2 space-y-2">
          <MenuItem icon={LayoutDashboard} label="Dashboard" isActive />
          <MenuItem icon={Users} label="Patients" />
          <MenuItem icon={PhoneCall} label="Calls" />
          <MenuItem icon={Calendar} label="Appointments" />
          <MenuItem icon={ChartBar} label="Analytics" />
        </div>

        {/* Main Content */}
        <div className="col-span-10 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard 
              icon={PhoneCall}
              label="Total Calls Today"
              value="47"
              subtext="+12% vs yesterday"
            />
            <StatCard 
              icon={Clock}
              label="Average Call Duration"
              value="3m 45s"
              subtext="-30s vs last week"
            />
            <StatCard 
              icon={Users}
              label="New Appointments"
              value="18"
              subtext="8 urgent cases"
            />
            <StatCard 
              icon={Calendar}
              label="Available Slots"
              value="12"
              subtext="Next 24 hours"
            />
          </div>

          {/* Table */}
          <Card className="bg-white border-gray-muted">
            <div className="p-4 border-b border-gray-muted">
              <h3 className="text-lg font-semibold text-gray-dark">Recent Patient Interactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-muted">
                    <th className="text-left p-4 text-gray whitespace-nowrap">Patient</th>
                    <th className="text-left p-4 text-gray whitespace-nowrap">Symptoms</th>
                    <th className="text-left p-4 text-gray whitespace-nowrap">Urgency</th>
                    <th className="text-left p-4 text-gray whitespace-nowrap">Status</th>
                    <th className="text-left p-4 text-gray whitespace-nowrap">Actions</th>
                    <th className="text-left p-4 text-gray whitespace-nowrap">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUrgentCases.map((case_) => (
                    <tr key={case_.id} className="border-b border-gray-muted">
                      <td className="p-4 text-gray-dark whitespace-nowrap">{case_.patientName}</td>
                      <td className="p-4 text-gray">
                        <div className="max-w-[200px] truncate" title={case_.symptoms}>
                          {case_.symptoms}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(case_.urgencyLevel)}`}>
                          {case_.urgencyLevel}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            case_.appointmentStatus === 'Scheduled' 
                              ? 'bg-blue-light text-blue-dark' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {case_.appointmentStatus}
                          </span>
                          {case_.appointmentDate && (
                            <span className="text-gray-light text-xs">
                              {case_.appointmentDate}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {case_.actions.map((action, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 text-xs bg-blue-light text-blue-dark rounded-full"
                              title={action}
                            >
                              {action.length > 20 ? `${action.substring(0, 17)}...` : action}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-gray">
                        <div className="max-w-[200px] truncate" title={case_.resolution}>
                          {case_.resolution}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}