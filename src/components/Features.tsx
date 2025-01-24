import { Link } from "react-router-dom";
import { EnhancedUrgencyDashboard } from "./features/feature-previews/EnhancedUrgencyDashboard";
import AICapabilities from "./AICapabilities";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="bg-gradient-to-b from-white to-mint-light/5">
      <AICapabilities />
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background with enhanced gradient and overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/90 to-forest-dark/95" />
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-mint rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-dark rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed" />
        </motion.div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            {/* Enhanced heading with gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-mint-light/90 tracking-tight">
                Transform Patient Calls into
                <br className="hidden md:block" />
                <span className="text-white"> Practice Efficiency</span>
              </h2>
            </motion.div>

            {/* Enhanced subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-mint-light/80 max-w-3xl mx-auto mb-12"
            >
              Experience the future of healthcare communication with our AI-powered system
            </motion.p>

            {/* Dashboard preview with enhanced container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-mint-light/20 to-blue-light/20 rounded-2xl blur-lg group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient" />
              
              <div className="relative max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl border border-mint/20 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8 md:mb-12 overflow-x-auto touch-pan-x [&_td]:text-left [&_th]:text-left">
                <EnhancedUrgencyDashboard />
              </div>
            </motion.div>

            {/* Enhanced CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link 
                to="/features" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-mint to-mint-dark text-white hover:from-mint-dark hover:to-mint transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore All Features
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-light/20 to-transparent" />
      </section>
    </div>
  );
};

export default Features;