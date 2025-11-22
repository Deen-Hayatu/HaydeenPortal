# Fix: Server Running in Development Mode

## Problem

The server is serving Vite development HTML instead of production build. You can see:
- `import RefreshRuntime from "/@react-refresh"` (Vite dev server)
- `src="/@vite/client"` (Vite dev client)
- `src="/src/main.tsx"` (development source files)

This means `NODE_ENV` is set to `development` instead of `production`.

## Quick Fix

### 1. Update .env File

On your Linux server:

```bash
cd /home/haydeentech/HaydeenPortal

# Edit .env file
nano .env
```

**Change this line:**
```env
NODE_ENV=development
```

**To:**
```env
NODE_ENV=production
```

Save and exit (Ctrl+X, then Y, then Enter)

### 2. Restart PM2

```bash
# Restart to load new environment
pm2 restart haydeen-portal

# Check logs
pm2 logs haydeen-portal --lines 20
```

### 3. Verify

```bash
# Test API (should return JSON, not HTML)
curl http://localhost:5000/api/health

# Should return:
# {"status":"healthy","timestamp":"2024-..."}

# Test homepage (should serve production build)
curl http://localhost:5000/ | head -20

# Should show production HTML with:
# <script type="module" src="/assets/index-*.js"></script>
# (not /src/main.tsx)
```

## What Should Happen

After setting `NODE_ENV=production`:

1. **Server serves static files** from `dist/public/` (production build)
2. **No Vite dev server** - uses pre-built assets
3. **API routes work** - `/api/health` returns JSON
4. **Frontend loads** - React app from built JavaScript files

## Verify Production Mode

Check the logs:

```bash
pm2 logs haydeen-portal | grep -i "serving\|production\|development"
```

You should see:
- `serving on port 5000` (not Vite dev server messages)
- No Vite HMR (Hot Module Replacement) messages

## If Still Not Working

### Check .env File Location

```bash
# Verify .env exists and has correct NODE_ENV
cat .env | grep NODE_ENV

# Should show:
# NODE_ENV=production
```

### Check PM2 Environment

```bash
# Check what environment PM2 sees
pm2 describe haydeen-portal | grep -A 10 "env:"
```

### Force Restart

```bash
# Stop and delete
pm2 stop haydeen-portal
pm2 delete haydeen-portal

# Start fresh
pm2 start ecosystem.config.cjs
pm2 save

# Check logs
pm2 logs haydeen-portal
```

## Expected Behavior

### Production Mode (NODE_ENV=production)
- ✅ Serves static files from `dist/public/`
- ✅ API routes return JSON
- ✅ No Vite dev server
- ✅ Fast, optimized build

### Development Mode (NODE_ENV=development)
- ❌ Tries to use Vite dev server (not available in production)
- ❌ Serves development HTML
- ❌ Requires Vite dev server running
- ❌ Not suitable for production deployment

## Your Server IP

From your output, your server IPs are:
- **Local network**: `192.168.0.50` (use this from same network)
- **Tailscale/VPN**: `100.115.115.65` (if using Tailscale)

After fixing NODE_ENV, access via:
- `http://192.168.0.50:5000` (from same network)
- `http://100.115.115.65:5000` (via Tailscale)

