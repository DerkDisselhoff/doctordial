
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { PracticeCountStep } from "./steps/PracticeCountStep";
import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { CompanyDetailsStep } from "./steps/CompanyDetailsStep";
import { SuccessStep } from "./steps/SuccessStep";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

export type FormData = {
  practice_count: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
};

export const MultiStepPricingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    practice_count: "",
    name: "",
    email: "",
    phone: "",
    company_name: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress = (step / 4) * 100;

  const handleSubmitData = async () => {
    try {
      setIsSubmitting(true);
      console.log("Starting form submission with data:", formData);
      
      // Insert the form data into the pricing_submissions table
      const { data, error } = await supabase
        .from('pricing_submissions')
        .insert([formData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      
      console.log("Form data inserted successfully:", data);
      
      // Trigger the email notification function with the submitted data
      if (data && data.length > 0) {
        try {
          const submissionData = data[0];
          console.log("Submitting data to notification function:", submissionData);
          
          // Updated to include proper email data formatting
          const emailPayload = {
            id: submissionData.id,
            name: submissionData.name,
            email: submissionData.email,
            phone: submissionData.phone || "",
            practice_count: submissionData.practice_count || "",
            company_name: submissionData.company_name || "",
            role: submissionData.role || "",
            created_at: submissionData.created_at
          };
          
          console.log("Email payload:", emailPayload);
          
          console.log("Calling the notify-new-lead function using Supabase client");
          
          // Use the Supabase client to call the function
          const { data: functionData, error: functionError } = await supabase.functions.invoke(
            'notify-new-lead',
            {
              body: emailPayload,
            }
          );
          
          if (functionError) {
            console.error("Error calling notify-new-lead function:", functionError);
            throw new Error(`Function error: ${functionError.message}`);
          }
          
          console.log("Email notification response:", functionData);
        } catch (notifyErr) {
          console.error("Failed to send notification:", notifyErr);
          // Continue with success flow even if email notification fails
        }
      }

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });
      setStep(4);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <Progress 
        value={progress} 
        className="mb-8 h-1.5 bg-gray-100" 
        indicatorClassName="bg-mint"
      />
      
      {step === 1 && (
        <PracticeCountStep
          value={formData.practice_count}
          onNext={(value) => {
            updateFormData({ practice_count: value });
            setStep(2);
          }}
        />
      )}
      
      {step === 2 && (
        <PersonalDetailsStep
          data={{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }}
          onBack={() => setStep(1)}
          onNext={(data) => {
            updateFormData(data);
            setStep(3);
          }}
        />
      )}
      
      {step === 3 && (
        <CompanyDetailsStep
          data={{
            company_name: formData.company_name,
            role: formData.role,
          }}
          onBack={() => setStep(2)}
          onNext={async (data) => {
            updateFormData(data);
            await handleSubmitData();
          }}
          isSubmitting={isSubmitting}
        />
      )}
      
      {step === 4 && <SuccessStep />}
    </div>
  );
};
