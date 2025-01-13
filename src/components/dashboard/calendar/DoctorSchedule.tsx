import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Doctor {
  id: string;
  name: string;
}

interface DoctorScheduleProps {
  doctors: Doctor[];
  date: Date;
}

export function DoctorSchedule({ doctors, date }: DoctorScheduleProps) {
  // Mock schedule data
  const schedules = {
    "1": { start: "09:00", end: "17:00", status: "available" },
    "2": { start: "10:00", end: "18:00", status: "busy" },
    "3": { start: "08:00", end: "16:00", status: "out" },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="outline" className="text-green-500 border-green-500/20">Available</Badge>;
      case "busy":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">Busy</Badge>;
      case "out":
        return <Badge variant="outline" className="text-red-500 border-red-500/20">Out of Office</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white">Doctor Schedules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between p-2 rounded bg-mint/10">
              <div>
                <p className="text-sm font-medium text-white">{doctor.name}</p>
                <p className="text-xs text-white/60">
                  {schedules[doctor.id as keyof typeof schedules]?.start} - {schedules[doctor.id as keyof typeof schedules]?.end}
                </p>
              </div>
              {getStatusBadge(schedules[doctor.id as keyof typeof schedules]?.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}