import React from 'react';

const ProcessFlow = () => {
  return (
    <div className="w-full bg-[#F1F0FB] rounded-xl p-8 overflow-hidden">
      <h3 className="text-2xl font-semibold text-forest mb-8 text-center">
        Patient Call Process Flow
      </h3>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto"
          style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

          {/* Circles */}
          <circle cx="100" cy="200" r="40" className="fill-mint/10 stroke-mint stroke-2" />
          <circle cx="300" cy="200" r="40" className="fill-mint/10 stroke-mint stroke-2" />
          <circle cx="500" cy="120" r="40" className="fill-mint/10 stroke-mint stroke-2" />
          <circle cx="500" cy="280" r="40" className="fill-mint/10 stroke-mint stroke-2" />
          <circle cx="700" cy="200" r="40" className="fill-mint/10 stroke-mint stroke-2" />

          {/* Connecting Lines */}
          <path
            d="M 140 200 L 260 200"
            className="stroke-mint stroke-2"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 340 200 L 420 200 L 460 120"
            className="stroke-mint stroke-2"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 340 200 L 420 200 L 460 280"
            className="stroke-mint stroke-2"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 540 120 L 620 160 L 660 200"
            className="stroke-mint stroke-2"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 540 280 L 620 240 L 660 200"
            className="stroke-mint stroke-2"
            markerEnd="url(#arrowhead)"
          />

          {/* Arrow Marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                className="fill-mint"
              />
            </marker>
          </defs>

          {/* Labels */}
          <text x="100" y="200" textAnchor="middle" className="fill-forest text-sm font-medium">
            <tspan x="100" dy="-5">Incoming</tspan>
            <tspan x="100" dy="20">Patient Call</tspan>
          </text>
          
          <text x="300" y="200" textAnchor="middle" className="fill-forest text-sm font-medium">
            <tspan x="300" dy="-5">AI Agent</tspan>
            <tspan x="300" dy="20">DoctorDial</tspan>
          </text>
          
          <text x="500" y="120" textAnchor="middle" className="fill-forest text-sm font-medium">
            <tspan x="500" dy="-5">Doctor's</tspan>
            <tspan x="500" dy="20">Assistant</tspan>
          </text>
          
          <text x="500" y="280" textAnchor="middle" className="fill-forest text-sm font-medium">
            <tspan x="500" dy="-5">Appointment</tspan>
            <tspan x="500" dy="20">Scheduler</tspan>
          </text>
          
          <text x="700" y="200" textAnchor="middle" className="fill-forest text-sm font-medium">
            <tspan x="700" dy="-5">Patient</tspan>
            <tspan x="700" dy="20">Resolution</tspan>
          </text>

          {/* Urgency Labels */}
          <text x="380" y="160" className="fill-red-500 text-xs font-medium">U1/U2</text>
          <text x="380" y="250" className="fill-blue-500 text-xs font-medium">U3/U4/U5</text>
        </svg>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-forest">Urgent Cases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-forest">Non-urgent Cases</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;