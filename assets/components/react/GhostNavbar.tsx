import React from 'react';

export interface GhostNavbarProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const GhostNavbar: React.FC<GhostNavbarProps> = ({
  logo,
  children,
  className = '',
}) => {
  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-noir-black/80 backdrop-blur-lg
        border-b border-neon-cyan/30
        ${className}
      `}
      style={{
        background: 'rgba(10, 14, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo}
          </div>

          {/* Navigation items */}
          <div className="flex items-center space-x-6">
            {children}
          </div>
        </div>
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
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
    </nav>
  );
};
