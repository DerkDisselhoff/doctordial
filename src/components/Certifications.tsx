import { Shield } from "lucide-react";

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
        </div>
      </div>
    </section>
  );
};

export default Certifications;