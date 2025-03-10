
import { EnhancedUrgencyDashboard } from "./features/feature-previews/EnhancedUrgencyDashboard";
import AICapabilities from "./AICapabilities";
import { motion } from "framer-motion";
import SymptomTags from "./features/SymptomTags";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeHowToWorkWithSarah from "./features/home/HomeHowToWorkWithSarah";

const Features = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-white/0 to-mint-light">
      <AICapabilities />
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Simplified gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-forest/90 to-forest-dark/95"
          style={{ willChange: 'auto' }}
        />
        
        {/* Simplified background elements with reduced motion */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-mint rounded-full mix-blend-multiply filter blur-3xl"
            style={{ 
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto'
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-dark rounded-full mix-blend-multiply filter blur-3xl"
            style={{ 
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto'
            }}
          />
        </div>

        {/* Simplified grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 
              className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-mint-light/90 tracking-tight transform-gpu"
              style={{ 
                transform: 'translate3d(0, 0, 0)',
                willChange: 'auto'
              }}
            >
              {t("features.title")}
            </h2>

            <p 
              className="text-base md:text-xl text-mint-light/80 max-w-3xl mx-auto mb-8 md:mb-12 px-4 transform-gpu"
              style={{ 
                transform: 'translate3d(0, 0, 0)',
                willChange: 'auto'
              }}
            >
              {t("features.subtitle")}
            </p>

            <SymptomTags />

            <div className="space-y-8">
              {/* Desktop version - hidden on mobile */}
              <div className="relative hidden md:block">
                <EnhancedUrgencyDashboard />
              </div>

              {/* Mobile version */}
              <div className="md:hidden relative max-w-[calc(100vw-2rem)] mx-auto bg-gradient-to-br from-mint-light/90 to-blue-light/90 backdrop-blur-md rounded-xl border border-mint/20 shadow-sm p-4 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-muted/10 pb-4">
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-dark">Urgency Overview</h3>
                    <p className="text-xs text-gray-light">Today's Statistics</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-mint/10 text-mint">Live</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-muted/5 rounded-lg p-3">
                    <p className="text-xs text-gray-light mb-1">High Priority</p>
                    <p className="text-lg font-semibold text-mint">3</p>
                  </div>
                  <div className="bg-gray-muted/5 rounded-lg p-3">
                    <p className="text-xs text-gray-light mb-1">Medium</p>
                    <p className="text-lg font-semibold text-blue-dark">7</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-dark">Recent Calls</span>
                    <span className="text-gray-light">Last 24h</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-muted/5 p-2 rounded-lg">
                        <div className="text-left">
                          <p className="text-xs font-medium text-gray-dark">Patient {i}</p>
                          <p className="text-xs text-gray-light">2 min ago</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-mint/10 text-mint">
                          U{i}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How to work with Sarah section */}
              <div className="relative">
                <HomeHowToWorkWithSarah />
              </div>
            </div>

          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-light/20 to-transparent" />
      </section>
    </div>
  );
};

export default Features;
