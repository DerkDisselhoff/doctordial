import { useState } from "react";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { CalendarHeader } from "./CalendarHeader";
import { TimeColumn } from "./TimeColumn";
import { DayColumn } from "./DayColumn";

interface CalendarViewProps {
  view: "month" | "week" | "day";
  date: Date;
  selectedDoctor: string;
  onDateChange: (date: Date) => void;
}

export function CalendarView({ 
  view, 
  date: initialDate, 
  selectedDoctor: initialDoctor, 
  onDateChange 
}: CalendarViewProps) {
  const [date, setDate] = useState<Date>(initialDate);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(initialDoctor);

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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value);
  };

  return (
    <div className="mt-4">
      <div className="dashboard-card relative overflow-hidden">
        <CalendarHeader
          date={date}
          selectedDoctor={selectedDoctor}
          onDateChange={handleDateChange}
          onDoctorChange={handleDoctorChange}
        />

        <div className="grid grid-cols-8 gap-px bg-surface-input rounded-lg overflow-hidden shadow-sm">
          <TimeColumn hours={hours} />
          
          <div className="col-span-7 grid grid-cols-7 gap-px">
            {days.map((day) => (
              <DayColumn
                key={day.toString()}
                day={day}
                hours={hours}
                appointments={appointments}
                selectedDoctor={selectedDoctor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}