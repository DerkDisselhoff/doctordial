import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface CalendarViewProps {
  view: "month" | "week" | "day";
  date: Date;
  selectedDoctor: string;
  onDateChange: (date: Date) => void;
}

export function CalendarView({ view, date, selectedDoctor, onDateChange }: CalendarViewProps) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  // Mock appointments data
  const appointments = [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Regular Check-up",
      patient: "John Smith",
      doctor: "1",
      date: new Date(2024, 3, 15, 9, 0),
      urgentiescore: "U4",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      title: "Follow-up",
      patient: "Emma Johnson",
      doctor: "2",
      date: new Date(2024, 3, 15, 14, 30),
      urgentiescore: "U2",
    },
    // Add more mock appointments as needed
  ];

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

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const renderDayContent = (day: Date) => {
    const dayAppointments = appointments.filter(
      app => format(app.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
      (selectedDoctor === "all" || app.doctor === selectedDoctor)
    );

    return dayAppointments.length > 0 ? (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <Badge variant="outline" className={getUrgencyColor(dayAppointments[0].urgentiescore)}>
          {dayAppointments.length} appt{dayAppointments.length > 1 ? "s" : ""}
        </Badge>
      </div>
    ) : null;
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
            DayContent: ({ day }) => (
              <div className="relative w-full h-full min-h-[60px] p-1">
                <span>{format(day, "d")}</span>
                {renderDayContent(day)}
              </div>
            ),
          }}
        />
      </div>
    );
  }

  // Week view
  if (view === "week") {
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

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
                  format(app.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                  (selectedDoctor === "all" || app.doctor === selectedDoctor)
              )
              .map((app) => (
                <div
                  key={app.id}
                  className="mb-2 p-2 rounded bg-mint/10 cursor-pointer hover:bg-mint/20"
                  onClick={() => navigate(`/dashboard/appointments/${app.id}`)}
                >
                  <div className="text-xs font-medium text-white">
                    {format(app.date, "HH:mm")}
                  </div>
                  <div className="text-xs text-white/60">{app.patient}</div>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 ${getUrgencyColor(app.urgentiescore)}`}
                  >
                    {app.urgentiescore}
                  </Badge>
                </div>
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
                    format(app.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
                    new Date(app.date).getHours() === hour &&
                    (selectedDoctor === "all" || app.doctor === selectedDoctor)
                )
                .map((app) => (
                  <div
                    key={app.id}
                    className="p-2 rounded bg-mint/10 cursor-pointer hover:bg-mint/20"
                    onClick={() => navigate(`/dashboard/appointments/${app.id}`)}
                  >
                    <div className="text-sm font-medium text-white">{app.patient}</div>
                    <div className="text-xs text-white/60">{app.title}</div>
                    <Badge 
                      variant="outline" 
                      className={`mt-1 ${getUrgencyColor(app.urgentiescore)}`}
                    >
                      {app.urgentiescore}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}