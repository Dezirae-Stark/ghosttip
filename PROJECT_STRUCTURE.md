# GhostTip - Project Structure

## Overview

This is a TypeScript monorepo built with pnpm and Turbo. It contains three applications (backend, web, mobile) and four shared packages.

## Directory Structure

```
ghosttip/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD pipeline
│
├── apps/
│   ├── backend/                      # NestJS Backend API
│   │   ├── prisma/
│   │   │   └── schema.prisma         # Database schema
│   │   ├── src/
│   │   │   ├── auth/                 # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── tip-profile/          # TipProfile CRUD
│   │   │   │   ├── tip-profile.controller.ts
│   │   │   │   ├── tip-profile.service.ts
│   │   │   │   └── tip-profile.module.ts
│   │   │   ├── payment-method/       # PaymentMethod CRUD
│   │   │   │   ├── payment-method.controller.ts
│   │   │   │   ├── payment-method.service.ts
│   │   │   │   └── payment-method.module.ts
│   │   │   ├── common/
│   │   │   │   └── prisma.service.ts # Database client
│   │   │   ├── app.module.ts         # Root module
│   │   │   └── main.ts               # Bootstrap
│   │   ├── test/
│   │   │   ├── auth.e2e-spec.ts      # Integration tests
│   │   │   └── jest-e2e.json
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── nest-cli.json
│   │
│   ├── web/                          # Next.js Web Application
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── u/
│   │   │       │   └── [slug]/
│   │   │       │       └── page.tsx  # Public tip page (/u/handle)
│   │   │       ├── page.tsx          # Home page
│   │   │       ├── layout.tsx        # Root layout
│   │   │       └── globals.css       # Global styles (cyberpunk theme)
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── tailwind.config.ts
│   │
│   └── mobile/                       # Expo Mobile Application
│       ├── app/
│       │   ├── index.tsx             # Home screen
│       │   └── _layout.tsx           # Root layout
│       ├── app.json                  # Expo config
│       └── package.json
│
├── packages/
│   ├── shared/                       # Shared types & utilities
│   │   ├── src/
│   │   │   ├── types.ts              # Domain types & DTOs
│   │   │   ├── validation.ts         # Zod schemas
│   │   │   ├── utils.ts              # Utility functions
│   │   │   ├── utils.test.ts         # Unit tests
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── jest.config.js
│   │
│   ├── crypto/                       # Cryptography package
│   │   ├── src/
│   │   │   ├── encryption.ts         # XSalsa20-Poly1305 encryption
│   │   │   ├── encryption.test.ts
│   │   │   ├── kdf.ts                # Argon2id key derivation
│   │   │   ├── crypto-service.ts     # Main crypto service
│   │   │   ├── crypto-service.test.ts
│   │   │   ├── pq-interface.ts       # Post-quantum interfaces
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── jest.config.js
│   │
│   ├── config/                       # Environment config
│   │   ├── src/
│   │   │   ├── env.ts                # Zod env validation
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui/                           # React UI components
│       ├── src/
│       │   ├── components/
│       │   │   ├── button.tsx        # Cyberpunk button
│       │   │   ├── card.tsx          # Cyberpunk card
│       │   │   ├── logo.tsx          # GhostTip logo (SVG)
│       │   │   └── index.ts
│       │   ├── theme.ts              # Theme configuration
│       │   ├── utils.ts              # cn() helper
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── .gitignore
├── LICENSE
├── README.md                         # Main documentation
├── SECURITY.md                       # Security architecture
├── CONTRIBUTING.md                   # Contribution guide
├── package.json                      # Root package.json
├── pnpm-workspace.yaml               # pnpm workspace config
├── turbo.json                        # Turbo configuration
└── tsconfig.json                     # Base TypeScript config
```

## Key Files Explained

### Backend

- **`apps/backend/prisma/schema.prisma`**: Defines database schema (User, PaymentMethod, TipProfile, TipToken, TipEvent)
- **`apps/backend/src/auth/auth.service.ts`**: User registration, login, JWT token generation, refresh logic
- **`apps/backend/src/main.ts`**: NestJS bootstrap, security middleware (helmet, CORS, rate limiting)
- **`apps/backend/src/app.module.ts`**: Root module, initializes crypto service

### Web

- **`apps/web/src/app/page.tsx`**: Landing page with hero, CTA buttons
- **`apps/web/src/app/u/[slug]/page.tsx`**: Public tip page - displays creator's payment methods
- **`apps/web/src/app/globals.css`**: Cyberpunk styling (neon gradients, scanlines, glow effects)

### Mobile

- **`apps/mobile/app/index.tsx`**: Mobile home screen (simplified version)
- **`apps/mobile/app.json`**: Expo configuration

### Shared Packages

- **`packages/shared/src/types.ts`**: TypeScript types for User, PaymentMethod, TipProfile, etc.
- **`packages/shared/src/validation.ts`**: Zod schemas for runtime validation
- **`packages/crypto/src/encryption.ts`**: Encryption/decryption using TweetNaCl
- **`packages/crypto/src/kdf.ts`**: Key derivation using Argon2id
- **`packages/crypto/src/pq-interface.ts`**: Post-quantum KEM interface (future integration)
- **`packages/ui/src/components/button.tsx`**: Cyberpunk-styled button with variants
- **`packages/ui/src/components/logo.tsx`**: GhostTip logo (SVG with gradient)

## Data Flow

### Creator Onboarding

1. User registers via `/api/auth/register` → creates User record
2. User creates TipProfile via `/api/tip-profiles` → generates default TipToken
3. User adds PaymentMethods via `/api/payment-methods` → encrypts credentials
4. User receives tip URL: `https://ghosttip.com/u/{slug}`

### Tipper Journey

1. Tipper visits `https://ghosttip.com/u/{slug}`
2. Frontend fetches TipProfile + PaymentMethods via `/api/tip-profiles/{slug}`
3. Tipper clicks payment method → logs TipEvent (analytics)
4. Tipper is redirected to payment provider or shown crypto address/QR

## Security Layers

1. **Transport**: HTTPS (TLS 1.3)
2. **Auth**: JWT access tokens (15 min) + refresh tokens (7 days)
3. **Passwords**: Argon2id (64 MiB, 3 iterations)
4. **Data at Rest**: XSalsa20-Poly1305 (encrypted OAuth tokens, API keys)
5. **Input Validation**: Zod schemas on all DTOs
6. **Output Encoding**: React auto-escapes, manual sanitization where needed
7. **Rate Limiting**: 100 req/min per IP
8. **CSRF**: SameSite cookies
9. **SQL Injection**: Prisma ORM (parameterized queries)

## Technology Choices

| Layer | Technology | Why |
|-------|------------|-----|
| Backend | NestJS | Structured, DI, decorator-based, great for large apps |
| Web | Next.js 14 | SSR, App Router, excellent DX |
| Mobile | Expo | Cross-platform, fast dev loop, easy deployment |
| Database | PostgreSQL | Reliable, ACID, great Prisma support |
| ORM | Prisma | Type-safe, migrations, great DX |
| Auth | JWT | Stateless, scalable, industry standard |
| Password | Argon2id | PHC winner, memory-hard, resistant to attacks |
| Encryption | TweetNaCl | Audited, simple API, XSalsa20-Poly1305 |
| Validation | Zod | Type-safe, runtime validation, great errors |
| UI | TailwindCSS | Utility-first, fast, customizable |
| Components | Radix UI | Accessible, unstyled primitives |
| Monorepo | pnpm + Turbo | Fast, efficient, caching |

## Testing Strategy

- **Unit Tests**: Crypto functions, utility functions
- **Integration Tests**: API endpoints (auth, profiles, payment methods)
- **E2E Tests**: (Planned) Playwright for web flows
- **Coverage**: 70-80% threshold for critical packages

## CI/CD Pipeline

GitHub Actions workflow:
1. **Lint & Type Check**: ESLint + TypeScript
2. **Unit Tests**: Jest for packages
3. **Integration Tests**: Supertest for backend (with PostgreSQL service)
4. **Build**: Build all apps
5. **Security Scan**: npm audit + Snyk

## Environment Variables

### Backend

- `DATABASE_URL`: PostgreSQL connection string
- `MASTER_KEY`: For encrypting sensitive data (64+ chars)
- `JWT_SECRET`: For signing JWTs (64+ chars)
- `CORS_ORIGIN`: Frontend URL
- `PORT`: API port (default: 3001)

### Web

- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_APP_URL`: Frontend URL

## Future Enhancements

- [ ] Dashboard with analytics
- [ ] WebAuthn/FIDO2 authentication
- [ ] Per-tip crypto addresses (BTC xpub, XMR subaddresses)
- [ ] Integrate production PQ library (liboqs)
- [ ] Webhook notifications
- [ ] Custom domains
- [ ] Multi-language support

## Development Commands

```bash
# Install dependencies
pnpm install

# Database setup
pnpm db:generate    # Generate Prisma client
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema (dev)
pnpm db:studio      # Open Prisma Studio

# Development
pnpm dev            # Run all apps
pnpm --filter @ghosttip/backend dev
pnpm --filter @ghosttip/web dev
pnpm --filter @ghosttip/mobile dev

# Testing
pnpm test           # Run all tests
pnpm test:ci        # Run with coverage

# Building
pnpm build          # Build all apps
pnpm lint           # Lint all packages
pnpm clean          # Clean build artifacts
```

## Production Deployment

### Backend

- Deploy to: AWS EC2, DigitalOcean, Fly.io, Railway
- Database: Managed PostgreSQL (AWS RDS, Supabase, Neon)
- Set strong `MASTER_KEY` and `JWT_SECRET`
- Enable HTTPS (TLS 1.3)
- Configure firewall rules
- Set up log aggregation

### Web

- Deploy to: Vercel, Netlify, Cloudflare Pages
- Set `NEXT_PUBLIC_API_URL` to production API

### Mobile

- Use Expo EAS Build for iOS/Android builds
- Submit to App Store / Google Play

---

**Version**: 1.0
**Last Updated**: 2024
