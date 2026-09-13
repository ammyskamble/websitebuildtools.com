import React from 'react';

interface SvgFavLogoProps {
  /** Size in pixels — applied to both width and height. Default: 40 */
  size?: number;
  className?: string;
}

export const SvgFavLogo: React.FC<SvgFavLogoProps> = ({ size = 40, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    className={className}
    aria-label="SvgFav.com logo"
    role="img"
  >
    <defs>
      <linearGradient id="svgfav-logo-grad" x1="85%" y1="85%" x2="15%" y2="15%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="svgfav-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.40" />
      </filter>
      <filter id="svgfav-icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.35" />
      </filter>
      <filter id="svgfav-text-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
      </filter>
      <clipPath id="svgfav-shape-clip">
        <rect x="10" y="10" width="492" height="492" rx="120" ry="120" />
      </clipPath>
    </defs>

    {/* Background rounded square with gradient */}
    <rect
      x="10" y="10" width="492" height="492"
      rx="120" ry="120"
      fill="url(#svgfav-logo-grad)"
      filter="url(#svgfav-shadow)"
    />

    {/* Laptop emoji icon */}
    <g
      transform="translate(256, 162) rotate(0) translate(-256, -162)"
      filter="url(#svgfav-icon-shadow)"
    >
      <text
        x="256" y="177"
        fontSize="302px"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif"
      >
        {' 💻 '}
      </text>
    </g>

    {/* SvgFav wordmark */}
    <text
      x="256" y="428.25"
      fontFamily="Inter, system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="90px"
      letterSpacing="1px"
      fill="#60dc1e"
      textAnchor="middle"
      filter="url(#svgfav-text-shadow)"
    >
      <tspan x="256" dy="0px">SvgFav </tspan>
    </text>
  </svg>
);
