import { motion } from "framer-motion";

const SeamlessIntegrationCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Central Doctor Assistant Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <img
            src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
            alt="Dr. Sarah - AI Medical Assistant"
            className="w-full h-full object-cover rounded-full border-2 border-mint/20"
          />
          {/* Integration Hub Pattern */}
          <motion.div
            className="absolute -inset-8 border border-mint/20 rounded-full"
            style={{
              background: "radial-gradient(circle at center, transparent 50%, rgba(16, 185, 129, 0.05) 80%)",
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Integration Points with System Names */}
        <div className="absolute inset-0">
          {/* EHR System Integration */}
          <motion.div
            className="absolute left-[15%] top-[25%]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-mint/5 p-2 rounded-lg relative group">
              <div className="w-24 bg-mint/10 rounded-lg flex items-center justify-center py-2 px-3 relative overflow-hidden transition-all duration-300 group-hover:bg-mint/20">
                <span className="text-mint text-xs font-medium relative z-10">EHR System</span>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(45deg, transparent 45%, rgba(16, 185, 129, 0.2) 50%, transparent 55%)",
                    backgroundSize: "300% 300%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              <motion.div
                className="absolute -inset-1 border border-mint/20 rounded-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-mint rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-1.5 h-1.5 bg-mint rounded-full" />
              </motion.div>
            </div>
            <motion.div
              className="absolute h-0.5 w-20 bg-gradient-to-r from-mint/20 to-transparent"
              style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </motion.div>

          {/* Phone System Integration */}
          <motion.div
            className="absolute right-[15%] top-[35%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-mint/5 p-2 rounded-lg relative group">
              <div className="w-24 bg-mint/10 rounded-lg flex items-center justify-center py-2 px-3 relative overflow-hidden transition-all duration-300 group-hover:bg-mint/20">
                <span className="text-mint text-xs font-medium relative z-10">Phone System</span>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(45deg, transparent 45%, rgba(16, 185, 129, 0.2) 50%, transparent 55%)",
                    backgroundSize: "300% 300%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              <motion.div
                className="absolute -inset-1 border border-mint/20 rounded-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-mint rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-1.5 h-1.5 bg-mint rounded-full" />
              </motion.div>
            </div>
            <motion.div
              className="absolute h-0.5 w-20 bg-gradient-to-l from-mint/20 to-transparent"
              style={{ transform: "rotate(-45deg)", transformOrigin: "right center" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
          </motion.div>

          {/* Data Flow Indicators */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-mint/10 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-mint/10 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SeamlessIntegrationCard;