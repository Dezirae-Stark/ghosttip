import React from 'react';

export interface TipMethodButtonProps {
  icon: React.ReactNode;
  label: string;
  address: string;
  onClick?: () => void;
  variant?: 'default' | 'crypto' | 'cash';
  className?: string;
}

export const TipMethodButton: React.FC<TipMethodButtonProps> = ({
  icon,
  label,
  address,
  onClick,
  variant = 'default',
  className = '',
}) => {
  const borderColor = {
    default: 'rgba(0, 255, 255, 0.3)',
    crypto: 'rgba(176, 38, 255, 0.3)',
    cash: 'rgba(57, 255, 20, 0.3)',
  }[variant];

  const glowColor = {
    default: 'rgba(0, 255, 255, 0.5)',
    crypto: 'rgba(176, 38, 255, 0.5)',
    cash: 'rgba(57, 255, 20, 0.5)',
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg
        bg-noir-dark backdrop-blur-lg
        border transition-all duration-300
        hover:scale-105 hover:shadow-lg
        active:scale-95
        ${className}
      `}
      style={{
        background: 'rgba(15, 20, 25, 0.5)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${borderColor}`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = glowColor;
        e.currentTarget.style.boxShadow = `0 0 20px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = borderColor;
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.6)';
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <div className="text-text-primary font-headline font-semibold text-lg">
            {label}
          </div>
          <div className="text-text-muted font-mono text-sm truncate">
            {address}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7 4 L13 10 L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: borderColor }}
            />
          </svg>
        </div>
      </div>
    </button>
  );
};
