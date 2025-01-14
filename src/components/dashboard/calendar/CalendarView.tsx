import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayContentProps } from "react-day-picker";
import { AppointmentTooltip } from "./AppointmentTooltip";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewAppointmentModal } from "./NewAppointmentModal";

interface CalendarViewProps {
  view: "month" | "week" | "day";
  date: Date;
  selectedDoctor: string;
  onDateChange: (date: Date) => void;
}

export function CalendarView({ view, date, selectedDoctor, onDateChange }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  // Mock appointments data
  const appointments = [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Regular Check-up",
      patient: "John Smith",
      time: "09:00",
      duration: 30,
      doctor: "1",
      urgencyScore: "U4",
      patientPhone: "+1234567890",
      patientEmail: "john@example.com",
      notes: "Regular check-up appointment",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      title: "Follow-up",
      patient: "Emma Johnson",
      time: "14:30",
      duration: 45,
      doctor: "2",
      urgencyScore: "U2",
      patientPhone: "+0987654321",
      patientEmail: "emma@example.com",
      notes: "Follow-up after previous treatment",
    },
  ];

  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

  const getUrgencyColor = (score: string) => {
    switch (score) {
      case "U1": return "bg-red-500/20 border-red-500/30 text-red-500";
      case "U2": return "bg-orange-500/20 border-orange-500/30 text-orange-500";
      case "U3": return "bg-yellow-500/20 border-yellow-500/30 text-yellow-500";
      case "U4": return "bg-blue-500/20 border-blue-500/30 text-blue-500";
      case "U5": return "bg-green-500/20 border-green-500/30 text-green-500";
      default: return "bg-gray-500/20 border-gray-500/30 text-gray-500";
    }
  };

  const getAppointmentsForSlot = (day: Date, hour: number) => {
    return appointments.filter(
      app => {
        const aptDate = new Date(app.day);
        return format(aptDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
          Math.floor(aptDate.getHours()) === hour &&
          (selectedDoctor === "all" || app.doctor === selectedDoctor);
      }
    );
  };

  const handleAppointmentCreated = () => {
    // Refresh appointments data
    // In a real application, this would fetch updated data from the backend
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const renderDayContent = (props: DayContentProps) => {
    const dayAppointments = appointments.filter(
      app => format(new Date(), "yyyy-MM-dd") === format(props.date, "yyyy-MM-dd") &&
      (selectedDoctor === "all" || app.doctor === selectedDoctor)
    );

    return (
      <div className="relative w-full h-full min-h-[60px] p-1">
        <span>{format(props.date, "d")}</span>
        {dayAppointments.length > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <Badge variant="outline" className={getUrgencyColor(dayAppointments[0].urgencyScore)}>
              {dayAppointments.length} appt{dayAppointments.length > 1 ? "s" : ""}
            </Badge>
          </div>
        ) : null}
      </div>
    );
  };

  if (view === "month") {
    return (
      <div className="mt-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="bg-forest-light/50 border-mint/10 rounded-md text-white"
          components={{
            DayContent: renderDayContent
          }}
        />
      </div>
    );
  }

  // Week view
  if (view === "week") {
    return (
      <div className="mt-4 grid grid-cols-7 gap-2">
        {days.map((day) => (
          <Card key={day.toString()} className="p-2 bg-forest-light/50 border-mint/10">
            <div className="text-sm font-medium text-white mb-2">
              {format(day, "EEE d")}
            </div>
            {appointments
              .filter(
                app => 
                  format(new Date(), "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                  (selectedDoctor === "all" || app.doctor === selectedDoctor)
              )
              .map((app) => (
                <AppointmentTooltip key={app.id} appointment={app}>
                  <div className="mb-2 p-2 rounded bg-mint/10 cursor-pointer hover:bg-mint/20">
                    <div className="text-xs font-medium text-white">
                      {app.time}
                    </div>
                    <div className="text-xs text-white/60">{app.patient}</div>
                    <Badge 
                      variant="outline" 
                      className={getUrgencyColor(app.urgencyScore)}
                    >
                      {app.urgencyScore}
                    </Badge>
                  </div>
                </AppointmentTooltip>
              ))}
          </Card>
        ))}
      </div>
    );
  }

  // Day view
  return (
    <div className="mt-4 space-y-4">
      {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => (
        <Card key={hour} className="p-4 bg-forest-light/50 border-mint/10">
          <div className="flex items-start">
            <div className="w-20 text-sm font-medium text-white">
              {`${hour}:00`}
            </div>
            <div className="flex-1">
              {appointments
                .filter(
                  app => 
                    format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
                    parseInt(app.time.split(":")[0]) === hour &&
                    (selectedDoctor === "all" || app.doctor === selectedDoctor)
                )
                .map((app) => (
                  <AppointmentTooltip key={app.id} appointment={app}>
                    <div className="p-2 rounded bg-mint/10 cursor-pointer hover:bg-mint/20">
                      <div className="text-sm font-medium text-white">{app.patient}</div>
                      <div className="text-xs text-white/60">{app.title}</div>
                      <Badge 
                        variant="outline" 
                        className={getUrgencyColor(app.urgencyScore)}
                      >
                        {app.urgencyScore}
                      </Badge>
                    </div>
                  </AppointmentTooltip>
                ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
