import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const QRCodeIcon: React.FC<IconProps> = ({
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
        <filter id="qr-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" filter="url(#qr-glow)"/>
      <rect x="5" y="5" width="3" height="3" fill={color} filter="url(#qr-glow)"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" filter="url(#qr-glow)"/>
      <rect x="16" y="5" width="3" height="3" fill={color} filter="url(#qr-glow)"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" filter="url(#qr-glow)"/>
      <rect x="5" y="16" width="3" height="3" fill={color} filter="url(#qr-glow)"/>
      <rect x="14" y="14" width="2" height="2" fill={color} filter="url(#qr-glow)"/>
      <rect x="17" y="14" width="2" height="2" fill={color} filter="url(#qr-glow)"/>
      <rect x="14" y="17" width="2" height="2" fill={color} filter="url(#qr-glow)"/>
      <rect x="19" y="19" width="2" height="2" fill={color} filter="url(#qr-glow)"/>
    </svg>
  );
};
