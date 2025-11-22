# Troubleshooting Empty Page on Vercel

## Issue
Site builds successfully but displays as empty/blank page.

## Possible Causes & Solutions

### 1. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab**: Look for JavaScript errors
- **Network tab**: Check if assets are loading (status 200 vs 404)
- **Elements tab**: Verify `<div id="root">` exists

### 2. Verify Assets Are Loading
Check if these files load:
- `/assets/index-*.js` - Should return 200
- `/assets/index-*.css` - Should return 200
- `/favicon.ico` - Should return 200

If assets return 404, the build output might not be correct.

### 3. Check Vercel Deployment Logs
In Vercel Dashboard:
1. Go to Deployments
2. Click on the latest deployment
3. Check "Build Logs" for any errors
4. Check "Function Logs" for runtime errors

### 4. Verify Environment Variables
Even though the site should load without env vars, check:
- Go to Settings → Environment Variables
- Ensure at least `DATABASE_URL` and `SESSION_SECRET` are set
- Redeploy after adding variables

### 5. Test API Endpoint
Visit: `https://haydeen-portal.vercel.app/api/health`
- Should return: `{"status":"healthy","timestamp":"..."}`
- If it errors, the API function might be crashing

### 6. Check Content Security Policy
The CSP might be blocking resources. Check browser console for CSP violations.

### 7. Verify Build Output
The build should create:
- `dist/public/index.html`
- `dist/public/assets/index-*.js`
- `dist/public/assets/index-*.css`
- `dist/public/assets/*.png` (images)

## Quick Fixes

### Fix 1: Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or open in incognito/private window

### Fix 2: Check Vercel Function Logs
1. Vercel Dashboard → Your Project
2. Go to "Functions" tab
3. Check for errors in `api/index` function

### Fix 3: Verify Static Files
Run locally:
```bash
npm run build
ls -la dist/public/assets/
```
Verify files exist and are not empty.

### Fix 4: Test Locally
```bash
npm run build
npm run start
```
Visit `http://localhost:5000` - does it work locally?

## Common Errors

### "Failed to fetch" or CORS errors
- Check if API routes are working
- Verify `connect-src` in CSP allows API calls

### Blank white page
- JavaScript error preventing React from mounting
- Check browser console for errors
- Check ErrorBoundary component

### Assets return 404
- Build output directory might be wrong
- Check `vercel.json` has correct `outputDirectory`
- Verify files exist in `dist/public/assets/`

## Next Steps

1. **Check browser console** - Most important!
2. **Check Vercel function logs** - Look for runtime errors
3. **Verify assets are loading** - Network tab in DevTools
4. **Test API endpoint** - `/api/health` should work
5. **Add environment variables** - Even if site loads, API needs them

