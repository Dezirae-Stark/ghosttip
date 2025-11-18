import React from 'react';

export interface NeonQRFrameProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const NeonQRFrame: React.FC<NeonQRFrameProps> = ({
  children,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div
      className={`
        relative p-8 rounded-2xl
        bg-noir-dark backdrop-blur-lg
        border-2 border-neon-cyan/50
        ${className}
      `}
      style={{
        background: 'rgba(15, 20, 25, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

      {/* Content */}
      <div className="flex flex-col items-center space-y-4">
        {title && (
          <h3
            className="font-headline text-2xl font-bold text-center"
            style={{
              background: 'linear-gradient(135deg, #00FFFF, #B026FF, #FF00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h3>
        )}

        {/* QR Code container */}
        <div
          className="p-4 bg-white rounded-lg"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
        >
          {children}
        </div>

        {subtitle && (
          <p className="text-text-secondary text-sm text-center font-mono">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 rounded-2xl"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />
    </div>
  );
};
