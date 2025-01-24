import { Link } from "react-router-dom";
import { UrgencyLevels } from "./features/feature-previews/UrgencyLevels";

const Features = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-mint-light/5">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-2 mb-6 animate-fade-up text-gray-dark">
            Transform Patient Calls into Practice Efficiency
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-12 animate-fade-up delay-100 text-gray">
            Our advanced AI-powered triage system accurately assesses patient needs in real-time, 
            ensuring urgent cases receive immediate attention while efficiently managing routine inquiries. 
            This smart urgency detection helps practices prioritize patient care effectively.
          </p>
          <div className="max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto bg-white rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-shadow mb-8 md:mb-12 animate-fade-up delay-200 overflow-x-auto touch-pan-x">
            <UrgencyLevels />
          </div>
          <Link 
            to="/features" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-mint text-white hover:bg-mint-dark transition-colors animate-fade-up delay-300 touch-manipulation"
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;