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

export function CalendarView({ view, date: initialDate, selectedDoctor: initialDoctor, onDateChange }: CalendarViewProps) {
  const [date, setDate] = useState<Date>(initialDate);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(initialDoctor);
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
  const hours = Array.from({ length: 13 }, (_, i) => i + 7);

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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value);
  };

  return (
    <div className="mt-4">
      <Card className="bg-forest-light/50 border-mint/10 p-4 relative overflow-hidden group transition-all duration-300">
        {/* Enhanced gradient overlay with animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-mint/5 via-transparent to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-mint/10 to-transparent opacity-25" />
        </div>

        {/* Calendar Header with frosted glass effect */}
        <div className="relative z-10 flex items-center justify-between mb-6 p-4 rounded-lg bg-forest-light/80 backdrop-blur-sm border border-mint/10 shadow-lg">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateChange(new Date())}
              className="text-white hover:text-mint border-mint/20 hover:bg-mint/10 transition-colors"
            >
              Today
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDateChange(addDays(date, -7))}
                className="text-white hover:text-mint"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDateChange(addDays(date, 7))}
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
            <Select value={selectedDoctor} onValueChange={handleDoctorChange}>
              <SelectTrigger className="w-[180px] bg-forest-light/80 border-mint/10 text-white backdrop-blur-sm">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent className="bg-forest-light/95 border-mint/10 backdrop-blur-sm">
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

        {/* Enhanced Calendar Grid */}
        <div className="grid grid-cols-8 gap-px bg-mint/5 rounded-lg overflow-hidden shadow-xl">
          {/* Time column with enhanced frosted glass effect */}
          <div className="bg-forest-light/80 backdrop-blur-sm border-r border-mint/10">
            <div className="h-12" /> {/* Spacer for alignment with day headers */}
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

          {/* Days header - Now floating above the grid */}
          <div className="col-span-7 grid grid-cols-7 gap-px">
            {eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }).map((day) => (
              <div
                key={day.toString()}
                className="p-3 bg-forest-light/95 backdrop-blur-sm border-b border-mint/10 text-center sticky top-0 z-20 shadow-lg"
              >
                <div className="text-sm font-medium text-white/70">
                  {format(day, "EEE")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {/* Days columns with enhanced appointment styling */}
          {eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }).map((day) => (
            <div key={day.toString()} className="bg-forest-light/50 backdrop-blur-sm">
              <div className="h-12" /> {/* Spacer for header alignment */}
              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="h-20 border-b border-mint/10 relative group hover:bg-mint/5 transition-colors"
                >
                  {/* Current time indicator with pulsing effect */}
                  {format(new Date(), "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                   new Date().getHours() === hour && (
                    <div className="absolute left-0 right-0 h-0.5 bg-mint/50 z-10">
                      <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-mint animate-pulse" />
                    </div>
                  )}

                  {/* Enhanced appointment cards */}
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
                            "cursor-pointer backdrop-blur-sm group-hover:scale-[1.02]",
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
          ))}
        </div>
      </Card>
    </div>
  );
}