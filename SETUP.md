# GhostTip - Complete Setup Guide

This guide will walk you through setting up GhostTip from scratch to a fully functional application.

## Prerequisites

Before starting, ensure you have:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **pnpm** >= 8.x (`npm install -g pnpm@8`)
- **PostgreSQL** >= 14.x ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

## Step 1: Clone and Install

```bash
# Navigate to project directory
cd /data/data/com.termux/files/home/ghosttip

# Install dependencies
pnpm install
```

This will install all dependencies for all packages and apps.

## Step 2: PostgreSQL Setup

### Option A: Local PostgreSQL

1. **Start PostgreSQL** service:
   ```bash
   # On macOS (Homebrew)
   brew services start postgresql@15

   # On Linux
   sudo systemctl start postgresql

   # On Windows
   # Use pgAdmin or Services panel
   ```

2. **Create database**:
   ```bash
   createdb ghosttip
   ```

   Or using `psql`:
   ```sql
   psql -U postgres
   CREATE DATABASE ghosttip;
   \q
   ```

3. **Get connection string**:
   ```
   postgresql://username:password@localhost:5432/ghosttip
   ```

### Option B: Cloud PostgreSQL

Use a managed service like:
- [Supabase](https://supabase.com/) (Free tier available)
- [Neon](https://neon.tech/) (Free tier available)
- [Railway](https://railway.app/) (Free tier available)
- AWS RDS, Google Cloud SQL, etc.

Get your connection string from the provider.

## Step 3: Environment Variables

### Backend

```bash
cd apps/backend
cp .env.example .env
```

Edit `apps/backend/.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ghosttip"

# Security - GENERATE YOUR OWN!
MASTER_KEY="[GENERATE-64-CHARACTER-RANDOM-STRING]"
JWT_SECRET="[GENERATE-64-CHARACTER-RANDOM-STRING]"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"

# Application URLs
APP_NAME="GhostTip"
APP_URL="http://localhost:3000"
API_URL="http://localhost:3001"
```

**Generate secrets**:
```bash
# On macOS/Linux
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### Web App

```bash
cd apps/web
cp .env.example .env.local
```

Edit `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="GhostTip"
```

## Step 4: Database Setup

```bash
# From project root
cd /data/data/com.termux/files/home/ghosttip

# Generate Prisma client
pnpm db:generate

# Push schema to database (for development)
pnpm db:push

# Or create migration (for production)
pnpm db:migrate
```

You should see:
```
✅ Database connected
Your database is now in sync with your Prisma schema.
```

## Step 5: Run Development Servers

Open **3 terminals**:

### Terminal 1: Backend

```bash
cd /data/data/com.termux/files/home/ghosttip
pnpm --filter @ghosttip/backend dev
```

You should see:
```
✅ Database connected
✅ CryptoService initialized
🚀 GhostTip API running on: http://localhost:3001/api
```

### Terminal 2: Web App

```bash
cd /data/data/com.termux/files/home/ghosttip
pnpm --filter @ghosttip/web dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Terminal 3: Mobile App (Optional)

```bash
cd /data/data/com.termux/files/home/ghosttip
pnpm --filter @ghosttip/mobile dev
```

Scan the QR code with Expo Go app.

### Or Run All at Once

```bash
cd /data/data/com.termux/files/home/ghosttip
pnpm dev
```

## Step 6: Test the Application

1. **Open web app**: http://localhost:3000

2. **Register an account**:
   - Click "Get Started"
   - Email: `test@example.com`
   - Alias: `testcreator`
   - Password: `SecurePassword123!` (12+ chars, mixed case, number, special)

3. **Create a Tip Profile**:
   - In dashboard, click "Create Profile"
   - Slug: `testcreator`
   - Display Name: `Test Creator`
   - Bio: `Testing GhostTip!`

4. **Add Payment Methods**:
   - Click "Add Method"
   - Type: Cash App
   - Label: Primary
   - Handle: `$testcreator`

   Add more methods:
   - Venmo: `@testcreator`
   - Bitcoin: `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh` (test address)

5. **View Your Tip Page**:
   - Copy the URL: `http://localhost:3000/u/testcreator`
   - Open in new tab
   - You should see your tip page with payment methods

6. **Test Crypto QR Codes**:
   - On tip page, click "QR" next to Bitcoin
   - QR code should appear

## Step 7: Verify Everything Works

### Test API Endpoints

```bash
# Health check (should return nothing, 404 is expected for /)
curl http://localhost:3001/

# Register (should return access token)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "SecurePassword123!",
    "displayAlias": "apitest"
  }'

# Get tip profile (should return profile data)
curl http://localhost:3001/api/tip-profiles/testcreator
```

### Run Tests

```bash
# Unit tests (crypto, shared)
pnpm test

# Backend integration tests (requires DB)
pnpm --filter @ghosttip/backend test:e2e

# All tests with coverage
pnpm test:ci
```

## Troubleshooting

### Database Connection Errors

**Error**: `Can't reach database server`

**Solution**:
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Test connection:
   ```bash
   psql "postgresql://username:password@localhost:5432/ghosttip"
   ```

### Port Already in Use

**Error**: `Port 3001 already in use`

**Solution**:
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9

# Or change PORT in apps/backend/.env
PORT=3002
```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
pnpm db:generate
```

### Module Not Found Errors

**Error**: `Cannot find module '@ghosttip/...'`

**Solution**:
```bash
# Clean and reinstall
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

### CORS Errors in Browser

**Error**: `Access to XMLHttpRequest... blocked by CORS`

**Solution**:
1. Verify `CORS_ORIGIN` in `apps/backend/.env` matches web app URL
2. Restart backend server

## Production Deployment

### Backend Deployment

1. **Build**:
   ```bash
   pnpm --filter @ghosttip/backend build
   ```

2. **Environment Variables**:
   - Generate strong `MASTER_KEY` and `JWT_SECRET` (64+ characters)
   - Set `NODE_ENV=production`
   - Use production `DATABASE_URL`

3. **Run Migrations**:
   ```bash
   pnpm --filter @ghosttip/backend prisma migrate deploy
   ```

4. **Start**:
   ```bash
   pnpm --filter @ghosttip/backend start:prod
   ```

### Web Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd apps/web
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your production API URL
   - `NEXT_PUBLIC_APP_URL`: Your production domain

### Mobile Deployment (Expo)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Configure**:
   ```bash
   cd apps/mobile
   eas build:configure
   ```

3. **Build**:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

## Next Steps

- [ ] Customize cyberpunk theme colors
- [ ] Add custom domain
- [ ] Set up email service for verification
- [ ] Add analytics tracking
- [ ] Integrate more payment methods
- [ ] Add WebAuthn/FIDO2 authentication
- [ ] Implement per-tip crypto addresses

## Support

For issues and questions:
- Check [GitHub Issues](https://github.com/yourusername/ghosttip/issues)
- Review [SECURITY.md](SECURITY.md) for security best practices
- See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture details

---

**You're all set!** 🎉

Your GhostTip platform is now running and ready to accept anonymous tips.
