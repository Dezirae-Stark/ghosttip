import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0e14',
          'bg-secondary': '#0f1419',
          'bg-tertiary': '#1a1f2e',
          'bg-elevated': '#252a3a',
          cyan: '#00ffff',
          magenta: '#ff00ff',
          purple: '#b026ff',
          green: '#39ff14',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
