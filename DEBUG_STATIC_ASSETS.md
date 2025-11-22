# Debug Static Assets Not Loading

## If Frontend is Partially Loading

If the page loads but styles/JavaScript don't work, check:

### 1. Check Browser Console

Open DevTools (F12) and check:
- **Console tab**: Any red errors?
- **Network tab**: Are `/assets/index-*.js` and `/assets/index-*.css` loading?
  - Status should be 200 (not 404)
  - Check the actual URLs being requested

### 2. Test Asset URLs Directly

From your browser or curl:

```bash
# Test JavaScript file (replace with actual filename from index.html)
curl http://100.115.115.65:5000/assets/index-Bv_0mikC.js | head -5

# Test CSS file
curl http://100.115.115.65:5000/assets/index-7a2DO6N3.css | head -5

# Should return actual file content, not HTML or 404
```

### 3. Check Server Logs

```bash
pm2 logs haydeen-portal --lines 20

# Look for:
# - Static file serving errors
# - Path resolution errors
# - 404 errors for assets
```

### 4. Verify Build Output

On your server:

```bash
# Check if assets exist
ls -la /home/haydeentech/HaydeenPortal/dist/public/assets/

# Should show:
# - index-*.js
# - index-*.css
# - Images (png, jpg, etc.)
```

### 5. Check Static File Path

The server needs to find `dist/public/`. Verify:

```bash
# Check current working directory when server runs
pm2 describe haydeen-portal | grep "cwd"

# Check if dist/public exists from that directory
ls -la $(pm2 describe haydeen-portal | grep "cwd" | awk '{print $4}')/dist/public
```

### 6. Test Static File Serving

```bash
# Test if Express static middleware is working
curl -I http://localhost:5000/assets/index-Bv_0mikC.js

# Should return:
# HTTP/1.1 200 OK
# Content-Type: application/javascript
```

## Common Issues

### Issue 1: Assets Return 404

**Cause**: Static file path is wrong or assets don't exist

**Fix**: 
- Verify `dist/public/assets/` exists
- Check path resolution in `serveStatic` function
- Ensure server is running from project root

### Issue 2: Assets Return HTML (SPA catch-all)

**Cause**: Catch-all route is intercepting asset requests

**Fix**: Already fixed - catch-all now skips `/api` and `/assets`

### Issue 3: CORS Errors

**Cause**: Browser blocking cross-origin requests

**Fix**: Not applicable for same-origin, but check if accessing from different domain

### Issue 4: Wrong Base Path

**Cause**: Vite build has wrong `base` path

**Fix**: Check `client/vite.config.ts` has `base: "/"`

## Quick Diagnostic Script

Run this on your server:

```bash
#!/bin/bash
cd /home/haydeentech/HaydeenPortal

echo "1. Check build output:"
ls -la dist/public/assets/ | head -5

echo ""
echo "2. Check index.html references:"
grep -o 'src="/assets/[^"]*"' dist/public/index.html

echo ""
echo "3. Test asset URL:"
ASSET_JS=$(grep -o 'src="/assets/[^"]*\.js"' dist/public/index.html | head -1 | sed 's/src="//;s/"//')
echo "Testing: $ASSET_JS"
curl -I http://localhost:5000$ASSET_JS 2>&1 | head -3

echo ""
echo "4. Check PM2 working directory:"
pm2 describe haydeen-portal | grep "cwd"
```

## Expected Results

After fixes:
- ✅ API returns JSON: `{"status":"healthy",...}`
- ✅ Homepage loads with styles
- ✅ JavaScript executes (React app renders)
- ✅ Images load
- ✅ No 404s in Network tab

