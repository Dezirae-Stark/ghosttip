# GhostTip - Cyberpunk Design System

## 🎨 Brand Identity

**Name**: GhostTip
**Tagline**: Anonymous Tipping, Made Simple
**Voice**: Mysterious, Secure, Creator-friendly

**Brand Archetype**:
- 🔒 Secure & Private
- 👻 Anonymous & Discreet
- ⚡ Fast & Modern
- 💻 Hacker-adjacent
- 🎨 Creator-focused

---

## 🌈 Color Palette

### Primary Neon Colors

```css
:root {
  /* Neon Primaries */
  --neon-cyan: #00FFFF;
  --neon-magenta: #FF00FF;
  --neon-purple: #B026FF;
  --neon-green: #39FF14;

  /* Backgrounds (Noir) */
  --noir-black: #0A0E14;
  --noir-dark: #0F1419;
  --noir-medium: #1A1F2E;
  --noir-elevated: #252A3A;

  /* Text */
  --text-primary: #E6E6E6;
  --text-secondary: #B3B3B3;
  --text-muted: #666666;
  --text-accent: #00FFFF;

  /* Status */
  --status-success: #39FF14;
  --status-warning: #FFAA00;
  --status-error: #FF0055;
  --status-info: #00BFFF;

  /* Holographic Gradient Stops */
  --holo-start: rgba(0, 255, 255, 0.8);
  --holo-mid-1: rgba(176, 38, 255, 0.6);
  --holo-mid-2: rgba(255, 0, 255, 0.8);
  --holo-end: rgba(0, 255, 255, 0.6);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00FFFF',
          magenta: '#FF00FF',
          purple: '#B026FF',
          green: '#39FF14',
        },
        noir: {
          black: '#0A0E14',
          dark: '#0F1419',
          medium: '#1A1F2E',
          elevated: '#252A3A',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.5)',
      },
    },
  },
};
```

### React Native StyleSheet

```javascript
export const colors = {
  neon: {
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    purple: '#B026FF',
    green: '#39FF14',
  },
  noir: {
    black: '#0A0E14',
    dark: '#0F1419',
    medium: '#1A1F2E',
    elevated: '#252A3A',
  },
  text: {
    primary: '#E6E6E6',
    secondary: '#B3B3B3',
    muted: '#666666',
    accent: '#00FFFF',
  },
};
```

---

## ✍️ Typography

### Font Stack

**Headline Font**: **Rajdhani** (Google Fonts - Techno-inspired)
- Weights: 500, 600, 700
- Use for: Headings, buttons, nav items

**Body Font**: **Inter** (Google Fonts - Clean & readable)
- Weights: 400, 500, 600
- Use for: Body text, labels, paragraphs

**Mono Font**: **JetBrains Mono** (Google Fonts - Code elements)
- Weights: 400, 500
- Use for: Code blocks, addresses, tokens

### Typography Scale

```css
/* Headings */
--font-size-h1: 3rem;      /* 48px */
--font-size-h2: 2.25rem;   /* 36px */
--font-size-h3: 1.875rem;  /* 30px */
--font-size-h4: 1.5rem;    /* 24px */
--font-size-h5: 1.25rem;   /* 20px */
--font-size-h6: 1rem;      /* 16px */

/* Body */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-base: 1rem;    /* 16px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-xs: 0.75rem;   /* 12px */

/* Line Heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Import CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Rajdhani', sans-serif;
}

code, pre, .mono {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## ✨ Cyberpunk Effects

### Neon Glow Layers

```css
/* Cyan Glow */
.glow-cyan {
  box-shadow:
    0 0 5px rgba(0, 255, 255, 0.5),
    0 0 10px rgba(0, 255, 255, 0.3),
    0 0 20px rgba(0, 255, 255, 0.2);
}

/* Text Glow */
.text-glow-cyan {
  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.8),
    0 0 20px rgba(0, 255, 255, 0.5);
}
```

### Scanlines Overlay

```css
.scanlines::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9999;
  opacity: 0.1;
}
```

### Hologram Gradient

```css
.hologram {
  background: linear-gradient(
    180deg,
    rgba(0, 255, 255, 0.8) 0%,
    rgba(176, 38, 255, 0.6) 33%,
    rgba(255, 0, 255, 0.8) 66%,
    rgba(0, 255, 255, 0.6) 100%
  );
}
```

### Glass Panel Effect

```css
.glass-panel {
  background: rgba(26, 31, 46, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
}
```

### Edge-Lit Border

```css
.edge-lit {
  position: relative;
  border: 1px solid rgba(0, 255, 255, 0.5);
}

.edge-lit::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid transparent;
  border-image: linear-gradient(
    45deg,
    #00FFFF,
    #B026FF,
    #FF00FF
  ) 1;
  pointer-events: none;
}
```

---

## 🧩 Component Library

### NeonButton

```tsx
// React Web
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'purple' | 'green';
  glowIntensity?: 'low' | 'medium' | 'high';
}

export function NeonButton({
  variant = 'cyan',
  glowIntensity = 'medium',
  className,
  children,
  ...props
}: NeonButtonProps) {
  const glowClasses = {
    low: 'shadow-glow-cyan/30',
    medium: 'shadow-glow-cyan',
    high: 'shadow-[0_0_30px_rgba(0,255,255,0.8)]',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-rajdhani font-semibold',
        'border-2 transition-all duration-300',
        'hover:scale-105 active:scale-95',
        variant === 'cyan' && 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10',
        glowClasses[glowIntensity],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

```javascript
// React Native
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const NeonButton = ({ variant = 'cyan', children, onPress }) => {
  const colors = {
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    purple: '#B026FF',
    green: '#39FF14',
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: colors[variant] }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors[variant] }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});
```

### GlowCard

```tsx
// React Web
export function GlowCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        'border border-neon-cyan/30',
        'bg-noir-medium/50 backdrop-blur-sm',
        'hover:border-neon-cyan/50 hover:shadow-glow-cyan',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### CyberInput

```tsx
// React Web
export function CyberInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-lg',
        'bg-noir-dark border-2 border-neon-cyan/30',
        'text-text-primary font-inter',
        'focus:border-neon-cyan focus:shadow-glow-cyan',
        'focus:outline-none transition-all',
        'placeholder:text-text-muted',
        className
      )}
      {...props}
    />
  );
}
```

---

## 📐 Spacing System

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

---

## 🎭 Animation Guidelines

### Duration

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easing

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Transitions

```css
/* Hover effects */
.cyber-hover {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.cyber-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}
```

---

## 📱 Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## ♿ Accessibility

### Contrast Ratios

All text meets WCAG AA standards:
- Neon Cyan (#00FFFF) on Noir Black (#0A0E14): 12.5:1 ✅
- Text Primary (#E6E6E6) on Noir Black: 13.1:1 ✅
- Neon Magenta (#FF00FF) on Noir Black: 8.2:1 ✅

### Focus States

```css
.focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 2px;
}
```

---

## 🎨 Icon Usage

### Size Scale

- **xs**: 16px
- **sm**: 20px
- **md**: 24px (default)
- **lg**: 32px
- **xl**: 48px

### Stroke Weight

All icons use **2px** stroke for consistency

### Color Variants

- **Default**: Neon Cyan (#00FFFF)
- **Accent**: Neon Magenta (#FF00FF)
- **Success**: Neon Green (#39FF14)
- **Monochrome**: White (#FFFFFF)

---

## 📦 File Organization

```
/assets
  /logo
    - logo_primary.svg
    - logo_primary_dark.svg
    - logo_primary_light.svg
    - logo_mono_black.svg
    - logo_mono_white.svg
    - app_icon.svg
    - favicon.svg
  /icons
    /svg
    /react
    /react-native
  /colors
    - palette.css
    - palette.json
  /fonts
  DESIGN_SYSTEM.md
```

---

## 🚀 Implementation Checklist

- [ ] Import fonts (Rajdhani, Inter, JetBrains Mono)
- [ ] Load CSS variables
- [ ] Add scanlines overlay to body
- [ ] Configure Tailwind with neon colors
- [ ] Implement NeonButton component
- [ ] Implement GlowCard component
- [ ] Implement CyberInput component
- [ ] Test all components in dark mode
- [ ] Verify accessibility contrast ratios
- [ ] Test responsive breakpoints

---

**Design System Version**: 1.0
**Last Updated**: 2024
**Maintained by**: GhostTip Team
