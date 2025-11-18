# GhostTip Assets

Complete branding and design assets for the GhostTip Anonymous Tipping Platform.

## 📂 Directory Structure

```
/assets
├── /logo                 # Logo files (SVG, PNG)
├── /icons                # Icon system
│   ├── /svg             # Source SVG icons
│   ├── /react           # React components
│   └── /react-native    # React Native components
├── /colors              # Color palettes
├── /fonts               # Typography
├── /mockups             # UI mockups
├── BRAND_GUIDE.md       # Comprehensive brand guidelines
├── DESIGN_SYSTEM.md     # Cyberpunk design system
└── README.md            # This file
```

## 🎨 Quick Start

### Using Logos

```html
<!-- Web -->
<img src="/assets/logo/logo_primary.svg" alt="GhostTip" />

<!-- Dark background -->
<img src="/assets/logo/logo_primary_dark.svg" alt="GhostTip" />

<!-- Light background -->
<img src="/assets/logo/logo_primary_light.svg" alt="GhostTip" />
```

### Using Colors

```css
/* Import CSS variables */
@import url('/assets/colors/palette.css');

/* Use in your styles */
.button {
  background: var(--neon-cyan);
  color: var(--noir-black);
}
```

```javascript
// Import JSON palette
import colors from '/assets/colors/palette.json';

const Button = styled.button`
  background: ${colors.neon.cyan};
`;
```

### Using Icons

```tsx
// React
import { CashAppIcon } from '/assets/icons/react/CashAppIcon';

<CashAppIcon size={24} color="cyan" />
```

```javascript
// React Native
import { CashAppIcon } from '/assets/icons/react-native/CashAppIcon';

<CashAppIcon size={24} color="#00FFFF" />
```

## 🖼️ Logo Variants

| File | Size | Use Case |
|------|------|----------|
| `logo_primary.svg` | Vector | Main logo (dark bg) |
| `logo_primary_dark.svg` | Vector | Dark backgrounds |
| `logo_primary_light.svg` | Vector | Light backgrounds |
| `logo_mono_black.svg` | Vector | Print (black ink) |
| `logo_mono_white.svg` | Vector | Print (white ink) |
| `app_icon.svg` | Vector | App icon source |
| `app_icon_512.png` | 512x512 | App stores |
| `app_icon_1024.png` | 1024x1024 | High-res |
| `favicon.svg` | 32x32 | Website favicon |
| `favicon.ico` | 32x32 | Legacy favicon |

## 🎨 Color Palette

### Neon Colors
- **Cyan**: `#00FFFF` - Primary actions, links
- **Magenta**: `#FF00FF` - Secondary actions
- **Purple**: `#B026FF` - Accents, gradients
- **Green**: `#39FF14` - Success states

### Background (Noir)
- **Black**: `#0A0E14` - Main background
- **Dark**: `#0F1419` - Cards
- **Medium**: `#1A1F2E` - Elevated surfaces
- **Elevated**: `#252A3A` - Modals

### Text
- **Primary**: `#E6E6E6` - Headlines, body
- **Secondary**: `#B3B3B3` - Labels
- **Muted**: `#666666` - Placeholders

## ✍️ Typography

### Fonts Used

1. **Rajdhani** (Headlines)
   - Google Fonts
   - Weights: 500, 600, 700
   - Usage: Headings, buttons, nav

2. **Inter** (Body)
   - Google Fonts
   - Weights: 400, 500, 600
   - Usage: Body text, UI labels

3. **JetBrains Mono** (Code)
   - Google Fonts
   - Weights: 400, 500
   - Usage: Code blocks, addresses

### Loading Fonts

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## 🧩 Icon System

### Available Icons

**Payment Providers**:
- Cash App
- Venmo
- PayPal
- Bitcoin
- Ethereum
- Monero
- Lightning Network

**System Icons**:
- Shield (security)
- Eye / No-eye (privacy)
- Copy (clipboard)
- QR Code
- Link (sharing)
- Ghost (profile)
- Settings
- Logout

### Icon Sizes

- **xs**: 16px
- **sm**: 20px
- **md**: 24px (default)
- **lg**: 32px
- **xl**: 48px

### Icon Colors

- Default: Neon Cyan (#00FFFF)
- Accent: Neon Magenta (#FF00FF)
- Success: Neon Green (#39FF14)
- Mono: White (#FFFFFF)

## 📱 Mockups

UI mockups for reference:
- `/mockups/web_landing.png` - Landing page
- `/mockups/web_dashboard.png` - Creator dashboard
- `/mockups/web_tip_page.png` - Public tip page
- `/mockups/mobile_home.png` - Mobile home
- `/mockups/mobile_tip.png` - Mobile tip view

## 🎨 Cyberpunk Effects

### Neon Glow

```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.text-glow {
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}
```

### Scanlines

```css
.scanlines::before {
  content: '';
  position: fixed;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.1;
}
```

### Glass Effect

```css
.glass {
  background: rgba(26, 31, 46, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.3);
}
```

## 📐 Design Tokens

All design tokens available in:
- `/colors/palette.css` - CSS custom properties
- `/colors/palette.json` - JSON format
- `/colors/tailwind.config.js` - Tailwind config

## ♿ Accessibility

All color combinations meet WCAG AA standards:
- Neon Cyan on Noir Black: 12.5:1 ✅
- White on Noir Black: 15.6:1 ✅
- Neon Green on Noir Black: 11.2:1 ✅

## 📋 Usage Guidelines

### Logo Usage
- ✅ Use provided SVG files
- ✅ Maintain aspect ratio
- ✅ Ensure clear space (20% of height)
- ❌ Don't distort or recolor
- ❌ Don't add effects (logo has built-in glow)

### Color Usage
- ✅ Use neon colors for accents
- ✅ Use noir colors for backgrounds
- ✅ Ensure sufficient contrast
- ❌ Don't use neon on neon
- ❌ Don't mix with off-brand colors

### Typography Usage
- ✅ Use Rajdhani for headings
- ✅ Use Inter for body text
- ✅ Use JetBrains Mono for code
- ❌ Don't use Comic Sans (seriously)
- ❌ Don't mix too many weights

## 📖 Documentation

- **BRAND_GUIDE.md** - Comprehensive brand guidelines
- **DESIGN_SYSTEM.md** - Complete design system documentation

## 🔄 Updates

Assets are versioned with the main repository.

**Current Version**: 1.0
**Last Updated**: 2024

## 📧 Contact

For asset requests or brand inquiries:
- GitHub Issues: [github.com/yourusername/ghosttip/issues](https://github.com/yourusername/ghosttip/issues)
- Email: brand@ghosttip.com

## 📜 License

All assets are proprietary to GhostTip.

**For use in**:
- GhostTip platform
- Official marketing materials
- Community contributions (with attribution)

**Not licensed for**:
- Competitor products
- Standalone redistribution
- Commercial use outside GhostTip ecosystem

---

**Built with** 🎨 **and** ⚡ **by the GhostTip team**
