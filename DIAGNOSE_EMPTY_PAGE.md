# Diagnose Empty Page Issue

## Critical: Check Browser Console

The empty page is likely due to a JavaScript error. **Please check the browser console** (F12 → Console tab) and share:

1. **Any red error messages** - These will tell us exactly what's wrong
2. **Network tab** - Check if `/assets/index-*.js` loads (should be 200, not 404)
3. **Elements tab** - Check if `<div id="root">` exists and has content

## Common Causes

### 1. JavaScript File Not Loading (404)
**Check:** Network tab → Look for `/assets/index-*.js`
**Fix:** Verify build output, check `vercel.json` outputDirectory

### 2. JavaScript Error on Page Load
**Check:** Console tab → Look for red errors
**Common errors:**
- `Cannot read property of undefined`
- `Module not found`
- `Failed to fetch`
- CSP violations

### 3. React Not Mounting
**Check:** Elements tab → Is `<div id="root">` empty?
**Fix:** Check `main.tsx` and `App.tsx` for errors

### 4. API Calls Failing
**Check:** Network tab → Look for failed `/api/*` requests
**Fix:** Add environment variables in Vercel

## Quick Test Commands

Run these in browser console on the empty page:

```javascript
// 1. Check if root element exists
console.log('Root element:', document.getElementById('root'));

// 2. Check if React loaded
console.log('React:', window.React);

// 3. Check for errors
window.addEventListener('error', (e) => {
  console.error('Page error:', e.error, e.message, e.filename, e.lineno);
});

// 4. Check if scripts loaded
console.log('Scripts:', document.querySelectorAll('script'));
```

## What to Share

Please share:
1. **Console errors** (copy/paste the red error messages)
2. **Network tab** - Screenshot or list of failed requests
3. **Vercel function logs** - Any errors in the API function

This will help me identify the exact issue!

