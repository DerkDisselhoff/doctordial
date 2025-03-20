
import React, { useRef } from "react";
import { motion } from "framer-motion";

const PulseMeter: React.FC = () => {
  // Create SVG paths for multiple pulse lines with different characteristics
  const generatePulsePath = (height: number, complexity: number): string => {
    const baseHeight = 50;
    let path = `M0,${baseHeight} `;
    
    // Create a more realistic and varied ECG pattern
    const patternLength = 300;
    const patterns = 4; // Number of repeating patterns
    
    for (let i = 0; i < patterns; i++) {
      const startX = i * patternLength;
      
      // Normal baseline
      path += `L${startX + 20},${baseHeight} `;
      
      // P wave (small rounded bump)
      path += `C${startX + 30},${baseHeight - 5 * complexity} ${startX + 40},${baseHeight - 10 * complexity} ${startX + 50},${baseHeight} `;
      
      // PR segment (short flat line)
      path += `L${startX + 70},${baseHeight} `;
      
      // QRS complex (main spike with sharper edges)
      path += `L${startX + 80},${baseHeight + 5 * complexity} `; // Q wave dip
      path += `L${startX + 90},${baseHeight - height} `; // R wave (tall spike)
      path += `L${startX + 100},${baseHeight + 15 * complexity} `; // S wave (deeper dip)
      
      // ST segment (return to baseline with slight curve)
      path += `C${startX + 120},${baseHeight + 2 * complexity} ${startX + 140},${baseHeight} ${startX + 160},${baseHeight} `;
      
      // T wave (wider, rounded bump)
      path += `C${startX + 190},${baseHeight - 15 * complexity} ${startX + 220},${baseHeight - 15 * complexity} ${startX + 250},${baseHeight} `;
      
      // Complete the pattern
      path += `L${startX + patternLength},${baseHeight} `;
    }
    
    return path;
  };

  // Generate multiple pulse lines with different characteristics
  const pulsePath1 = useRef(generatePulsePath(30, 1));
  const pulsePath2 = useRef(generatePulsePath(20, 0.8));
  const pulsePath3 = useRef(generatePulsePath(15, 0.6));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 to-forest-dark/80 opacity-80" />
      
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 100"
        preserveAspectRatio="none" 
      >
        <defs>
          {/* Primary pulse gradient - mint tones */}
          <linearGradient id="pulseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Secondary pulse gradient - blue tones */}
          <linearGradient id="pulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8F1FE" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Tertiary pulse gradient - sage tones */}
          <linearGradient id="pulseGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ECFCCB" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#84CC16" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#65A30D" stopOpacity="0.5" />
          </linearGradient>
          
          {/* Glow filters with different intensities */}
          <filter id="pulseGlow1" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="pulseGlow2" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="pulseGlow3" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Primary pulse line */}
        <motion.path
          d={pulsePath1.current}
          stroke="url(#pulseGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pulseGlow1)"
          initial={{ x: 0 }}
          animate={{ x: -1200 }}
          transition={{
            repeat: Infinity,
            duration: 24,
            ease: "linear"
          }}
        />
        
        {/* Secondary pulse line - offset and slower */}
        <motion.path
          d={pulsePath2.current}
          stroke="url(#pulseGradient2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pulseGlow2)"
          initial={{ x: -300 }}
          animate={{ x: -1500 }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear"
          }}
        />
        
        {/* Tertiary pulse line - different offset and speed */}
        <motion.path
          d={pulsePath3.current}
          stroke="url(#pulseGradient3)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#pulseGlow3)"
          initial={{ x: -600 }}
          animate={{ x: -1800 }}
          transition={{
            repeat: Infinity,
            duration: 36,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

export default PulseMeter;
