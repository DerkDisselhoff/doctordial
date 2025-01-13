import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface AppointmentQuickViewProps {
  date: Date;
  selectedDoctor: string;
}

export function AppointmentQuickView({ date, selectedDoctor }: AppointmentQuickViewProps) {
  const navigate = useNavigate();

  // Mock appointments for the selected date
  const appointments = [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      time: "09:00",
      patient: "John Smith",
      type: "Regular Check-up",
      urgentiescore: "U4",
      doctor: "1"
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      time: "14:30",
      patient: "Emma Johnson",
      type: "Follow-up",
      urgentiescore: "U2",
      doctor: "2"
    },
  ].filter(app => selectedDoctor === "all" || app.doctor === selectedDoctor);

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

  return (
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader>
        <CardTitle className="text-white">
          Appointments for {format(date, "MMMM d, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-white/60 text-sm">No appointments scheduled</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 rounded bg-mint/10 cursor-pointer hover:bg-mint/20"
                onClick={() => navigate(`/dashboard/appointments/${appointment.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{appointment.time}</p>
                    <p className="text-sm text-white/60">{appointment.patient}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getUrgencyColor(appointment.urgentiescore)}
                  >
                    {appointment.urgentiescore}
                  </Badge>
                </div>
                <p className="text-xs text-white/60">{appointment.type}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}