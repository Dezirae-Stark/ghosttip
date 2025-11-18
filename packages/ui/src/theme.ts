/**
 * GhostTip - Cyberpunk Theme System
 */

export const cyberTheme = {
  colors: {
    // Background layers
    bg: {
      primary: '#0a0e14',
      secondary: '#0f1419',
      tertiary: '#1a1f2e',
      elevated: '#252a3a',
    },
    // Neon accents
    accent: {
      cyan: '#00ffff',
      magenta: '#ff00ff',
      purple: '#b026ff',
      green: '#39ff14',
    },
    // Text
    text: {
      primary: '#e6e6e6',
      secondary: '#b3b3b3',
      muted: '#666666',
      accent: '#00ffff',
    },
    // Status
    success: '#39ff14',
    warning: '#ffaa00',
    error: '#ff0055',
    info: '#00bfff',
  },
  shadows: {
    glow: {
      cyan: '0 0 20px rgba(0, 255, 255, 0.5)',
      magenta: '0 0 20px rgba(255, 0, 255, 0.5)',
      purple: '0 0 20px rgba(176, 38, 255, 0.5)',
      green: '0 0 20px rgba(57, 255, 20, 0.5)',
    },
    elevated: '0 8px 32px rgba(0, 0, 0, 0.8)',
  },
  animations: {
    glitch: {
      duration: '0.3s',
      timing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    pulse: {
      duration: '2s',
      timing: 'ease-in-out',
    },
  },
} as const;

export type CyberTheme = typeof cyberTheme;
export type AccentColor = keyof typeof cyberTheme.colors.accent;
