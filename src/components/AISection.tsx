import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const AISection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Sparkles className="w-10 h-10 text-mint mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-dark mb-4">
            AI-Powered Call Management
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Revolutionize your practice with our AI-driven call management
            system. From automated triage to seamless patient communication,
            experience efficiency like never before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-mint-light/30 rounded-xl border border-mint/20 hover:border-mint/40 transition-colors">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              Intelligent Triage
            </h3>
            <p className="text-gray-600">
              Our AI accurately assesses patient needs, prioritizing urgent
              cases and streamlining workflows.
            </p>
          </div>

          <div className="p-6 bg-mint-light/30 rounded-xl border border-mint/20 hover:border-mint/40 transition-colors">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              24/7 Availability
            </h3>
            <p className="text-gray-600">
              Ensure your patients receive immediate assistance, day or night,
              with our always-on AI assistant.
            </p>
          </div>

          <div className="p-6 bg-mint-light/30 rounded-xl border border-mint/20 hover:border-mint/40 transition-colors">
            <h3 className="text-xl font-semibold text-gray-dark mb-2">
              Seamless Integration
            </h3>
            <p className="text-gray-600">
              Easily integrate our AI system with your existing infrastructure
              for a hassle-free implementation.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/demo-request"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-dark hover:bg-blue-dark/90 text-white font-medium transition-colors"
          >
            {t("nav.bookDemo")}
          </Link>
        </div>
      </div>
    </section>
  );
};
