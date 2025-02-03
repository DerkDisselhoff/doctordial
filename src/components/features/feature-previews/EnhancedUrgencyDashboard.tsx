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
import { BookDemoForm } from "@/components/BookDemoForm";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Expanded dataset with more rows
const mockUrgentCases = [
  {
    id: 2,
    patientName: "M. van der B.",
    symptoms: "High fever, severe headache",
    urgencyLevel: "U2",
    appointmentStatus: "Pending",
    actions: ["Urgent consultation"],
    resolution: "Prescribed medication"
  },
  {
    id: 3,
    patientName: "K. de V.",
    symptoms: "Mild allergic reaction",
    urgencyLevel: "U4",
    appointmentStatus: "Scheduled",
    appointmentDate: "11:00",
    actions: ["Follow-up"],
    resolution: "Antihistamines prescribed"
  },
  {
    id: 4,
    patientName: "L. van den H.",
    symptoms: "Abdominal pain",
    urgencyLevel: "U3",
    appointmentStatus: "Scheduled",
    appointmentDate: "09:15",
    actions: ["Schedule tests"],
    resolution: "Tests scheduled"
  },
  {
    id: 5,
    patientName: "P. Jansen",
    symptoms: "Persistent cough",
    urgencyLevel: "U3",
    appointmentStatus: "Scheduled",
    appointmentDate: "14:45",
    actions: ["Consultation"],
    resolution: "Referred to specialist"
  },
  {
    id: 6,
    patientName: "R. de Boer",
    symptoms: "Lower back pain",
    urgencyLevel: "U4",
    appointmentStatus: "Pending",
    actions: ["Physical exam"],
    resolution: "Awaiting appointment"
  },
  {
    id: 7,
    patientName: "T. Bakker",
    symptoms: "Ear infection",
    urgencyLevel: "U3",
    appointmentStatus: "Scheduled",
    appointmentDate: "10:30",
    actions: ["Prescribe antibiotics"],
    resolution: "Treatment started"
  },
  {
    id: 8,
    patientName: "W. Visser",
    symptoms: "Skin rash",
    urgencyLevel: "U4",
    appointmentStatus: "Scheduled",
    appointmentDate: "15:15",
    actions: ["Dermatology consult"],
    resolution: "Treatment plan created"
  }
];

const getUrgencyColor = (level: string) => {
  switch (level) {
    case 'U2': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'U3': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'U4': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'U5': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const MenuItem = ({ icon: Icon, label, isActive = false }: { icon: any, label: string, isActive?: boolean }) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
    isActive ? "bg-blue-light text-blue-dark" : "text-gray hover:bg-blue-light/5 hover:text-gray-dark"
  )}>
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, subtext }: { icon: any, label: string, value: string, subtext?: string }) => (
  <Card className="bg-white border-gray-muted p-3">
    <div className="flex items-start justify-between">
      <div className="text-left">
        <p className="text-gray text-sm">{label}</p>
        <h4 className="text-xl font-bold text-gray-dark mt-1">{value}</h4>
        {subtext && <p className="text-sm text-gray-light mt-1">{subtext}</p>}
      </div>
      <div className="p-2 bg-blue-light rounded-lg">
        <Icon className="w-4 h-4 text-blue-dark" />
      </div>
    </div>
  </Card>
);

export function EnhancedUrgencyDashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">      
      <div className="container mx-auto max-w-7xl bg-gradient-to-br from-mint-light/90 to-blue-light/90 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-mint/20">
        <div className="flex flex-col items-start gap-3 mb-4">
          <h2 className="text-gray-dark text-2xl md:text-3xl font-semibold">
            {t('features.callsTitle') || 'Van inkomende gesprekken tot triage en opvolgingen'}
          </h2>
          <p className="text-gray text-base md:text-lg leading-relaxed">
            {t('features.callsSubtitle')}
          </p>
          <BookDemoForm>
            <Button 
              className="bg-blue hover:bg-blue/90 text-gray-dark font-medium transition-colors duration-300 rounded-full"
            >
              Demo aanvragen
            </Button>
          </BookDemoForm>
        </div>
        
        <div className="p-4 bg-white rounded-xl border border-gray-muted">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Logo className="text-gray-dark w-8 h-8" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-gray-dark text-sm font-medium">Dr. Anna van der Meer</p>
                <p className="text-gray text-xs">Practice Manager</p>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-2 space-y-1">
              <MenuItem icon={LayoutDashboard} label="Dashboard" isActive />
              <MenuItem icon={Users} label="Patients" />
              <MenuItem icon={PhoneCall} label="Calls" />
              <MenuItem icon={Calendar} label="Appointments" />
              <MenuItem icon={ChartBar} label="Analytics" />
            </div>

            {/* Main Content */}
            <div className="col-span-10 space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-3">
                <StatCard 
                  icon={PhoneCall}
                  label="Total Calls Today"
                  value="47"
                  subtext="+12% vs yesterday"
                />
                <StatCard 
                  icon={Clock}
                  label="Average Duration"
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
                <div className="p-3 border-b border-gray-muted">
                  <h3 className="text-sm font-semibold text-gray-dark">Recent Patient Interactions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-muted">
                        <th className="text-left p-2 text-xs font-medium text-gray">Patient</th>
                        <th className="text-left p-2 text-xs font-medium text-gray">Symptoms</th>
                        <th className="text-left p-2 text-xs font-medium text-gray">Urgency</th>
                        <th className="text-left p-2 text-xs font-medium text-gray">Status</th>
                        <th className="text-left p-2 text-xs font-medium text-gray">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {mockUrgentCases.map((case_) => (
                        <tr key={case_.id} className="border-b border-gray-muted hover:bg-gray-50">
                          <td className="p-2 text-gray-dark">{case_.patientName}</td>
                          <td className="p-2 text-gray">
                            <div className="max-w-[140px] truncate" title={case_.symptoms}>
                              {case_.symptoms}
                            </div>
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getUrgencyColor(case_.urgencyLevel)}`}>
                              {case_.urgencyLevel}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
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
                          <td className="p-2">
                            <div className="flex gap-1">
                              {case_.actions.map((action, i) => (
                                <span 
                                  key={i}
                                  className="px-2 py-0.5 text-xs bg-blue-light text-blue-dark rounded-full"
                                  title={action}
                                >
                                  {action}
                                </span>
                              ))}
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
      </div>
    </div>
  );
}
