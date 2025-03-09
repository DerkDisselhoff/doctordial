
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { CallHeader } from "./detail/CallHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Clock, Calendar, Phone, FileText, User, FileSpreadsheet, Building } from "lucide-react";

export interface MedicationLog {
  id: string;
  call_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  side_effects: string | null;
  instructions: string | null;
  patient_name: string;
  patient_id: string;
  phone_number: string;
  pharmacy_details: any | null;
  doctor_notes: string | null;
  conversation_summary: string | null;
  transcript: string | null;
  Packages: any | null;
  Date_of_birth: string | null;
  created_at: string;
}

export function MedicationDetail() {
  const { callId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCall, setEditedCall] = useState<Partial<MedicationLog>>({});
  
  const { data: call, isLoading, error, refetch } = useQuery({
    queryKey: ['medicationDetail', callId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('call_logs_medications')
          .select('*')
          .eq('call_id', callId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Medication call not found');
        
        console.log("Retrieved medication data:", data);
        return data as MedicationLog;
      } catch (err) {
        console.error("Error fetching medication details:", err);
        throw err;
      }
    },
    enabled: !!callId,
  });

  useEffect(() => {
    if (call) {
      setEditedCall(call);
    }
  }, [call]);

  const handleSave = async () => {
    try {
      console.log("Saving medication data:", editedCall);
      const { error } = await supabase
        .from('call_logs_medications')
        .update(editedCall)
        .eq('call_id', callId);

      if (error) {
        console.error("Error saving medication:", error);
        throw error;
      }

      toast({
        title: "Changes saved successfully",
        description: "The medication details have been updated.",
      });
      
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error saving changes",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof MedicationLog, value: string) => {
    setEditedCall(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Format date of birth for display
  const formatDateOfBirth = (dateStr: string | null) => {
    if (!dateStr) return "Not specified";
    
    // Handle both ISO string format and date-only format
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      <CallHeader 
        callId={callId!}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        isFlagged={false}
        refetch={refetch}
      />
      
      {!isLoading && !error && call && (
        <>
          {/* Patient & Medication Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-mint" /> Patient Information
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Patient Name</span>
                      <span className="font-medium">{call.patient_name || "Unknown"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Date of Birth</span>
                      <span className="font-medium">{formatDateOfBirth(call.Date_of_birth)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Phone Number</span>
                      <span className="font-medium">{call.phone_number || "Not provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Patient ID</span>
                      <span className="font-medium">{call.patient_id || "Not assigned"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-mint" /> Medication Details
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Medication Name</span>
                      <span className="font-medium">{call.medication_name || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Dosage</span>
                      <span className="font-medium">{call.dosage || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Frequency</span>
                      <span className="font-medium">{call.frequency || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray">Duration</span>
                      <span className="font-medium">{call.duration || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Instructions & Side Effects */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-mint" /> Instructions & Notes
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray mb-1">Instructions</span>
                    <p className="p-3 bg-gray-50 rounded-md min-h-24">
                      {call.instructions || "No specific instructions provided"}
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray mb-1">Side Effects</span>
                    <p className="p-3 bg-gray-50 rounded-md min-h-24">
                      {call.side_effects || "No side effects listed"}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-sm text-gray mb-1">Doctor's Notes</span>
                  <p className="p-3 bg-gray-50 rounded-md min-h-24">
                    {call.doctor_notes || "No doctor notes available"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Pharmacy & Packages */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building className="h-5 w-5 text-mint" /> Pharmacy Details
                  </h3>
                  <div className="p-3 bg-gray-50 rounded-md min-h-24">
                    {call.pharmacy_details ? (
                      <pre className="whitespace-pre-wrap text-sm">
                        {JSON.stringify(call.pharmacy_details, null, 2)}
                      </pre>
                    ) : (
                      "No pharmacy details available"
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Pill className="h-5 w-5 text-mint" /> Packages
                  </h3>
                  <div className="p-3 bg-gray-50 rounded-md min-h-24">
                    {call.Packages ? (
                      <pre className="whitespace-pre-wrap text-sm">
                        {JSON.stringify(call.Packages, null, 2)}
                      </pre>
                    ) : (
                      "No package information available"
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Conversation Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Conversation Summary</h3>
              <p className="p-4 bg-gray-50 rounded-md min-h-32">
                {call.conversation_summary || "No conversation summary available"}
              </p>
            </CardContent>
          </Card>
          
          {/* Transcript - if available */}
          {call.transcript && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Transcript</h3>
                <div className="p-4 bg-gray-50 rounded-md min-h-32 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">
                    {call.transcript}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="p-4 text-center text-gray">
          Medication call not found
        </div>
      )}
    </div>
  );
}
