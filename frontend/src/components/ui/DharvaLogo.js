import React from 'react';

// Unique DHARVA logo — concentric impact arcs emanating from origin point
// symbolises: measuring the ripple effects of AI decisions
const DharvaLogo = ({ size = 32 }) => {
  const uid = 'dl'; // stable id prefix
  return (
    <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d1420" />
          <stop offset="1" stopColor="#0a1028" />
        </linearGradient>
        <linearGradient id={`${uid}-arc1`} x1="3" y1="37" x2="14" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e5c8" />
          <stop offset="1" stopColor="#00e5c8" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${uid}-arc2`} x1="3" y1="37" x2="23" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e5c8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#00b8d4" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${uid}-arc3`} x1="3" y1="37" x2="32" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect width="40" height="40" rx="9" />
        </clipPath>
        <radialGradient id={`${uid}-glow`} cx="3" cy="37" r="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e5c8" stopOpacity="0.12" />
          <stop offset="1" stopColor="#00e5c8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="40" height="40" rx="9" fill={`url(#${uid}-bg)`} />

      {/* Ambient glow */}
      <rect width="40" height="40" rx="9" fill={`url(#${uid}-glow)`} />

      {/* Clipped content */}
      <g clipPath={`url(#${uid}-clip)`}>
        {/* Arc 3 — large, violet */}
        <path
          d="M3 8 A29 29 0 0 1 32 37"
          stroke={`url(#${uid}-arc3)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arc 2 — medium, teal fading */}
        <path
          d="M3 17 A20 20 0 0 1 23 37"
          stroke={`url(#${uid}-arc2)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arc 1 — small, bright teal */}
        <path
          d="M3 26 A11 11 0 0 1 14 37"
          stroke={`url(#${uid}-arc1)`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Origin node */}
        <circle cx="3" cy="37" r="2.5" fill="#00e5c8" />
        <circle cx="3" cy="37" r="4.5" fill="#00e5c8" fillOpacity="0.15" />

        {/* Subtle border */}
        <rect
          width="40" height="40" rx="9"
          stroke="#00e5c8" strokeOpacity="0.15" strokeWidth="1"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default DharvaLogo;
