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
  const { toast } = useToast();

  const progress = (step / 4) * 100;

  const handleSubmitData = async () => {
    try {
      const { error } = await supabase
        .from('pricing_submissions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });
      setStep(4);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
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
        indicatorClassName="bg-blue-600"
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
        />
      )}
      
      {step === 4 && <SuccessStep />}
    </div>
  );
};