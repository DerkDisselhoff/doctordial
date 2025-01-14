import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface NewAppointmentModalProps {
  selectedDate?: Date;
  selectedDoctor: string;
  onAppointmentCreated: () => void;
}

export function NewAppointmentModal({ selectedDate, selectedDoctor, onAppointmentCreated }: NewAppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    appointmentType: "",
    notes: "",
    urgencyScore: "U4",
    time: format(selectedDate || new Date(), "HH:mm"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the appointment
    // For now, we'll just show a success message
    toast({
      title: "Appointment Created",
      description: `Appointment scheduled for ${format(selectedDate || new Date(), "MMMM d, yyyy")} at ${formData.time}`,
    });
    
    setOpen(false);
    onAppointmentCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mint hover:bg-mint/90 text-forest">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-forest-light border-mint/10 text-white">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="bg-forest border-mint/10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-forest border-mint/10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientPhone">Phone</Label>
              <Input
                id="patientPhone"
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                className="bg-forest border-mint/10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientEmail">Email</Label>
              <Input
                id="patientEmail"
                type="email"
                value={formData.patientEmail}
                onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                className="bg-forest border-mint/10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentType">Appointment Type</Label>
            <Select
              value={formData.appointmentType}
              onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
            >
              <SelectTrigger className="bg-forest border-mint/10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/10">
                <SelectItem value="checkup">Regular Check-up</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgencyScore">Urgency Level</Label>
            <Select
              value={formData.urgencyScore}
              onValueChange={(value) => setFormData({ ...formData, urgencyScore: value })}
            >
              <SelectTrigger className="bg-forest border-mint/10">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/10">
                <SelectItem value="U1">U1 - Immediate</SelectItem>
                <SelectItem value="U2">U2 - Urgent</SelectItem>
                <SelectItem value="U3">U3 - Semi-Urgent</SelectItem>
                <SelectItem value="U4">U4 - Standard</SelectItem>
                <SelectItem value="U5">U5 - Non-Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-forest border-mint/10"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-mint/10 text-white hover:bg-forest"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-mint hover:bg-mint/90 text-forest">
              Create Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}