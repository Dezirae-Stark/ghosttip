# 👻 GhostTip - Anonymous Tip Platform

**Privacy-focused payment link aggregator for content creators**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Post-Quantum Ready](https://img.shields.io/badge/PQ-Ready-magenta.svg)](https://csrc.nist.gov/projects/post-quantum-cryptography)

## 🌟 Overview

GhostTip allows content creators to aggregate all their payment endpoints (CashApp, Venmo, PayPal, Bitcoin, Monero, etc.) into a single anonymous tip link or token. Share it on social media, and fans can tip you without your PII being exposed through the platform.

### Key Features

- **🛡️ Privacy-Focused**: Pseudonymous handles, no PII exposure through platform UI
- **⚡ Simple**: One link for all payment methods
- **🔒 Secure**: Post-quantum ready encryption, Argon2id password hashing, JWT auth
- **🎨 Cyberpunk UI**: Modern, dark, neon-accented design
- **📱 Cross-Platform**: Web (Next.js), Mobile (Expo), API (NestJS)

## 🏗️ Architecture

### Monorepo Structure

```
ghosttip/
├── apps/
│   ├── backend/          # NestJS API server
│   ├── web/              # Next.js web app
│   └── mobile/           # Expo mobile app
├── packages/
│   ├── shared/           # Shared types & utilities
│   ├── crypto/           # Encryption & post-quantum interfaces
│   ├── config/           # Environment config validation
│   └── ui/               # React UI components (cyberpunk theme)
└── docs/                 # Additional documentation
```

### Tech Stack

- **Backend**: NestJS, TypeScript, PostgreSQL, Prisma ORM
- **Web**: Next.js 14 (App Router), TailwindCSS, Radix UI
- **Mobile**: Expo (React Native)
- **Auth**: JWT (access + refresh tokens), Argon2id password hashing
- **Encryption**: XSalsa20-Poly1305 (TweetNaCl), post-quantum interface (Kyber-ready)
- **Testing**: Jest, Supertest, Playwright (web E2E)
- **Monorepo**: pnpm + Turbo

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **PostgreSQL** >= 14.x

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ghosttip.git
cd ghosttip
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
# Backend (.env in apps/backend/)
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ghosttip"

# Security (CHANGE THESE IN PRODUCTION!)
MASTER_KEY="your-master-key-minimum-32-characters-long"
JWT_SECRET="your-jwt-secret-minimum-32-characters-long"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"

# App URLs
APP_URL="http://localhost:3000"
API_URL="http://localhost:3001"
```

```bash
# Web (.env.local in apps/web/)
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database**

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Or push schema (for development)
pnpm db:push
```

5. **Run the development servers**

```bash
# Run all apps in parallel
pnpm dev

# Or run individually:
pnpm --filter @ghosttip/backend dev
pnpm --filter @ghosttip/web dev
pnpm --filter @ghosttip/mobile dev
```

### Access the Apps

- **Web**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Mobile**: Use Expo Go app and scan QR code

## 📖 User Guide

### For Creators

1. **Sign up** at the web app
2. **Create a TipProfile** with a unique slug (e.g., `ghosttip.com/u/yourhandle`)
3. **Add payment methods** (CashApp, Venmo, PayPal, BTC, XMR, etc.)
4. **Get your tip link** and share it on social media
5. **Track analytics** (clicks, referrers, popular methods)

### For Tippers

1. Visit a creator's tip link (e.g., `ghosttip.com/u/neonfox`)
2. Choose a payment method
3. Tip directly via the provider (CashApp, crypto wallet, etc.)

## 🔒 Security Model

### Privacy & Anonymity

- **Pseudonymous**: Creators use handles, not real names
- **No KYC Bypass**: We don't handle money or bypass platform ToS
- **UI-Level Privacy**: Payment providers may reveal info (e.g., PayPal legal name)
- **Bridge/Router**: We route traffic, not process payments

### Encryption & Crypto

- **Encryption at Rest**: Sensitive data (OAuth tokens, API keys) encrypted with XSalsa20-Poly1305
- **Key Derivation**: Argon2id (64 MiB, 3 iterations, 4 threads)
- **Password Hashing**: Argon2id for user passwords
- **Post-Quantum Ready**: Hybrid KEM interface (X25519 + Kyber/ML-KEM)
- **JWT**: Access tokens (15 min), refresh tokens (7 days, httpOnly cookies)
- **No Secret Logging**: Secrets never logged

### Threat Mitigation

- ✅ CSRF protection
- ✅ Input validation (Zod schemas)
- ✅ Rate limiting (100 req/min default)
- ✅ Helmet.js security headers
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention (output encoding)

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @ghosttip/crypto test

# Run backend integration tests
pnpm --filter @ghosttip/backend test:e2e

# Run with coverage
pnpm test:ci
```

## 📦 Build & Deploy

### Production Build

```bash
pnpm build
```

### Run Production

```bash
# Backend
pnpm --filter @ghosttip/backend start:prod

# Web
pnpm --filter @ghosttip/web start

# Mobile
# Use Expo EAS for mobile builds
cd apps/mobile
eas build --platform android
eas build --platform ios
```

### Environment Variables (Production)

⚠️ **CRITICAL**: Change these in production:

- `MASTER_KEY`: Generate a strong 64+ character random string
- `JWT_SECRET`: Generate a strong 64+ character random string
- `DATABASE_URL`: Production PostgreSQL URL
- `CORS_ORIGIN`: Your production frontend URL

## 🛡️ Legal & Compliance

### Important Disclaimers

1. **Not a Payment Processor**: GhostTip does not handle money or payment processing
2. **KYC/AML Compliance**: Users must comply with payment providers' ToS and local laws
3. **Privacy Limitations**: Underlying payment systems may expose user information
4. **No Liability**: Platform acts as a link aggregator; we don't control or access funds
5. **Use Responsibly**: Follow all applicable laws and regulations

### License

MIT License - see [LICENSE](LICENSE) file

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] WebAuthn/FIDO2 authentication
- [ ] Per-tip crypto addresses (BTC xpub, XMR subaddresses)
- [ ] Lightning Network integration
- [ ] Advanced analytics dashboard
- [ ] Custom domain support
- [ ] Webhook notifications
- [ ] Multi-language support
- [ ] Integrate production-ready PQ crypto library (liboqs)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/), [Next.js](https://nextjs.org/), [Expo](https://expo.dev/)
- UI inspired by cyberpunk aesthetics
- Security guidance from [OWASP](https://owasp.org/)
- Post-quantum crypto from [NIST PQC](https://csrc.nist.gov/projects/post-quantum-cryptography)

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ghosttip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ghosttip/discussions)

---

**Made with ❤️ by the GhostTip team**

*Protect your privacy. Accept tips anonymously.*
