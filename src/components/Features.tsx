import { Link } from "react-router-dom";
import { UrgencyLevels } from "./features/feature-previews/UrgencyLevels";

const Features = () => {
  return (
    <section className="section bg-surface-secondary">
      <div className="container">
        <div className="content-spacing-lg text-center">
          <div className="space-y-4">
            <h2 className="heading-section text-text-primary">
              Transform Patient Calls into Practice Efficiency
            </h2>
            <p className="text-lead max-w-2xl mx-auto text-text-secondary">
              Our advanced AI-powered triage system accurately assesses patient needs in real-time, 
              ensuring urgent cases receive immediate attention while efficiently managing routine inquiries. 
              This smart urgency detection helps practices prioritize patient care effectively.
            </p>
          </div>
          
          <div className="max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto bg-surface rounded-xl border border-surface-input shadow-sm">
            <UrgencyLevels />
          </div>
          
          <Link 
            to="/features" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-surface bg-primary hover:bg-primary-dark rounded-lg transition-colors"
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;