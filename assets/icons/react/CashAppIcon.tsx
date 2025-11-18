import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CashAppIcon: React.FC<IconProps> = ({
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
        <filter id="cashapp-glow">
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
        filter="url(#cashapp-glow)"
      />
      <path
        d="M10 8 L10 16 M10 8 L14 8 C15.5 8 16.5 9 16.5 10.5 C16.5 12 15.5 13 14 13 L10 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#cashapp-glow)"
      />
      <line
        x1="8"
        y1="6"
        x2="12"
        y2="6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#cashapp-glow)"
      />
      <line
        x1="8"
        y1="18"
        x2="12"
        y2="18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#cashapp-glow)"
      />
    </svg>
  );
};
