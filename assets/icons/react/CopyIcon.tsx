import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CopyIcon: React.FC<IconProps> = ({
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
        <filter id="copy-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect
        x="8"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        filter="url(#copy-glow)"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        filter="url(#copy-glow)"
      />
    </svg>
  );
};
