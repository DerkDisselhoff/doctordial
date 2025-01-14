import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayContentProps } from "react-day-picker";
import { AppointmentTooltip } from "@/components/dashboard/calendar/AppointmentTooltip";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewAppointmentModal } from "@/components/dashboard/calendar/NewAppointmentModal";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleAppointmentClick = (appointment: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
        <p className="text-white/60">Manage appointments and schedules</p>
      </div>

      <Card className="bg-forest-light/50 border-mint/10 p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDate(new Date())}
              className="text-white hover:text-mint"
            >
              Today
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(d => addDays(d, -7))}
                className="text-white hover:text-mint"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(d => addDays(d, 7))}
                className="text-white hover:text-mint"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-lg font-semibold text-white">
              {format(date, "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="w-[180px] bg-forest-light border-mint/10 text-white">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/10">
                <SelectItem value="all">All Doctors</SelectItem>
                {[
                  { id: "1", name: "Dr. Sarah Johnson" },
                  { id: "2", name: "Dr. Michael Chen" },
                  { id: "3", name: "Dr. Emma Williams" },
                ].map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NewAppointmentModal
              selectedDate={date}
              selectedDoctor={selectedDoctor}
              onAppointmentCreated={() => {}}
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-px bg-mint/10 rounded-lg overflow-hidden">
          {/* Time column */}
          <div className="bg-forest-light">
            <div className="h-12" />
            {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-mint/10 px-2 py-1"
              >
                <span className="text-xs text-white/60">
                  {format(new Date().setHours(hour, 0), "h:mm a")}
                </span>
              </div>
            ))}
          </div>

          {/* Days columns */}
          {eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }).map((day) => (
            <div key={day.toString()} className="bg-forest-light">
              <div className="h-12 border-b border-mint/10 p-2 sticky top-0 bg-forest-light">
                <div className="text-sm font-medium text-white">
                  {format(day, "EEE")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {format(day, "d")}
                </div>
              </div>

              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="h-20 border-b border-mint/10 relative group"
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
                        open={selectedAppointment?.id === apt.id && dialogOpen}
                        onOpenChange={(open) => {
                          setDialogOpen(open);
                          if (!open) setSelectedAppointment(null);
                        }}
                      >
                        <div
                          className={cn(
                            "absolute left-0 right-0 mx-1 p-2 rounded-md border cursor-pointer",
                            "transition-all duration-200 hover:translate-y-0.5",
                            getUrgencyColor(apt.urgencyScore)
                          )}
                          style={{
                            top: "4px",
                            minHeight: "40px",
                          }}
                          onClick={(e) => handleAppointmentClick(apt, e)}
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
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CalendarPage;
