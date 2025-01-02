import { Phone } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";

const HeroContent = () => (
  <div className="space-y-8 animate-fade-up">
    <div className="flex items-center gap-2 bg-mint/10 w-fit px-4 py-2 rounded-full border border-mint/20 hover:border-mint/40 transition-colors">
      <Phone className="w-4 h-4 text-mint" />
      <span className="text-mint text-sm font-medium">AI-Powered Call Management</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
      Manage
      <br />
      patient calls
      <br />
      effortlessly
    </h1>
    <p className="text-lg text-white/80 max-w-md leading-relaxed">
      Revolutionize how your GP practice manages patient communication with our AI-powered virtual front desk, trained on NHG-Triage data and compliant with NVDA standards.
    </p>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <BookDemoForm />
      <div className="text-sm text-mint/80 mt-2 sm:mt-0 animate-fade-in">
        *Trained on Dutch healthcare standards
      </div>
    </div>
  </div>
);

export default HeroContent;