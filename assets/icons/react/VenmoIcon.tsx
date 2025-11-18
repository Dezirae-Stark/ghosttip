import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const VenmoIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#00FFFF',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="venmo-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        filter="url(#venmo-glow)"
      />
      <path
        d="M8 8 L12 16 L16 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#venmo-glow)"
      />
    </svg>
  );
};
