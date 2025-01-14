import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Phone, Mail, FileText, AlertCircle } from "lucide-react";

interface AppointmentTooltipProps {
  appointment: {
    id: string;
    title: string;
    patient: string;
    time: string;
    duration: number;
    doctor: string;
    urgencyScore: string;
    patientPhone?: string;
    patientEmail?: string;
    notes?: string;
  };
  children: React.ReactNode;
}

export function AppointmentTooltip({ appointment, children }: AppointmentTooltipProps) {
  const getUrgencyColor = (score: string) => {
    switch (score) {
      case "U1": return "text-red-500 border-red-500/20";
      case "U2": return "text-orange-500 border-orange-500/20";
      case "U3": return "text-yellow-500 border-yellow-500/20";
      case "U4": return "text-blue-500 border-blue-500/20";
      case "U5": return "text-green-500 border-green-500/20";
      default: return "text-gray-500 border-gray-500/20";
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-forest-light border-mint/10">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-semibold text-white">{appointment.title}</h4>
            <p className="text-sm text-white/70">{appointment.patient}</p>
          </div>
          <Badge variant="outline" className={getUrgencyColor(appointment.urgencyScore)}>
            {appointment.urgencyScore}
          </Badge>
        </div>
        
        {appointment.patientPhone && (
          <div className="flex items-center mt-2 text-white/70">
            <Phone className="h-4 w-4 mr-2 text-mint" />
            <span className="text-sm">{appointment.patientPhone}</span>
          </div>
        )}
        
        {appointment.patientEmail && (
          <div className="flex items-center mt-2 text-white/70">
            <Mail className="h-4 w-4 mr-2 text-mint" />
            <span className="text-sm">{appointment.patientEmail}</span>
          </div>
        )}
        
        {appointment.notes && (
          <div className="mt-2">
            <div className="flex items-center text-white">
              <FileText className="h-4 w-4 mr-2 text-mint" />
              <span className="text-sm font-medium">Notes</span>
            </div>
            <p className="text-sm text-white/70 mt-1">{appointment.notes}</p>
          </div>
        )}
        
        <div className="flex items-center mt-2 text-white/70">
          <AlertCircle className="h-4 w-4 mr-2 text-mint" />
          <span className="text-sm">Duration: {appointment.duration} minutes</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}