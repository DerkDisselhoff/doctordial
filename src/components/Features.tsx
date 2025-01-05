import { Link } from "react-router-dom";
import { UrgencyLevels } from "./features/feature-previews/UrgencyLevels";

const Features = () => {
  return (
    <section className="py-20 px-4 bg-forest-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Our AI Agent Optimizes Your Incoming Patient Calls
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Our advanced AI-powered triage system accurately assesses patient needs in real-time, 
            ensuring urgent cases receive immediate attention while efficiently managing routine inquiries. 
            This smart urgency detection helps practices prioritize patient care effectively.
          </p>
          <div className="max-w-4xl mx-auto bg-forest rounded-xl border border-mint/10 mb-12">
            <UrgencyLevels />
          </div>
          <Link 
            to="/features" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-forest bg-mint hover:bg-mint/90 rounded-lg transition-colors"
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;