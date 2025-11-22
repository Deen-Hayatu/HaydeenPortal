# Verify Environment Variables Are Loaded

## The Problem

The server is still running in development mode even after changing `.env`. This means PM2 isn't loading the updated environment variables.

## Step-by-Step Fix

### 1. Verify .env File

```bash
# Check .env file content
cat /home/haydeentech/HaydeenPortal/.env | grep NODE_ENV

# Should show:
# NODE_ENV=production
```

If it shows `NODE_ENV=development`, fix it:
```bash
nano /home/haydeentech/HaydeenPortal/.env
# Change to: NODE_ENV=production
```

### 2. Check PM2 Environment

```bash
# See what environment PM2 is using
pm2 describe haydeen-portal | grep -A 20 "env:"
```

Look for `NODE_ENV` in the output. If it shows `development`, PM2 isn't loading the .env file.

### 3. Force Restart with Environment Check

```bash
# Stop PM2
pm2 stop haydeen-portal
pm2 delete haydeen-portal

# Verify .env is in the right place
ls -la /home/haydeentech/HaydeenPortal/.env

# Start fresh
cd /home/haydeentech/HaydeenPortal
pm2 start ecosystem.config.cjs

# Check environment
pm2 describe haydeen-portal | grep NODE_ENV
```

### 4. Manual Environment Test

Test if the .env parser is working:

```bash
cd /home/haydeentech/HaydeenPortal

# Test the ecosystem config
node -e "const config = require('./ecosystem.config.cjs'); console.log(config.apps[0].env.NODE_ENV);"
```

Should output: `production`

### 5. If Still Not Working - Set Environment Directly

If the .env file isn't being loaded, set it directly in PM2:

```bash
# Stop
pm2 stop haydeen-portal
pm2 delete haydeen-portal

# Start with explicit environment
NODE_ENV=production pm2 start ecosystem.config.cjs --update-env

# Or edit ecosystem.config.cjs to hardcode:
# env: {
#   NODE_ENV: 'production',  // Force production
#   ...
# }
```

### 6. Verify Server is in Production Mode

After restart:

```bash
# Check logs
pm2 logs haydeen-portal --lines 20

# Should NOT see Vite dev server messages
# Should see: "serving on port 5000"

# Test API
curl http://localhost:5000/api/health

# Should return JSON:
# {"status":"healthy","timestamp":"..."}

# NOT HTML with /@react-refresh
```

### 7. Check What Express Sees

The server uses `app.get("env")` which comes from `NODE_ENV`. Check if it's being set:

```bash
# Add temporary logging (or check existing logs)
pm2 logs haydeen-portal | grep -i "env\|mode\|production\|development"
```

## Quick Fix Script

Run this on your server:

```bash
#!/bin/bash
cd /home/haydeentech/HaydeenPortal

# 1. Fix .env
sed -i 's/NODE_ENV=development/NODE_ENV=production/' .env

# 2. Verify
echo "NODE_ENV in .env:"
grep NODE_ENV .env

# 3. Restart PM2
pm2 stop haydeen-portal
pm2 delete haydeen-portal
pm2 start ecosystem.config.cjs
pm2 save

# 4. Check
echo ""
echo "PM2 environment:"
pm2 describe haydeen-portal | grep -A 5 "env:"

# 5. Test
echo ""
echo "Testing API:"
curl -s http://localhost:5000/api/health | head -1
```

## Expected Results

After fixing:

1. **PM2 environment** should show `NODE_ENV: 'production'`
2. **API endpoint** should return JSON: `{"status":"healthy",...}`
3. **Homepage** should have: `src="/assets/index-*.js"` (not `/src/main.tsx`)
4. **No Vite dev server** code in HTML

## If Still Failing

The ecosystem.config.cjs might not be parsing .env correctly. Check:

```bash
# Test the parser
node -e "
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const env = {};
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim().replace(/^[\"']|[\"']$/g, '');
      }
    }
  });
  console.log('NODE_ENV:', env.NODE_ENV);
} else {
  console.log('.env file not found');
}
"
```

