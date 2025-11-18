import React from 'react';

export interface GhostAvatarProps {
  name?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

export const GhostAvatar: React.FC<GhostAvatarProps> = ({
  name,
  imageUrl,
  size = 'md',
  showGlow = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  }[size];

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`
        ${sizeClasses}
        rounded-full
        flex items-center justify-center
        font-headline font-bold
        overflow-hidden
        border-2
        transition-all duration-300
        ${className}
      `}
      style={{
        background: imageUrl
          ? `url(${imageUrl}) center/cover`
          : 'linear-gradient(135deg, #00FFFF, #B026FF, #FF00FF)',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        boxShadow: showGlow
          ? '0 0 20px rgba(0, 255, 255, 0.5), 0 4px 16px rgba(0, 0, 0, 0.6)'
          : '0 4px 16px rgba(0, 0, 0, 0.6)',
      }}
    >
      {!imageUrl && (
        <span className="text-white drop-shadow-lg">
          {getInitials(name)}
        </span>
      )}

      {/* Inner glow */}
      {showGlow && !imageUrl && (
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)',
          }}
        />
      )}
    </div>
  );
};
