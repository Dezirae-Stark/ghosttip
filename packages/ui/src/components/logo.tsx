/**
 * GhostTip - Logo Component
 * Cyberpunk-styled logo with animated glow
 */

import * as React from 'react';
import { cn } from '../utils';

interface LogoProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 48,
  animate = false,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animate && 'animate-pulse', className)}
      {...props}
    >
      {/* Outer glow */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ff00ff', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Ghost mask shape */}
      <path
        d="M50 10 C30 10, 15 25, 15 45 C15 55, 15 75, 15 80 C15 85, 20 85, 22 82 C24 79, 26 76, 30 80 C34 84, 36 84, 40 80 C44 76, 46 76, 50 80 C54 84, 56 84, 60 80 C64 76, 66 76, 70 80 C74 84, 76 79, 78 82 C80 85, 85 85, 85 80 C85 75, 85 55, 85 45 C85 25, 70 10, 50 10 Z"
        fill="url(#grad1)"
        filter="url(#glow)"
      />

      {/* Eyes */}
      <circle cx="38" cy="42" r="6" fill="#0a0e14" />
      <circle cx="62" cy="42" r="6" fill="#0a0e14" />

      {/* Dollar sign (tip symbol) */}
      <g transform="translate(50, 55)">
        <path
          d="M-3 -10 L3 -10 L3 -8 C6 -7, 8 -5, 8 -2 C8 1, 6 3, 3 4 L3 10 L-3 10 L-3 4 C-6 3, -8 1, -8 -2 C-8 -5, -6 -7, -3 -8 Z"
          fill="#00ffff"
          stroke="#0a0e14"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

export const LogoText: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={cn(
        'text-2xl font-bold',
        'bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent',
        className
      )}
    >
      GhostTip
    </span>
  );
};
