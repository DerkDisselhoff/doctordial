import { useState } from "react";
import { format, addHours, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewAppointmentModal } from "@/components/dashboard/calendar/NewAppointmentModal";
import { AppointmentTooltip } from "@/components/dashboard/calendar/AppointmentTooltip";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");

  const doctors = [
    { id: "1", name: "Dr. Sarah Johnson" },
    { id: "2", name: "Dr. Michael Chen" },
    { id: "3", name: "Dr. Emma Williams" },
  ];

  // Mock appointments data with extended information
  const appointments = [
    {
      id: "1",
      title: "Regular Check-up",
      patient: "John Smith",
      time: "09:00",
      duration: 30,
      doctor: "1",
      urgencyScore: "U3",
      patientPhone: "+31 6 12345678",
      patientEmail: "john.smith@email.com",
      notes: "Patient mentioned recurring headaches",
    },
    {
      id: "2",
      title: "Follow-up Consultation",
      patient: "Emma Johnson",
      time: "11:00",
      duration: 45,
      doctor: "2",
      urgencyScore: "U2",
      patientPhone: "+31 6 23456789",
      patientEmail: "emma.j@email.com",
      notes: "Post-surgery check-up",
    },
    {
      id: "3",
      title: "Emergency Visit",
      patient: "Michael Brown",
      time: "14:30",
      duration: 60,
      doctor: "1",
      urgencyScore: "U1",
      patientPhone: "+31 6 34567890",
      patientEmail: "m.brown@email.com",
      notes: "Severe chest pain",
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

  const getAppointmentsForSlot = (hour: number) => {
    return appointments.filter(apt => {
      const [aptHour] = apt.time.split(':').map(Number);
      return aptHour === hour && (selectedDoctor === "all" || apt.doctor === selectedDoctor);
    });
  };

  const handleAppointmentCreated = () => {
    // Refresh appointments data
    // In a real application, this would fetch updated data from the backend
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
                onClick={() => setDate(d => addHours(d, -24 * 7))}
                className="text-white hover:text-mint"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(d => addHours(d, 24 * 7))}
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
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NewAppointmentModal
              selectedDate={date}
              selectedDoctor={selectedDoctor}
              onAppointmentCreated={handleAppointmentCreated}
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-px bg-mint/10 rounded-lg overflow-hidden">
          {/* Time column */}
          <div className="bg-forest-light">
            <div className="h-12" />
            {hours.map((hour) => (
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
          {days.map((day) => (
            <div key={day.toString()} className="bg-forest-light">
              {/* Day header */}
              <div className="h-12 border-b border-mint/10 p-2 sticky top-0 bg-forest-light">
                <div className="text-sm font-medium text-white">
                  {format(day, "EEE")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {format(day, "d")}
                </div>
              </div>

              {/* Time slots */}
              {hours.map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="h-20 border-b border-mint/10 relative group"
                >
                  {getAppointmentsForSlot(hour).map((apt) => (
                    <AppointmentTooltip key={apt.id} appointment={apt}>
                      <div
                        className={cn(
                          "absolute left-0 right-0 mx-1 p-2 rounded-md border",
                          "cursor-pointer transition-all duration-200 hover:translate-y-0.5",
                          getUrgencyColor(apt.urgencyScore)
                        )}
                        style={{
                          top: "4px",
                          minHeight: "40px",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
