# Fix Environment Variables Issues

## Your .env File Status

✅ You have a `.env` file with:
- ✅ DATABASE_URL (Neon database)
- ✅ SESSION_SECRET
- ✅ PORT
- ⚠️ NODE_ENV=development (should be production)

## Quick Fix

### 1. Update NODE_ENV in .env

On your Linux server:

```bash
cd /home/haydeentech/HaydeenPortal

# Edit .env file
nano .env
```

Change this line:
```env
NODE_ENV=development
```

To:
```env
NODE_ENV=production
```

Save and exit (Ctrl+X, then Y, then Enter)

### 2. Update PM2 Config

The updated `ecosystem.config.cjs` now includes `env_file: '.env'` which tells PM2 to load your .env file automatically.

Pull the latest changes:
```bash
git pull origin main
```

### 3. Restart PM2

```bash
# Stop the current process
pm2 stop haydeen-portal
pm2 delete haydeen-portal

# Start with updated config
pm2 start ecosystem.config.cjs
pm2 save

# Check logs
pm2 logs haydeen-portal --lines 20
```

## Verify It's Working

```bash
# Check PM2 status
pm2 status

# Test API health endpoint
curl http://localhost:5000/api/health

# Should return:
# {"status":"healthy","timestamp":"2024-..."}
```

## If Still Getting Errors

### Check .env file location

Make sure `.env` is in the project root:
```bash
ls -la /home/haydeentech/HaydeenPortal/.env
```

### Check .env file syntax

No spaces around `=`:
```bash
# ✅ Correct
DATABASE_URL=postgresql://...

# ❌ Wrong
DATABASE_URL = postgresql://...
```

### Verify PM2 is loading .env

Check PM2 process info:
```bash
pm2 describe haydeen-portal
```

Look for environment variables in the output.

### Manual environment variable check

Test if variables are loaded:
```bash
# Source .env and check
set -a
source .env
set +a
echo $DATABASE_URL
```

## Your Current .env (Recommended Updates)

```env
# Database Configuration
DATABASE_URL=postgresql://neondb_owner:npg_NniQYz4V0CFR@ep-wandering-shadow-a28ndvht-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Session Configuration
SESSION_SECRET=25f111286a99cc145754f313bc3c702409a167f7db5bd275aaefa865025a00ef

# Application Settings
NODE_ENV=production  # ← Change this from development
PORT=5000

# Email Configuration (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@haydeentech.com

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

**Note**: You can remove the PostgreSQL separate variables (PGUSER, PGPASSWORD, etc.) since you're using DATABASE_URL.

## After Fixing

Once you've updated NODE_ENV and restarted PM2, the errors should stop. The application will:
- ✅ Connect to your Neon database
- ✅ Use production settings
- ✅ Serve the frontend correctly
- ✅ Handle API routes properly

