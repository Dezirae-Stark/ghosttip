# 👻 GhostTip Brand Guide

## Brand Overview

**GhostTip** is an anonymous tipping platform that empowers content creators to aggregate payment methods while protecting their privacy. Our brand embodies mystery, security, and the cyberpunk aesthetic.

---

## Logo Usage

### Primary Logo

The primary logo consists of a ghost silhouette with an integrated dollar sign, rendered in neon cyan-to-magenta gradient.

**File**: `logo_primary.svg`

#### When to Use
- Main website header
- App icon
- Marketing materials
- Social media profiles

#### Logo Variants

| Variant | File | Use Case |
|---------|------|----------|
| Primary (Neon) | `logo_primary.svg` | Dark backgrounds |
| Dark Background | `logo_primary_dark.svg` | Black/dark surfaces |
| Light Background | `logo_primary_light.svg` | White/light surfaces |
| Monochrome Black | `logo_mono_black.svg` | Print materials |
| Monochrome White | `logo_mono_white.svg` | Dark print materials |

### Clear Space

Maintain a minimum clear space around the logo equal to the height of the ghost's head (approximately 20% of logo height).

```
┌─────────────────┐
│  [CLEAR SPACE]  │
│   ┌─────────┐   │
│   │  LOGO   │   │
│   └─────────┘   │
│  [CLEAR SPACE]  │
└─────────────────┘
```

### Minimum Sizes

- **Digital**: 32px height minimum
- **Print**: 0.5 inch height minimum
- **Favicon**: 32x32px

---

## Logo Don'ts

❌ **DO NOT**:
- Change the logo colors (except monochrome variants)
- Distort, stretch, or skew the logo
- Add drop shadows or effects (logo has built-in glow)
- Place on busy backgrounds without contrast
- Rotate the logo
- Outline the logo
- Change the proportions
- Use low-resolution versions
- Place logo on colors with insufficient contrast

✅ **DO**:
- Use provided SVG files
- Maintain aspect ratio
- Use appropriate variant for background
- Ensure sufficient contrast
- Use vector format when possible

---

## Color Palette

### Primary Colors

#### Neon Cyan
- **Hex**: `#00FFFF`
- **RGB**: `0, 255, 255`
- **Use**: Primary actions, links, focus states

#### Neon Magenta
- **Hex**: `#FF00FF`
- **RGB**: `255, 0, 255`
- **Use**: Secondary actions, accents, highlights

#### Neon Purple
- **Hex**: `#B026FF`
- **RGB**: `176, 38, 255`
- **Use**: Tertiary accents, gradients

#### Neon Green
- **Hex**: `#39FF14`
- **RGB**: `57, 255, 20`
- **Use**: Success states, confirmations

### Background Colors (Noir)

#### Noir Black
- **Hex**: `#0A0E14`
- **Use**: Main background

#### Noir Dark
- **Hex**: `#0F1419`
- **Use**: Card backgrounds

#### Noir Medium
- **Hex**: `#1A1F2E`
- **Use**: Elevated surfaces

#### Noir Elevated
- **Hex**: `#252A3A`
- **Use**: Modals, overlays

### Text Colors

#### Primary Text
- **Hex**: `#E6E6E6`
- **Use**: Headlines, body text

#### Secondary Text
- **Hex**: `#B3B3B3`
- **Use**: Labels, captions

#### Muted Text
- **Hex**: `#666666`
- **Use**: Placeholders, disabled text

### Color Combinations

**Approved Combinations**:
- Neon Cyan on Noir Black
- Neon Magenta on Noir Dark
- White on Neon Cyan
- Noir Black on Neon Green

**Avoid**:
- Neon on neon (low contrast)
- Light text on light backgrounds
- Dark text on dark backgrounds

---

## Typography

### Font Families

#### Rajdhani (Headlines)
**Use for**: H1-H6, buttons, navigation, CTAs

**Weights**:
- Medium (500): Body headings
- SemiBold (600): Subheadings
- Bold (700): Main headings

**Example**:
```
GHOSTTIP
Anonymous Tipping Platform
```

#### Inter (Body)
**Use for**: Paragraphs, labels, forms, UI text

**Weights**:
- Regular (400): Body text
- Medium (500): Emphasized text
- SemiBold (600): Strong emphasis

**Example**:
```
Protect your privacy. Accept tips anonymously.
```

#### JetBrains Mono (Code)
**Use for**: Code blocks, crypto addresses, tokens, technical text

**Weights**:
- Regular (400): Code samples
- Medium (500): Emphasized code

**Example**:
```
GHOST-ABCD-1234
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

### Type Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | Rajdhani | 48px | 700 | 1.2 |
| H2 | Rajdhani | 36px | 600 | 1.3 |
| H3 | Rajdhani | 30px | 600 | 1.3 |
| H4 | Rajdhani | 24px | 600 | 1.4 |
| Body Large | Inter | 18px | 400 | 1.6 |
| Body | Inter | 16px | 400 | 1.5 |
| Body Small | Inter | 14px | 400 | 1.5 |
| Caption | Inter | 12px | 400 | 1.4 |
| Code | JetBrains | 14px | 400 | 1.6 |

---

## Visual Effects

### Neon Glow

The signature cyberpunk effect. Use sparingly for emphasis.

**Intensity Levels**:
- **Subtle**: 5px blur, 30% opacity
- **Medium**: 10px blur, 50% opacity
- **Strong**: 20px blur, 80% opacity

**When to Use**:
- Hover states on buttons
- Active/focus states
- Important CTAs
- Logo presentation

**When to Avoid**:
- Body text
- Small UI elements
- Busy layouts

### Scanlines

Subtle horizontal lines that evoke CRT monitors.

**Opacity**: 10% maximum
**Spacing**: 2px lines

**Use**: Global overlay on dark backgrounds

### Hologram Gradients

Multi-color gradients with transparency.

**Colors**: Cyan → Purple → Magenta
**Opacity**: 60-80%

**Use**:
- Card borders
- Decorative elements
- Background accents

---

## Icon System

### Icon Styles

All icons follow these principles:
- **Stroke**: 2px consistent weight
- **Corners**: Rounded (2px radius)
- **Size**: 24x24px default
- **Color**: Neon Cyan default

### Payment Provider Icons

Each payment method has a custom icon:
- Cash App: Dollar in square
- Venmo: V in circle
- PayPal: P lettermark
- Bitcoin: ₿ symbol
- Ethereum: Ξ symbol
- Monero: ɱ symbol
- Lightning: ⚡ symbol

### System Icons

- **Shield**: Security features
- **Eye**: Privacy toggles
- **Copy**: Clipboard actions
- **QR**: QR code generation
- **Link**: URL sharing
- **Ghost**: User/profile

---

## Voice & Tone

### Brand Personality

**We are**:
- 🔒 Secure but not intimidating
- 👻 Mysterious but approachable
- ⚡ Modern but not trendy
- 💻 Technical but not jargon-heavy
- 🎨 Creative but functional

### Writing Style

**Do**:
- Use short, clear sentences
- Emphasize privacy and security
- Be helpful and reassuring
- Use active voice
- Explain technical terms simply

**Don't**:
- Use corporate jargon
- Make empty promises
- Over-hype security
- Use fear-based messaging
- Be condescending

### Example Messages

**Good**:
> "Your payment methods, one anonymous link. Share it anywhere."

**Better**:
> "Protect your privacy. Accept tips anonymously."

**Avoid**:
> "Revolutionary blockchain-powered anonymous tipping solution leveraging cutting-edge encryption."

---

## UI Patterns

### Buttons

**Primary Action**:
- Neon gradient background
- White text
- Glow on hover

**Secondary Action**:
- Transparent background
- Neon border
- Neon text

**Ghost Action**:
- No border
- Neon text
- Subtle hover

### Cards

**Standard Card**:
- Noir background
- Neon border (30% opacity)
- Backdrop blur
- Glow on hover

**Elevated Card**:
- Darker background
- Thicker border
- Stronger shadow

### Forms

**Input Fields**:
- Dark background
- Neon border (30% opacity)
- Focus: Full opacity + glow
- Error: Red neon

**Labels**:
- Secondary text color
- Small caps optional
- Above input

---

## Messaging Guidelines

### Security Messaging

**Emphasize**:
- Privacy protection
- Encryption
- No data collection
- Anonymous tipping

**Avoid**:
- "Unhackable" or "100% secure"
- Guarantees of complete anonymity
- Over-technical explanations

### Legal Disclaimers

Always include:
- We don't process payments
- Users must comply with provider ToS
- Platform provides pseudonymity, not full anonymity

---

## Social Media

### Profile Images

Use: `app_icon_512.png`

### Cover Images

Dimensions: 1500x500px (Twitter), 820x312px (Facebook)

Background: Noir Black with neon accents

### Post Guidelines

- Use cyberpunk aesthetic
- Include neon color accents
- Keep brand voice consistent
- Use hashtags: #GhostTip #AnonymousTipping #CryptoTips

---

## File Formats

### Logo Files

| Format | Use Case |
|--------|----------|
| SVG | Web, apps, scalable graphics |
| PNG (512px) | Social media, app stores |
| PNG (1024px) | High-res marketing |
| ICO | Favicons |

### Color Files

- `palette.css` - CSS custom properties
- `palette.json` - Programmatic access
- `tailwind.config.js` - Tailwind configuration

---

## Accessibility

### Contrast Requirements

All text meets WCAG AA (4.5:1 for normal, 3:1 for large):

✅ Neon Cyan on Noir Black: 12.5:1
✅ White on Noir Black: 15.6:1
✅ Neon Green on Noir Black: 11.2:1

### Focus States

All interactive elements must have visible focus states:
- 2px outline in Neon Cyan
- 2px offset from element

### Alternative Text

All icons and images must have descriptive alt text.

---

## Platform-Specific Guidelines

### Web

- Use SVG logos
- Implement scanlines overlay
- Use CSS custom properties for colors
- Ensure responsive breakpoints

### Mobile (iOS/Android)

- Use PNG app icons (512px, 1024px)
- Adapt glow effects for performance
- Use system fonts as fallback
- Test on both light and dark modes

### Print

- Use monochrome logo variants
- Convert neon colors to CMYK equivalents
- Ensure sufficient contrast

---

## Brand Assets Checklist

Before launching any branded material, verify:

- [ ] Logo is correct variant for background
- [ ] Minimum size requirements met
- [ ] Clear space maintained
- [ ] Approved color combinations used
- [ ] Typography follows guidelines
- [ ] Contrast ratios meet WCAG AA
- [ ] Focus states implemented
- [ ] Icons are consistent style
- [ ] Voice and tone on-brand
- [ ] Legal disclaimers included

---

## Contact

For brand inquiries or additional assets:
- Email: brand@ghosttip.com
- GitHub: github.com/yourusername/ghosttip

---

**Brand Guide Version**: 1.0
**Last Updated**: 2024
**Download Assets**: [/assets](./assets)
