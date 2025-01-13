import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: appointment, isLoading } = useQuery({
    queryKey: ['appointment', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/appointments')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Button>
        <Card className="bg-forest-light/50 border-mint/10">
          <CardContent className="pt-6">
            <p className="text-center text-white/60">Appointment not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointment_date);
  const urgencyColor = appointment.urgentiescore === 'high' ? 'red' : 
                      appointment.urgentiescore === 'medium' ? 'yellow' : 'green';

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/appointments')}
          className="text-white/70 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Button>
        <Badge 
          variant="outline" 
          className={`text-${urgencyColor}-500 border-${urgencyColor}-500/20`}
        >
          {appointment.urgentiescore || 'No urgency score'}
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card className="bg-forest-light/50 border-mint/10">
          <CardHeader>
            <CardTitle className="text-white">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Name</p>
                <p className="text-sm text-white/70">{appointment.naam || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Phone</p>
                <p className="text-sm text-white/70">{appointment.patient_phone || 'No phone'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-sm text-white/70">{appointment.patient_email || 'No email'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Patient ID</p>
                <p className="text-sm text-white/70">{appointment.patient_id || 'No ID'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-forest-light/50 border-mint/10">
          <CardHeader>
            <CardTitle className="text-white">Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Date</p>
                <p className="text-sm text-white/70">
                  {format(appointmentDate, "MMMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Time</p>
                <p className="text-sm text-white/70">
                  {format(appointmentDate, "h:mm a")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <FileText className="h-5 w-5 text-mint flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Notes</p>
                <p className="text-sm text-white/70 whitespace-pre-wrap">
                  {appointment.follow_up_notes || 'No notes available'}
                </p>
              </div>
            </div>

            {appointment.symptoms && appointment.symptoms.length > 0 && (
              <div className="flex items-start space-x-3 md:col-span-2">
                <AlertCircle className="h-5 w-5 text-mint flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Symptoms</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {appointment.symptoms.map((symptom, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-mint border-mint/20"
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {appointment.conversation_summary && (
          <Card className="bg-forest-light/50 border-mint/10">
            <CardHeader>
              <CardTitle className="text-white">Conversation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 whitespace-pre-wrap">
                {appointment.conversation_summary}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetail;