import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewAppointmentModal } from "@/components/dashboard/calendar/NewAppointmentModal";
import { AppointmentTooltip } from "@/components/dashboard/calendar/AppointmentTooltip";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendarPage = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");

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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white">{t("calendar.title")}</h1>
        <p className="text-white/60">{t("calendar.subtitle")}</p>
      </div>

      <div className="dashboard-card relative overflow-hidden group transition-all duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-mint/5 via-transparent to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-mint/10 to-transparent opacity-25" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-6 p-4 rounded-lg bg-forest-light/80 backdrop-blur-sm border border-mint/10 shadow-lg">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDate(new Date())}
              className="text-white hover:text-mint border-mint/20 hover:bg-mint/10 transition-colors"
            >
              {t("calendar.today")}
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
              <SelectTrigger className="w-[180px] bg-forest-light/80 border-mint/10 text-white backdrop-blur-sm">
                <SelectValue placeholder={t("calendar.allDoctors")} />
              </SelectTrigger>
              <SelectContent className="bg-forest-light/95 border-mint/10 backdrop-blur-sm">
                <SelectItem value="all">{t("calendar.allDoctors")}</SelectItem>
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

        <div className="grid grid-cols-8 gap-px bg-mint/5 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-forest-light/80 backdrop-blur-sm border-r border-mint/10">
            <div className="h-12" /> {/* Spacer for header alignment */}
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

            {eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }).map((day) => (
              <div key={day.toString()} className="bg-forest-light/50 backdrop-blur-sm">
                <div className="h-12" /> {/* Spacer for header alignment */}
                {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                  <div
                    key={`${day}-${hour}`}
                    className="h-20 border-b border-mint/10 relative group hover:bg-mint/5 transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
