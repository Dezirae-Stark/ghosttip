import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const GhostIcon: React.FC<IconProps> = ({
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
        <filter id="ghost-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 3 C8 3 5 6 5 10 L5 19 L7 17 L9 19 L12 17 L15 19 L17 17 L19 19 L19 10 C19 6 16 3 12 3 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#ghost-glow)"
      />
      <circle cx="9" cy="10" r="1.5" fill={color} filter="url(#ghost-glow)"/>
      <circle cx="15" cy="10" r="1.5" fill={color} filter="url(#ghost-glow)"/>
    </svg>
  );
};
