import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, User, Phone, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const mockAppointments = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    appointment_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    naam: "John Smith",
    patient_id: "P12345",
    patient_phone: "+31 6 12345678",
    patient_email: "john.smith@email.com",
    follow_up_notes: "Regular check-up, patient mentioned mild headaches",
    urgentiescore: "U4",
    symptoms: ["headache", "fatigue"]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    appointment_date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    naam: "Emma Johnson",
    patient_id: "P12346",
    patient_phone: "+31 6 23456789",
    patient_email: "emma.j@email.com",
    follow_up_notes: "Follow-up on previous treatment, blood pressure check required",
    urgentiescore: "U2",
    symptoms: ["high blood pressure", "dizziness"]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    appointment_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    naam: "Michael Brown",
    patient_id: "P12347",
    patient_phone: "+31 6 34567890",
    patient_email: "m.brown@email.com",
    follow_up_notes: "Post-surgery check-up completed, recovery progressing well",
    urgentiescore: "U1",
    symptoms: ["post-surgery pain", "limited mobility"]
  }
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const navigate = useNavigate();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      // For development, return mock data
      return mockAppointments;
      
      // When ready to use real data, uncomment this:
      /*
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .not('appointment_date', 'is', null)
        .order('appointment_date', { ascending: activeTab === "upcoming" });
      
      if (error) throw error;
      return data;
      */
    }
  });

  const renderAppointmentCard = (appointment: any) => {
    const appointmentDate = new Date(appointment.appointment_date);
    const isPast = appointmentDate < new Date();
    const urgencyColor = appointment.urgentiescore === 'high' ? 'red' : 
                        appointment.urgentiescore === 'medium' ? 'yellow' : 'green';

    return (
      <Card 
        key={appointment.id} 
        className="bg-forest-light/50 border-mint/10 mb-4 cursor-pointer hover:bg-forest-light/70 transition-colors"
        onClick={() => navigate(`/dashboard/appointments/${appointment.id}`)}
      >
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Date & Time</p>
                <p className="text-sm text-white/70">
                  {format(appointmentDate, "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-white/70">
                  {format(appointmentDate, "h:mm a")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Patient</p>
                <p className="text-sm text-white/70">{appointment.naam || "Not specified"}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs border-mint/20 text-mint">
                    {appointment.patient_id || "No ID"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Contact</p>
                <p className="text-sm text-white/70">{appointment.patient_phone || "No phone"}</p>
                <p className="text-sm text-white/70">{appointment.patient_email || "No email"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Notes</p>
                <p className="text-sm text-white/70 line-clamp-2">
                  {appointment.follow_up_notes || "No notes available"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Urgency Level</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs border-${urgencyColor}-500/20 text-${urgencyColor}-500`}
                >
                  {appointment.urgentiescore || "Not specified"}
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-mint flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Status</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${isPast ? "border-red-500/20 text-red-500" : "border-green-500/20 text-green-500"}`}
                >
                  {isPast ? "Completed" : "Scheduled"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white">Appointments</h1>
        <p className="text-white/60">Manage and track all patient appointments</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={(v) => setActiveTab(v as "upcoming" | "past")}>
        <TabsList className="bg-forest-light/50 border-mint/10">
          <TabsTrigger value="upcoming" className="text-white data-[state=active]:bg-mint/10">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="text-white data-[state=active]:bg-mint/10">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full bg-forest-light/20" />
              ))}
            </div>
          ) : appointments?.filter(a => new Date(a.appointment_date) >= new Date()).length === 0 ? (
            <Card className="bg-forest-light/50 border-mint/10">
              <CardContent className="pt-6">
                <p className="text-center text-white/60">No upcoming appointments</p>
              </CardContent>
            </Card>
          ) : (
            appointments?.filter(a => new Date(a.appointment_date) >= new Date())
              .map(renderAppointmentCard)
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full bg-forest-light/20" />
              ))}
            </div>
          ) : appointments?.filter(a => new Date(a.appointment_date) < new Date()).length === 0 ? (
            <Card className="bg-forest-light/50 border-mint/10">
              <CardContent className="pt-6">
                <p className="text-center text-white/60">No past appointments</p>
              </CardContent>
            </Card>
          ) : (
            appointments?.filter(a => new Date(a.appointment_date) < new Date())
              .map(renderAppointmentCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
