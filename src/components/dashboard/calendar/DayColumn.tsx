import { format } from "date-fns";
import { AppointmentTooltip } from "./AppointmentTooltip";
import { cn } from "@/lib/utils";
import { getUrgencyColor } from "@/utils/urgencyUtils";

interface Appointment {
  id: string;
  time: string;
  patient: string;
  title: string;
  urgencyScore: string;
  duration: number;
  doctor: string;
  patientPhone?: string;
  patientEmail?: string;
  notes?: string;
}

interface DayColumnProps {
  day: Date;
  hours: number[];
  appointments: Appointment[];
  selectedDoctor: string;
}

export const DayColumn = ({ day, hours, appointments, selectedDoctor }: DayColumnProps) => {
  return (
    <div className="bg-surface">
      <div className="p-3 bg-surface border-b border-surface-input text-center">
        <div className="text-sm font-medium text-text-secondary">
          {format(day, "EEE")}
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {format(day, "d")}
        </div>
      </div>
      {hours.map((hour) => (
        <div
          key={`${day}-${hour}`}
          className="h-20 border-b border-surface-input relative group hover:bg-surface-secondary transition-colors"
        >
          {appointments
            .filter(apt => {
              const [aptHour] = apt.time.split(':').map(Number);
              return aptHour === hour && 
                     (selectedDoctor === "all" || apt.doctor === selectedDoctor);
            })
            .map((apt) => (
              <AppointmentTooltip 
                key={apt.id} 
                appointment={apt}
              >
                <div
                  className={cn(
                    "absolute left-0 right-0 mx-1 p-2 rounded-md border",
                    "transition-all duration-300 hover:translate-y-0.5 hover:shadow-lg",
                    "cursor-pointer bg-surface group-hover:scale-[1.02]",
                    getUrgencyColor(apt.urgencyScore)
                  )}
                  style={{
                    top: "4px",
                    minHeight: "40px",
                  }}
                >
                  <div className="text-xs font-medium">{apt.time}</div>
                  <div className="text-xs truncate">{apt.patient}</div>
                  <div className="text-xs opacity-75 truncate">
                    {apt.title}
                  </div>
                </div>
              </AppointmentTooltip>
            ))}
        </div>
      ))}
    </div>
  );
};