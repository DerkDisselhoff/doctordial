
import React from "react";

const PulseMeter: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 to-forest-dark/80 opacity-80" />
    </div>
  );
};

export default PulseMeter;
