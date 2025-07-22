# Quick Start Guide: VS Code & Vercel Deployment

## Essential Steps for Migration

### 1. Database Setup (Required)
Choose one of these PostgreSQL providers:

**Option A: Neon (Recommended)**
```bash
# 1. Go to https://neon.tech
# 2. Create account and new project
# 3. Copy connection string
# 4. Add to .env.local as DATABASE_URL
```

**Option B: Supabase**
```bash
# 1. Go to https://supabase.com
# 2. Create project
# 3. Go to Settings > Database
# 4. Copy connection string
```

### 2. Local Development Setup
```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local
# Edit .env.local with your database URL

# 3. Setup database
npm run db:push

# 4. Start development
npm run dev
```

### 3. Vercel Deployment
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login and deploy
vercel login
vercel

# 3. Add environment variables in Vercel dashboard:
# - DATABASE_URL
# - SESSION_SECRET
# - SENDGRID_API_KEY (optional)
```

## Key Files Created
- `vercel.json` - Vercel configuration
- `.vscode/settings.json` - VS Code settings
- `.vscode/extensions.json` - Recommended extensions
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide

## Environment Variables Required
```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_random_string
```

## Build Commands for Vercel
- **Build Command**: `npm run build:client`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install`

## VS Code Extensions to Install
1. Tailwind CSS IntelliSense
2. TypeScript Importer
3. Prettier - Code formatter
4. ESLint
5. Auto Rename Tag

## Common Issues & Solutions

### Database Connection Error
```bash
# Ensure your database URL is correct
# Check firewall settings allow connections
# Verify SSL settings match your provider
```

### Build Failures
```bash
# Check all imports are correct
# Ensure all required environment variables are set
# Run local build: npm run build:client
```

### Missing Environment Variables
```bash
# In Vercel dashboard:
# Project Settings > Environment Variables
# Add all variables from .env.example
```

## Next Steps After Deployment
1. Test all functionality on production URL
2. Set up custom domain (if needed)
3. Configure analytics
4. Monitor performance and logs
5. Set up automated deployments from Git

For detailed instructions, see `DEPLOYMENT_GUIDE.md`