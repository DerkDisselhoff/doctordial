import React from 'react';

const ProcessFlow = () => {
  return (
    <div className="w-full bg-white border border-gray-muted rounded-xl p-3 md:p-8 overflow-hidden">
      <h3 className="text-lg md:text-2xl font-semibold text-gray-dark mb-4 md:mb-8 text-center animate-fade-up">
        Process Overview of DoctorDial
      </h3>
      
      <div className="relative w-full max-w-4xl mx-auto overflow-x-auto pb-4">
        <div className="min-w-[640px] md:min-w-[800px]">
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
                  stroke="rgba(100, 255, 218, 0.05)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Moving Dot Animation */}
            <circle className="moving-dot" r="4">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 100 200 L 260 200 L 300 200 L 420 200 L 460 120 L 540 120 L 620 160 L 660 200 L 700 200"
              />
            </circle>

            {/* Circles */}
            <circle cx="100" cy="200" r="40" className="fill-white stroke-blue-dark stroke-2" />
            <circle cx="300" cy="200" r="40" className="fill-white stroke-blue-dark stroke-2" />
            <circle cx="500" cy="120" r="40" className="fill-white stroke-blue-dark stroke-2" />
            <circle cx="500" cy="280" r="40" className="fill-white stroke-blue-dark stroke-2" />
            <circle cx="700" cy="200" r="40" className="fill-white stroke-blue-dark stroke-2" />
            <circle cx="500" cy="360" r="40" className="fill-white stroke-blue-dark stroke-2" />

            {/* Connecting Lines */}
            <path
              d="M 140 200 L 260 200"
              className="stroke-blue-dark stroke-[1.5]"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 340 200 L 420 200 L 460 120"
              className="stroke-red-500 stroke-[1.5]"
              markerEnd="url(#arrowhead-urgent)"
            />
            <path
              d="M 340 200 L 420 200 L 460 280"
              className="stroke-blue-dark stroke-[1.5]"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 340 200 L 420 200 L 460 360"
              className="stroke-green stroke-[1.5]"
              markerEnd="url(#arrowhead-callback)"
            />
            <path
              d="M 540 120 L 620 160 L 660 200"
              className="stroke-red-500 stroke-[1.5]"
              markerEnd="url(#arrowhead-urgent)"
            />
            <path
              d="M 540 280 L 620 240 L 660 200"
              className="stroke-blue-dark stroke-[1.5]"
              markerEnd="url(#arrowhead)"
            />

            {/* Arrow Markers */}
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
                  className="fill-blue-dark"
                />
              </marker>
              <marker
                id="arrowhead-urgent"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  className="fill-red-500"
                />
              </marker>
              <marker
                id="arrowhead-callback"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  className="fill-green"
                />
              </marker>
            </defs>

            {/* Labels with mobile optimization */}
            <text x="100" y="200" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="100" dy="-5">Incoming</tspan>
              <tspan x="100" dy="16">Patient Call</tspan>
            </text>
            
            <text x="300" y="200" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="300" dy="-5">AI Agent</tspan>
              <tspan x="300" dy="16">DoctorDial</tspan>
            </text>
            
            <text x="500" y="120" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="500" dy="-5">Doctor's</tspan>
              <tspan x="500" dy="16">Assistant</tspan>
            </text>
            
            <text x="500" y="280" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="500" dy="-5">Appointment</tspan>
              <tspan x="500" dy="16">Scheduler</tspan>
            </text>
            
            <text x="700" y="200" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="700" dy="-5">Patient</tspan>
              <tspan x="700" dy="16">Resolution</tspan>
            </text>

            <text x="500" y="360" textAnchor="middle" className="fill-gray-dark text-xs md:text-sm font-medium">
              <tspan x="500" dy="-5">Call Back</tspan>
              <tspan x="500" dy="16">Later (U5)</tspan>
            </text>
          </svg>
        </div>

        {/* Mobile-friendly legend */}
        <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-xs md:text-sm px-2 md:px-4">
          <div className="flex items-center gap-2 md:gap-3 touch-manipulation">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
            <span className="text-gray text-xs md:text-base">Urgent Cases (U1/U2)</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 touch-manipulation">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-dark"></div>
            <span className="text-gray text-xs md:text-base">Non-urgent Cases (U3/U4)</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 touch-manipulation">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green"></div>
            <span className="text-gray text-xs md:text-base">Call Back Later (U5)</span>
          </div>
        </div>
      </div>

      <style>{`
        .moving-dot {
          fill: #2563EB;
          filter: drop-shadow(0 0 4px #2563EB);
        }
        
        @media (max-width: 768px) {
          .moving-dot {
            r: 4;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcessFlow;