import { Link } from "react-router-dom";
import { EnhancedUrgencyDashboard } from "./features/feature-previews/EnhancedUrgencyDashboard";

const Features = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-mint-light/5">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up text-gray-dark">
            Transform Patient Calls into Practice Efficiency
          </h2>
          <div className="max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto bg-white rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-shadow mb-8 md:mb-12 animate-fade-up delay-200 overflow-x-auto touch-pan-x [&_td]:text-left [&_th]:text-left">
            <EnhancedUrgencyDashboard />
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