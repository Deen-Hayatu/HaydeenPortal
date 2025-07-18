import React from 'react';

const AgriculturalHeroBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#98FB98" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#90EE90" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#228B22" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Sky background */}
        <rect width="1200" height="400" fill="url(#skyGradient)" />
        
        {/* Rolling hills */}
        <path
          d="M0,300 Q200,250 400,280 T800,260 T1200,300 L1200,800 L0,800 Z"
          fill="url(#fieldGradient)"
        />
        
        {/* Crop rows */}
        <g opacity="0.4">
          <path d="M0,400 Q100,390 200,400 T400,390 T600,400 T800,390 T1000,400 T1200,390" 
                stroke="#228B22" strokeWidth="2" fill="none" />
          <path d="M0,420 Q100,410 200,420 T400,410 T600,420 T800,410 T1000,420 T1200,410" 
                stroke="#228B22" strokeWidth="2" fill="none" />
          <path d="M0,440 Q100,430 200,440 T400,430 T600,440 T800,430 T1000,440 T1200,430" 
                stroke="#228B22" strokeWidth="2" fill="none" />
        </g>
        
        {/* Trees */}
        <g opacity="0.3">
          <circle cx="150" cy="280" r="25" fill="#228B22" />
          <rect x="145" y="280" width="10" height="40" fill="#8B4513" />
          
          <circle cx="300" cy="270" r="30" fill="#228B22" />
          <rect x="294" y="270" width="12" height="45" fill="#8B4513" />
          
          <circle cx="950" cy="275" r="28" fill="#228B22" />
          <rect x="944" y="275" width="12" height="42" fill="#8B4513" />
        </g>
        
        {/* Tech elements */}
        <g opacity="0.6">
          {/* Signal towers */}
          <rect x="780" y="200" width="4" height="60" fill="#0A3D62" />
          <rect x="772" y="210" width="20" height="2" fill="#0A3D62" />
          <rect x="772" y="220" width="20" height="2" fill="#0A3D62" />
          <rect x="772" y="230" width="20" height="2" fill="#0A3D62" />
          
          {/* Floating data points */}
          <circle cx="200" cy="200" r="3" fill="#27AE60" opacity="0.8" />
          <circle cx="400" cy="180" r="3" fill="#27AE60" opacity="0.8" />
          <circle cx="600" cy="220" r="3" fill="#27AE60" opacity="0.8" />
          <circle cx="800" cy="160" r="3" fill="#27AE60" opacity="0.8" />
          
          {/* Connection lines */}
          <path d="M200,200 L400,180 L600,220 L800,160" 
                stroke="#27AE60" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="5,5" />
        </g>
      </svg>
    </div>
  );
};

export default AgriculturalHeroBg;