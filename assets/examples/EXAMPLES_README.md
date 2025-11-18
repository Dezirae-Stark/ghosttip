# GhostTip UI Examples

This directory contains example page layouts and component showcases for the GhostTip platform.

## 📂 Contents

### Web Examples (HTML)

1. **`web-landing-page.html`** - Landing page mockup
   - Hero section with animated gradient text
   - Feature grid with hover effects
   - Responsive navigation
   - Cyberpunk scanline overlay

2. **`web-tip-page.html`** - Public tip page mockup
   - User profile header with avatar
   - Payment method cards
   - Neon glow hover effects
   - Mobile-responsive layout

### Mobile Examples (React Native)

*Note: See component library in `/components/react-native/` for mobile implementations*

## 🎨 Using These Examples

### As Living Documentation

Open the HTML files directly in a browser to see the components in action:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Then visit:
# http://localhost:8000/web-landing-page.html
# http://localhost:8000/web-tip-page.html
```

### For Screenshots/Mockups

1. Open HTML file in browser
2. Set viewport to desired size:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667

3. Take screenshot using:
   - Browser DevTools (F12 → Device Toolbar)
   - macOS: `Cmd+Shift+4`
   - Windows: `Win+Shift+S`
   - Linux: `Shift+PrintScreen`

### For Development Reference

These examples demonstrate:
- Proper use of color palette
- Typography hierarchy
- Component composition
- Hover/interaction states
- Responsive layouts
- Accessibility patterns

## 🎯 Key Features Demonstrated

### Color System
- Neon colors (cyan, magenta, purple, green)
- Noir backgrounds (layered opacity)
- Gradient text effects
- Glow shadows on hover

### Typography
- Rajdhani for headlines
- Inter for body text
- JetBrains Mono for addresses/code
- Proper font loading from Google Fonts

### Effects
- Scanline overlay
- Backdrop blur (glassmorphism)
- Neon glow on hover
- Smooth transitions

### Layout Patterns
- Centered hero section
- Feature grid (auto-fit columns)
- Card-based payment methods
- Sticky navigation

## 📱 Responsive Breakpoints

All examples are responsive and adapt to:

```css
/* Mobile First */
Base: 320px+

/* Tablet */
@media (min-width: 768px)

/* Desktop */
@media (min-width: 1024px)
```

## 🔧 Customization

### Changing Colors

Edit the CSS custom properties in the `<style>` tag:

```css
:root {
  --neon-cyan: #00FFFF;
  --neon-magenta: #FF00FF;
  /* ... other colors ... */
}
```

### Adding More Examples

Follow the existing pattern:

1. Start with base HTML structure
2. Import Google Fonts
3. Define CSS custom properties from palette
4. Add scanline overlay
5. Build page-specific components

## 🎬 Animation Examples

### Glow Animation

```css
@keyframes glow {
  from {
    filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
  }
  to {
    filter: drop-shadow(0 0 40px rgba(255, 0, 255, 0.8));
  }
}
```

### Hover Effects

```css
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  border-color: rgba(0, 255, 255, 0.8);
}
```

## 🧪 Testing

### Browser Compatibility

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari

### Visual Regression

Recommended tools:
- Percy.io
- Chromatic
- BackstopJS

### Performance

- Check Lighthouse scores
- Verify font loading performance
- Test backdrop-filter support

## 📚 Additional Resources

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Complete design specifications
- [BRAND_GUIDE.md](../BRAND_GUIDE.md) - Brand guidelines
- [/components/README.md](../components/README.md) - Component library

---

**Built with cyberpunk aesthetics for GhostTip**
