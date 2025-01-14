import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Phone, Mail, FileText, AlertCircle, Edit, Trash, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AppointmentTooltipProps {
  appointment: {
    id: string;
    title: string;
    patient: string;
    time: string;
    duration: number;
    doctor: string;
    urgencyScore: string;
    patientPhone?: string;
    patientEmail?: string;
    notes?: string;
  };
  children: React.ReactNode;
}

export function AppointmentTooltip({ appointment, children }: AppointmentTooltipProps) {
  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(`/dashboard/appointments/${appointment.id}`);
  };

  const handleDelete = () => {
    // In a real app, this would call an API to delete the appointment
    toast.success("Appointment deleted successfully");
  };

  const handleReschedule = () => {
    // In a real app, this would open a rescheduling modal
    toast.info("Rescheduling functionality coming soon");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-forest-light border-mint/10 text-white">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-lg font-semibold text-white mb-1">
                {appointment.title}
              </DialogTitle>
              <p className="text-sm text-white/70">{appointment.patient}</p>
            </div>
            <Badge variant="outline" className={getUrgencyColor(appointment.urgencyScore)}>
              {appointment.urgencyScore}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {appointment.patientPhone && (
            <div className="flex items-center text-white/70">
              <Phone className="h-4 w-4 mr-2 text-mint" />
              <span className="text-sm">{appointment.patientPhone}</span>
            </div>
          )}
          
          {appointment.patientEmail && (
            <div className="flex items-center text-white/70">
              <Mail className="h-4 w-4 mr-2 text-mint" />
              <span className="text-sm">{appointment.patientEmail}</span>
            </div>
          )}
          
          {appointment.notes && (
            <div>
              <div className="flex items-center text-white">
                <FileText className="h-4 w-4 mr-2 text-mint" />
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-sm text-white/70 mt-1">{appointment.notes}</p>
            </div>
          )}
          
          <div className="flex items-center text-white/70">
            <AlertCircle className="h-4 w-4 mr-2 text-mint" />
            <span className="text-sm">Duration: {appointment.duration} minutes</span>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-mint/10">
            <Button
              variant="outline"
              size="sm"
              className="text-mint border-mint/20 hover:bg-mint/10"
              onClick={handleReschedule}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-mint border-mint/20 hover:bg-mint/10"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-500/20 hover:bg-red-500/10"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}