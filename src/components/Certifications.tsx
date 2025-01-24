import { Shield, CheckCircle } from "lucide-react";

const Certifications = () => {
  return (
    <section className="py-20 px-4 bg-gray-muted/30">
      {/* Certification Section */}
      <div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 px-4 py-2 rounded-full border border-blue/20 mb-8">
            <Shield className="w-4 h-4 text-blue-dark" />
            <span className="text-blue-dark text-sm font-medium">Trained on medical data</span>
          </div>
          <h3 className="text-3xl font-bold mb-8 text-gray-dark">Trained on data from Dutch Healthcare Institutions</h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="p-6 rounded-xl bg-white border border-gray-muted space-y-4 hover:border-blue-dark/20 transition-colors">
              <div className="relative group h-32 flex items-center justify-center">
                <div className="absolute -inset-0.5 bg-blue/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/lovable-uploads/e3414d74-91fb-4ad7-b8a5-9dd5d82520b9.png"
                  alt="NHG Logo"
                  className="h-20 w-auto object-contain relative"
                />
              </div>
              <div className="space-y-2">
                <p className="text-blue-dark font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  NHG-Triage
                </p>
                <p className="text-sm text-gray">
                  Our AI model is trained on official NHG-Triage protocols
                </p>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-white border border-gray-muted space-y-4 hover:border-blue-dark/20 transition-colors">
              <div className="relative group h-32 flex items-center justify-center">
                <div className="absolute -inset-0.5 bg-blue/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/lovable-uploads/91d55dd9-47c6-4ecd-b922-6d2271e3dad5.png"
                  alt="NVDA Logo"
                  className="h-20 w-auto object-contain relative"
                />
              </div>
              <div className="space-y-2">
                <p className="text-blue-dark font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  NVDA Standards
                </p>
                <p className="text-sm text-gray">
                  Fully compliant with NVDA behavioral standards
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-gray max-w-2xl mx-auto">
            Our AI model is meticulously trained on NHG-Triage protocols and adheres to NVDA behavioral standards, ensuring the highest quality of patient care in accordance with Dutch healthcare regulations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;