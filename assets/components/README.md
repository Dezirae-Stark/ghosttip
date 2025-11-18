# GhostTip UI Components

Cyberpunk-themed UI components for web (React) and mobile (React Native).

## Installation

### Web (React)

```bash
npm install react react-dom
```

### Mobile (React Native)

```bash
npm install react react-native expo-linear-gradient react-native-svg
```

## Web Components (React)

### GhostNavbar

Fixed navigation bar with cyberpunk styling and scanline effects.

```tsx
import { GhostNavbar } from '@ghosttip/assets/components/react';

<GhostNavbar
  logo={<img src="/logo.svg" alt="GhostTip" />}
>
  <a href="/dashboard">Dashboard</a>
  <a href="/profile">Profile</a>
  <button>Logout</button>
</GhostNavbar>
```

### TipMethodButton

Payment method button with neon glow hover effects.

```tsx
import { TipMethodButton } from '@ghosttip/assets/components/react';
import { BitcoinIcon } from '@ghosttip/assets/icons/react';

<TipMethodButton
  icon={<BitcoinIcon size={32} />}
  label="Bitcoin"
  address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  variant="crypto"
  onClick={() => showQRCode()}
/>
```

**Props:**
- `icon` - Payment method icon
- `label` - Display name (e.g., "Bitcoin", "Cash App")
- `address` - Payment address/handle
- `variant` - `'default' | 'crypto' | 'cash'`
- `onClick` - Click handler

### NeonQRFrame

Decorative frame for displaying QR codes with corner accents.

```tsx
import { NeonQRFrame } from '@ghosttip/assets/components/react';
import QRCode from 'react-qr-code';

<NeonQRFrame
  title="Scan to Tip"
  subtitle="Bitcoin Address"
>
  <QRCode value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />
</NeonQRFrame>
```

**Props:**
- `children` - QR code component
- `title` - Optional title above QR code
- `subtitle` - Optional subtitle below QR code

### CyberToggleSwitch

Animated toggle switch with neon glow.

```tsx
import { CyberToggleSwitch } from '@ghosttip/assets/components/react';

<CyberToggleSwitch
  label="Enable Privacy Mode"
  checked={privacyMode}
  onChange={(checked) => setPrivacyMode(checked)}
/>
```

**Props:**
- `checked` - Controlled checked state
- `onChange` - Callback with new state
- `label` - Optional label text
- `disabled` - Disabled state

### GhostAvatar

User avatar with gradient background and initials.

```tsx
import { GhostAvatar } from '@ghosttip/assets/components/react';

<GhostAvatar
  name="John Doe"
  size="lg"
  showGlow={true}
/>

// With image
<GhostAvatar
  imageUrl="/avatar.jpg"
  size="md"
/>
```

**Props:**
- `name` - User name (for initials)
- `imageUrl` - Optional avatar image
- `size` - `'sm' | 'md' | 'lg' | 'xl'`
- `showGlow` - Enable neon glow effect

---

## Mobile Components (React Native)

### NeonButton

Gradient button with multiple variants.

```tsx
import { NeonButton } from '@ghosttip/assets/components/react-native';

<NeonButton
  title="Create Tip Link"
  onPress={handleCreate}
  variant="primary"
  size="lg"
/>
```

**Props:**
- `title` - Button text
- `onPress` - Press handler
- `variant` - `'primary' | 'secondary' | 'ghost'`
- `size` - `'sm' | 'md' | 'lg'`
- `disabled` - Disabled state

**Variants:**
- `primary` - Neon gradient background
- `secondary` - Transparent with neon border
- `ghost` - Text only, no border

### GlowCard

Card container with customizable glow color.

```tsx
import { GlowCard } from '@ghosttip/assets/components/react-native';

<GlowCard glowColor="#00FFFF">
  <Text>Card content</Text>
</GlowCard>
```

**Props:**
- `children` - Card content
- `glowColor` - Hex color for border and shadow (default: `#00FFFF`)
- `style` - Additional ViewStyle

### CyberInput

Text input with neon focus effects and error states.

```tsx
import { CyberInput } from '@ghosttip/assets/components/react-native';

<CyberInput
  label="Username"
  placeholder="Enter username"
  value={username}
  onChangeText={setUsername}
  error={usernameError}
/>
```

**Props:**
- `label` - Optional label above input
- `error` - Error message to display
- All standard `TextInput` props

---

## Color Tokens

All components use the GhostTip color palette:

```css
/* Neon Colors */
--neon-cyan: #00FFFF
--neon-magenta: #FF00FF
--neon-purple: #B026FF
--neon-green: #39FF14

/* Backgrounds */
--noir-black: #0A0E14
--noir-dark: #0F1419
--noir-medium: #1A1F2E

/* Text */
--text-primary: #E6E6E6
--text-secondary: #B3B3B3
--text-muted: #666666
```

## Styling

### Tailwind CSS (Web)

Components use Tailwind utility classes. Configure your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFFF',
        'neon-magenta': '#FF00FF',
        'noir-black': '#0A0E14',
        // ... other colors
      },
    },
  },
};
```

### Custom Styles

All components accept `className` (React) or `style` (React Native) props for customization.

```tsx
// React
<GhostNavbar className="shadow-2xl" />

// React Native
<NeonButton style={{ marginTop: 20 }} />
```

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- WCAG AA contrast ratios
- Focus indicators

## Examples

See `/examples` for complete usage examples:
- `/examples/web` - Next.js implementation
- `/examples/mobile` - Expo implementation

---

**Built with cyberpunk aesthetics for GhostTip**
