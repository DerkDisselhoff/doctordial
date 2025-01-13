import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarView } from "@/components/dashboard/calendar/CalendarView";
import { AppointmentQuickView } from "@/components/dashboard/calendar/AppointmentQuickView";
import { DoctorSchedule } from "@/components/dashboard/calendar/DoctorSchedule";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");

  const doctors = [
    { id: "1", name: "Dr. Sarah Johnson" },
    { id: "2", name: "Dr. Michael Chen" },
    { id: "3", name: "Dr. Emma Williams" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white">Practice Calendar</h1>
        <p className="text-white/60">Manage appointments and schedules</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card className="bg-forest-light/50 border-mint/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-white">Calendar</CardTitle>
                <div className="text-sm text-white/60">
                  {format(date, "MMMM yyyy")}
                </div>
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
                <Button variant="outline" size="icon" className="text-white">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
                <TabsList className="bg-forest-light/50 border-mint/10">
                  <TabsTrigger value="month" className="text-white data-[state=active]:bg-mint/10">
                    Month
                  </TabsTrigger>
                  <TabsTrigger value="week" className="text-white data-[state=active]:bg-mint/10">
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="day" className="text-white data-[state=active]:bg-mint/10">
                    Day
                  </TabsTrigger>
                </TabsList>
                <CalendarView 
                  view={view}
                  date={date}
                  selectedDoctor={selectedDoctor}
                  onDateChange={setDate}
                />
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <AppointmentQuickView date={date} selectedDoctor={selectedDoctor} />
          <DoctorSchedule doctors={doctors} date={date} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;