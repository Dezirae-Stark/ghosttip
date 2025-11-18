# 🔒 Security & Privacy Architecture

## Overview

GhostTip is designed with security and privacy as first-class concerns. This document explains our security model, cryptographic architecture, and privacy guarantees.

## Privacy Model

### What We Provide

- **Pseudonymity**: Creators use handles/aliases instead of real names
- **UI-Level Privacy**: Platform doesn't expose creator PII in the interface
- **No Direct Access**: We never touch, see, or store payment data or amounts

### What We Don't Provide

- **Anonymity Guarantees**: Underlying payment systems may expose information:
  - PayPal shows legal names
  - CashApp/Venmo show display names
  - Blockchain transactions are public and can be analyzed
- **KYC/AML Bypass**: We don't circumvent any platform's ToS or legal requirements
- **Transaction Privacy**: We're a router, not a mixer or privacy layer

### Legal Positioning

- **Bridge/Aggregator**: We aggregate and display payment endpoints
- **Not a Money Transmitter**: We don't process, hold, or transmit funds
- **User Responsibility**: Users must comply with payment providers' ToS and local laws

## Cryptographic Architecture

### Encryption at Rest

**Algorithm**: XSalsa20-Poly1305 (via TweetNaCl)

**Purpose**: Encrypt sensitive data in database (OAuth tokens, API keys)

**Key Derivation**:
```
Master Key (env var, 32+ chars)
    ↓
Argon2id (64 MiB, 3 iterations, 4 threads)
    ↓
32-byte Encryption Key
    ↓
XSalsa20-Poly1305 AEAD
```

**Properties**:
- ✅ Authenticated encryption (prevents tampering)
- ✅ Unique nonce per encryption
- ✅ Constant-time operations
- ✅ 256-bit security

### Password Hashing

**Algorithm**: Argon2id

**Parameters**:
- Memory: 64 MiB (65536 KiB)
- Iterations: 3
- Parallelism: 4 threads

**Why Argon2id**:
- Winner of Password Hashing Competition (2015)
- Memory-hard (resistant to GPU/ASIC attacks)
- Side-channel resistant
- Hybrid mode (data-dependent + data-independent)

### Token Hashing

**Algorithm**: SHA-256

**Purpose**: Hash refresh tokens and tip tokens for database lookup

**Properties**:
- Prevents token exposure if database is compromised
- Constant-time comparison to prevent timing attacks

### Post-Quantum Readiness

**Current State**: Interface defined, classical crypto implemented

**Future Integration**: Hybrid KEM (Key Encapsulation Mechanism)

**Design**:
```
Classical (X25519) + Post-Quantum (Kyber/ML-KEM)
    ↓
Combined via KDF
    ↓
Shared Secret
```

**Migration Path**:
1. Implement interface with classical crypto (✅ Done)
2. Add post-quantum library (liboqs, pqc-wasm)
3. Switch to hybrid mode transparently
4. No breaking changes for existing data

**When to Migrate**:
- When NIST finalizes ML-KEM standard
- When production-ready libraries are available
- Before quantum computers pose real threat (estimated 10-15 years)

## Authentication & Authorization

### JWT-based Auth

**Access Tokens**:
- Short-lived (15 minutes)
- Sent in Authorization header
- Used for API authentication

**Refresh Tokens**:
- Long-lived (7 days)
- Stored as httpOnly cookies
- Hashed in database
- Can be revoked

**Token Rotation**:
- New access token issued every 15 minutes
- Refresh token rotated on refresh
- Old refresh tokens revoked

### Session Management

- Multiple sessions supported
- Refresh tokens tracked per device
- Logout revokes specific refresh token
- Global logout option available

## Threat Model & Mitigations

### Database Compromise

**Threats**:
- Attacker gains read access to database
- Attempts to steal OAuth tokens, API keys

**Mitigations**:
- ✅ Sensitive data encrypted with XSalsa20-Poly1305
- ✅ Master key stored in environment (not in DB)
- ✅ Passwords hashed with Argon2id (not reversible)
- ✅ Refresh tokens hashed with SHA-256

**Residual Risk**: If attacker also compromises MASTER_KEY, they can decrypt sensitive data

### Token Enumeration

**Threats**:
- Attacker tries to guess tip tokens or refresh tokens
- Attempts brute-force attacks

**Mitigations**:
- ✅ Tokens use 32+ character random strings
- ✅ Tip tokens: `GHOST-XXXX-XXXX` format (36^8 = ~2.8 trillion combinations)
- ✅ Rate limiting (100 req/min default)
- ✅ Tokens hashed before database lookup

### CSRF (Cross-Site Request Forgery)

**Threats**:
- Attacker tricks user's browser into making authenticated requests

**Mitigations**:
- ✅ SameSite cookies (Strict mode)
- ✅ CORS restricted to frontend origin
- ✅ State-changing operations require POST/PUT/DELETE
- ✅ Custom headers checked

### XSS (Cross-Site Scripting)

**Threats**:
- Attacker injects malicious scripts into web pages

**Mitigations**:
- ✅ React auto-escapes output
- ✅ Input sanitization on server
- ✅ Content-Security-Policy headers (Helmet)
- ✅ httpOnly cookies (JS can't access)

### SQL Injection

**Threats**:
- Attacker manipulates SQL queries via user input

**Mitigations**:
- ✅ Prisma ORM (parameterized queries)
- ✅ No raw SQL
- ✅ Input validation via Zod schemas

### SSRF (Server-Side Request Forgery)

**Threats**:
- Attacker makes server fetch malicious URLs

**Mitigations**:
- ✅ No user-controlled URLs fetched by server
- ✅ Webhook URLs validated before fetching (future feature)

### Rate Limiting & DoS

**Mitigations**:
- ✅ Express rate limiter (100 req/min per IP)
- ✅ NestJS Throttler
- ✅ Can add Redis-backed rate limiting for scale

## Secrets Management

### Best Practices

**DO**:
- ✅ Store secrets in environment variables
- ✅ Use `.env.example` for documentation
- ✅ Rotate secrets regularly
- ✅ Use different secrets per environment
- ✅ Use strong random secrets (64+ characters)

**DON'T**:
- ❌ Commit secrets to Git
- ❌ Log secrets
- ❌ Send secrets in URLs
- ❌ Store secrets in frontend code
- ❌ Use weak or default secrets

### Secret Generation

```bash
# Generate strong secrets
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## Logging & Monitoring

### What We Log

- ✅ HTTP requests (method, path, status, duration)
- ✅ Authentication events (success, failure)
- ✅ Errors and exceptions
- ✅ Tip events (non-sensitive metadata)

### What We DON'T Log

- ❌ Passwords or password hashes
- ❌ Full JWTs or refresh tokens
- ❌ OAuth tokens or API keys
- ❌ Credit card or payment details
- ❌ Full IP addresses (hashed for analytics)

## Security Checklist for Deployment

- [ ] Change `MASTER_KEY` to strong random 64+ char string
- [ ] Change `JWT_SECRET` to strong random 64+ char string
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (TLS 1.3+)
- [ ] Set `CORS_ORIGIN` to production frontend URL
- [ ] Configure database SSL/TLS
- [ ] Enable firewall rules
- [ ] Set up intrusion detection
- [ ] Configure log aggregation
- [ ] Set up automated backups
- [ ] Enable rate limiting
- [ ] Run security scanner (npm audit, Snyk)
- [ ] Set up dependency update automation (Dependabot)

## Vulnerability Reporting

If you discover a security vulnerability, please:

1. **DO NOT** open a public GitHub issue
2. Email: security@ghosttip.com (or designated contact)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Impact assessment
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Compliance Notes

### GDPR Considerations

- Users can request data deletion
- Privacy policy must be provided
- Cookie consent required (EU)
- Data minimization principle followed

### PCI-DSS

- **NOT APPLICABLE**: We don't store credit card data
- Payment handled by third parties (CashApp, PayPal, etc.)

### KYC/AML

- Platform doesn't handle money
- Users must comply with payment provider requirements
- Not a money transmitter

## Future Enhancements

- [ ] Add WebAuthn/FIDO2 for passwordless auth
- [ ] Integrate production PQ library (liboqs)
- [ ] Add hardware security module (HSM) support
- [ ] Implement certificate pinning (mobile)
- [ ] Add security headers monitoring
- [ ] Set up bug bounty program

---

**Last Updated**: 2024-01-XX
**Version**: 1.0
