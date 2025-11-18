import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const BitcoinIcon: React.FC<IconProps> = ({
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
        <filter id="bitcoin-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        filter="url(#bitcoin-glow)"
      />
      <path
        d="M9 7 L9 17 M9 7 L13 7 C14.5 7 15.5 8 15.5 9.5 C15.5 10.5 15 11 14 11.5 M9 17 L13.5 17 C15 17 16 16 16 14.5 C16 13.5 15.5 12.5 14 12 M14 11.5 L14 12 M9 12 L14 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#bitcoin-glow)"
      />
      <line x1="10.5" y1="5.5" x2="10.5" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#bitcoin-glow)"/>
      <line x1="10.5" y1="17" x2="10.5" y2="18.5" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#bitcoin-glow)"/>
      <line x1="12.5" y1="5.5" x2="12.5" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#bitcoin-glow)"/>
      <line x1="12.5" y1="17" x2="12.5" y2="18.5" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#bitcoin-glow)"/>
    </svg>
  );
};
