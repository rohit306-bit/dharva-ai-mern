import React from 'react';

const DharvaLogo = ({ size = 32 }) => (
  <svg viewBox="0 0 40 40" fill="none" width={size} height={size}>
    <rect width="40" height="40" rx="8" fill="url(#dharva-grad)" />
    <path
      d="M12 28V12h5.5l5.5 8.5L28.5 12H34v16h-4.5V19.5L25 26h-3.5l-5-6.5V28H12z"
      fill="#06080d"
    />
    <defs>
      <linearGradient id="dharva-grad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#00e5c8" />
        <stop offset="1" stopColor="#00b8d4" />
      </linearGradient>
    </defs>
  </svg>
);

export default DharvaLogo;
