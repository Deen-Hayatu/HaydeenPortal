# Debug Empty Page Issue

## Immediate Steps to Diagnose

### 1. Open Browser DevTools
Press **F12** or **Right-click → Inspect** and check:

**Console Tab:**
- Look for red error messages
- Common errors:
  - `Failed to fetch` - API connection issue
  - `Cannot read property of undefined` - JavaScript error
  - `Module not found` - Import error
  - CSP violations

**Network Tab:**
- Check if these files load (should be 200 status):
  - `/assets/index-*.js` 
  - `/assets/index-*.css`
  - `/favicon.ico`
- If any return 404, assets aren't being served

**Elements Tab:**
- Check if `<div id="root">` exists
- Check if it has any content inside

### 2. Test Direct Asset URLs
Try accessing these directly:
- `https://haydeen-portal.vercel.app/assets/index-CicemlT_.js`
- `https://haydeen-portal.vercel.app/assets/index-7a2DO6N3.css`

If these return 404, the build output isn't correct.

### 3. Check Vercel Function Logs
1. Go to Vercel Dashboard
2. Your Project → Functions tab
3. Click on `api/index`
4. Check "Logs" for errors

### 4. Test API Endpoint
Visit: `https://haydeen-portal.vercel.app/api/health`
- Should return JSON: `{"status":"healthy","timestamp":"..."}`
- If it errors, the API function is crashing

## Most Likely Causes

### Cause 1: JavaScript Error
**Symptom:** Console shows error, page is blank
**Fix:** Check error message in console, fix the code

### Cause 2: Assets Not Loading
**Symptom:** Network tab shows 404 for JS/CSS files
**Fix:** Verify build output, check `vercel.json` outputDirectory

### Cause 3: CSP Blocking Resources
**Symptom:** Console shows CSP violation errors
**Fix:** Update CSP headers (already fixed in latest commit)

### Cause 4: API Function Crashing
**Symptom:** `/api/health` returns error
**Fix:** Check function logs, add missing environment variables

## Quick Test

Run this in browser console on the empty page:
```javascript
// Check if root element exists
console.log(document.getElementById('root'));

// Check if React is loaded
console.log(window.React);

// Check for errors
window.addEventListener('error', (e) => console.error('Error:', e));
```

## Next Steps

1. **Check browser console** - This will tell you exactly what's wrong
2. **Share the error message** - I can help fix it
3. **Check Vercel logs** - Look for runtime errors
4. **Verify environment variables** - Add them in Vercel dashboard

