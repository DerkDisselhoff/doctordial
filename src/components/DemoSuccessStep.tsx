import { Check } from "lucide-react";

export const DemoSuccessStep = () => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-mint" />
      </div>
      <h2 className="text-2xl font-semibold text-mint mb-4">Thank You!</h2>
      <p className="text-gray-400 mb-6">
        We've received your demo request and will be in touch shortly to schedule your personalized demo.
      </p>
    </div>
  );
};