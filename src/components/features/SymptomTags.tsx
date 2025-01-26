import { motion } from "framer-motion";

const symptoms = [
  // Line 1 - Moving right
  ["Headache", "Fever", "Sore Throat", "Cough", "Fatigue", "Nausea", "Dizziness", "Back Pain", "Chest Pain", "Shortness of Breath"],
  // Line 2 - Static
  ["Stomach Pain", "Joint Pain", "Muscle Ache", "Rash", "Allergies", "Anxiety", "Depression", "Insomnia", "High Blood Pressure", "Diabetes"],
  // Line 3 - Moving right
  ["Migraine", "Asthma", "Ear Pain", "Eye Irritation", "Neck Pain", "Shoulder Pain", "Knee Pain", "Swelling", "Numbness", "Vertigo"]
];

const TagLine = ({ symptoms, direction = "none", speed = 0 }: { symptoms: string[], direction?: "none" | "right", speed?: number }) => {
  return (
    <div className="relative flex items-center h-8 overflow-hidden">
      {/* Gradient overlay - left side */}
      <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
      
      <motion.div 
        className="flex gap-3 absolute whitespace-nowrap"
        animate={direction !== "none" ? {
          x: ["0%", "100%"],
        } : {}}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {symptoms.map((symptom, index) => (
          <span
            key={`${symptom}-${index}`}
            className="px-3 py-1 text-xs font-medium rounded-full bg-mint-light/30 text-forest border border-mint/10"
          >
            {symptom}
          </span>
        ))}
      </motion.div>

      {/* Gradient overlay - right side */}
      <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
};

const SymptomTags = () => {
  return (
    <div className="max-w-[calc(100vw-2rem)] md:max-w-6xl mx-auto space-y-4 mb-12">
      <TagLine symptoms={symptoms[0]} direction="right" speed={50} />
      <TagLine symptoms={symptoms[1]} />
      <TagLine symptoms={symptoms[2]} direction="right" speed={40} />
    </div>
  );
};

export default SymptomTags;