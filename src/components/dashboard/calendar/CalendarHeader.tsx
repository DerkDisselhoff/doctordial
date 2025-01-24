import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewAppointmentModal } from "./NewAppointmentModal";

interface CalendarHeaderProps {
  date: Date;
  selectedDoctor: string;
  onDateChange: (date: Date) => void;
  onDoctorChange: (value: string) => void;
}

export const CalendarHeader = ({
  date,
  selectedDoctor,
  onDateChange,
  onDoctorChange,
}: CalendarHeaderProps) => {
  return (
    <div className="relative z-10 flex items-center justify-between mb-6 p-4 rounded-lg bg-surface border border-surface-input shadow-sm">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange(new Date())}
          className="text-text-primary hover:text-primary border-surface-input hover:bg-surface-secondary transition-colors"
        >
          Today
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDateChange(new Date(date.setDate(date.getDate() - 7)))}
            className="text-text-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDateChange(new Date(date.setDate(date.getDate() + 7)))}
            className="text-text-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold text-text-primary">
          {format(date, "MMMM yyyy")}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={selectedDoctor} onValueChange={onDoctorChange}>
          <SelectTrigger className="w-[180px] bg-surface border-surface-input text-text-primary">
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
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
  );
};