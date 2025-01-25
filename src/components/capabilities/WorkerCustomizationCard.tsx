import { motion } from "framer-motion";

const WorkerCustomizationCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Digital Worker Image with Settings Ring */}
        <div className="relative w-24 h-24 ml-8">
          <img
            src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
            alt="Sarah - AI Medical Assistant"
            className="w-full h-full object-cover rounded-full border-2 border-mint/20"
          />
          {/* Settings Ring Animation */}
          <motion.div
            className="absolute inset-0 border-2 border-dashed border-mint rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Outer Ring with Dots */}
          <div className="absolute -inset-2 border-2 border-mint/10 rounded-full">
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-mint rounded-full" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-mint rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-mint rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-mint rounded-full" />
          </div>
        </div>

        {/* Customization Settings Container */}
        <div className="flex items-center gap-4">
          {/* Settings Bars Container with Fixed Width */}
          <div className="flex flex-col gap-3 min-w-[70px]">
            <motion.div 
              className="h-2 bg-mint/20 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div 
                className="h-full bg-mint/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            <motion.div 
              className="h-2 bg-blue/20 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div 
                className="h-full bg-blue/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
            <motion.div 
              className="h-2 bg-mint/20 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div 
                className="h-full bg-mint/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>
            <motion.div 
              className="h-2 bg-blue/20 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div 
                className="h-full bg-blue/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "45%" }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </motion.div>
          </div>

          {/* Settings Labels */}
          <div className="flex flex-col gap-3 text-xs text-gray-light whitespace-nowrap">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Voice Tone
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Response Time
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Medical Terms
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Empathy Level
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerCustomizationCard;