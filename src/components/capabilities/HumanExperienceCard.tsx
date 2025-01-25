import { motion } from "framer-motion";

const HumanExperienceCard = () => {
  return (
    <div className="mb-6 relative h-48">
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating Badges */}
        <div className="absolute inset-0">
          {/* Emotion Badge - Bottom Left */}
          <motion.div
            className="absolute left-[5%] bottom-[15%] px-4 py-2 bg-mint-light/60 text-mint text-base font-medium rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [-10, 0, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Emotion
          </motion.div>

          {/* Understanding Badge - Top Right Area */}
          <motion.div
            className="absolute right-[15%] top-[25%] px-4 py-2 bg-blue-light/60 text-blue-dark text-base font-medium rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [-8, 2, -8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            Understanding
          </motion.div>

          {/* Empathy Badge - Top Left Area */}
          <motion.div
            className="absolute left-[15%] top-[15%] px-4 py-2 bg-mint-light/60 text-mint text-base font-medium rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            Empathy
          </motion.div>

          {/* Connection Badge - Bottom Right Area */}
          <motion.div
            className="absolute right-[8%] bottom-[25%] px-4 py-2 bg-blue-light/60 text-blue-dark text-base font-medium rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [-12, -2, -12] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            Connection
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HumanExperienceCard;