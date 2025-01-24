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

  // Mock appointments with proper UUID format
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
      case "U1": return "text-status-error border-status-error/20";
      case "U2": return "text-status-warning border-status-warning/20";
      case "U3": return "text-status-warning border-status-warning/20";
      case "U4": return "text-status-info border-status-info/20";
      case "U5": return "text-status-success border-status-success/20";
      default: return "text-text-muted border-border";
    }
  };

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle className="text-text-primary">
          Appointments for {format(date, "MMMM d, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-text-secondary text-sm">No appointments scheduled</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 rounded bg-surface-secondary cursor-pointer hover:bg-surface-tertiary"
                onClick={() => navigate(`/dashboard/appointments/${appointment.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{appointment.time}</p>
                    <p className="text-sm text-text-secondary">{appointment.patient}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getUrgencyColor(appointment.urgentiescore)}
                  >
                    {appointment.urgentiescore}
                  </Badge>
                </div>
                <p className="text-xs text-text-secondary">{appointment.type}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}