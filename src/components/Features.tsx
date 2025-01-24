import { Link } from "react-router-dom";
import { UrgencyLevels } from "./features/feature-previews/UrgencyLevels";

const Features = () => {
  return (
    <section className="py-8 md:py-20 px-4 bg-gray-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="heading-2 mb-3 md:mb-4 animate-fade-up text-gray-dark">
            Transform Patient Calls into Practice Efficiency
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-6 md:mb-12 animate-fade-up delay-100 text-gray">
            Our advanced AI-powered triage system accurately assesses patient needs in real-time, 
            ensuring urgent cases receive immediate attention while efficiently managing routine inquiries. 
            This smart urgency detection helps practices prioritize patient care effectively.
          </p>
          <div className="max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto bg-white rounded-xl border border-gray-muted mb-6 md:mb-12 animate-fade-up delay-200 overflow-x-auto touch-pan-x">
            <UrgencyLevels />
          </div>
          <Link 
            to="/features" 
            className="btn-primary px-4 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium rounded-lg animate-fade-up delay-300 touch-manipulation inline-flex items-center justify-center"
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;