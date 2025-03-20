
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PulseMeter: React.FC = () => {
  // Create SVG path for the pulse line
  const generatePulsePath = (): string => {
    // Start with a horizontal line
    let path = "M0,50 ";
    
    // Create a series of curves and peaks to simulate an ECG/pulse
    const patternLength = 200;
    const patterns = 6; // Repeat the pattern multiple times for continuous animation
    
    for (let i = 0; i < patterns; i++) {
      const startX = i * patternLength;
      // Normal beat pattern
      path += `C${startX + 20},50 ${startX + 40},50 ${startX + 60},50 `;
      // Small bump
      path += `C${startX + 70},50 ${startX + 75},30 ${startX + 80},50 `;
      // Continued normal line
      path += `C${startX + 85},50 ${startX + 90},50 ${startX + 100},50 `;
      // Major heartbeat spike
      path += `C${startX + 110},50 ${startX + 115},10 ${startX + 120},50 `;
      path += `C${startX + 125},90 ${startX + 130},50 ${startX + 140},50 `;
      // Return to baseline
      path += `C${startX + 160},50 ${startX + 180},50 ${startX + patternLength},50 `;
    }
    
    return path;
  };

  // Generate once on component mount
  const pulsePath = useRef(generatePulsePath());

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        preserveAspectRatio="none" 
        className="opacity-40"
      >
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--mint-light)" />
            <stop offset="50%" stopColor="var(--mint)" />
            <stop offset="100%" stopColor="var(--mint-dark)" />
          </linearGradient>
          
          <filter id="pulseGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <motion.path
          d={pulsePath.current}
          stroke="url(#pulseGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#pulseGlow)"
          initial={{ x: 0 }}
          animate={{ x: -1200 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

export default PulseMeter;
