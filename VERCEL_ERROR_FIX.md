# Fix: Vercel "routes cannot be present" Error

## Problem
You're getting this error:
```
If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present.
```

## Solution

### Option 1: Clear Vercel Project Settings (Recommended)

If you're deploying via Vercel Dashboard:

1. **Go to your project in Vercel Dashboard**
2. **Settings → General**
3. **Scroll down to "Build & Development Settings"**
4. **Check if there's a "Routes" configuration** in the dashboard
5. **Remove any "Routes" configuration** if present
6. **Save settings**
7. **Redeploy**

### Option 2: Delete and Recreate Project

If the error persists:

1. **Delete the project** in Vercel dashboard
2. **Create a new project** from the same repository
3. **Use the `vercel.json` from your repository** (don't configure routes in dashboard)
4. **Deploy**

### Option 3: Use Vercel CLI

Deploy via CLI to ensure your `vercel.json` is used:

```bash
# Remove any cached Vercel config
rm -rf .vercel

# Deploy fresh
vercel --prod
```

### Option 4: Verify vercel.json

Make sure your `vercel.json`:
- ✅ Does NOT have a `routes` field
- ✅ Only has `rewrites` and `headers` (or other allowed fields)
- ✅ Is valid JSON

Current `vercel.json` structure:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [...],
  "headers": [...],
  "functions": {...}
}
```

## Common Causes

1. **Dashboard Configuration Override**: Vercel dashboard settings might have a "Routes" configuration that overrides `vercel.json`
2. **Cached Configuration**: Old project settings cached
3. **Multiple Config Files**: Check for other config files that might have `routes`

## Verification

After fixing, verify:
- ✅ No `routes` field in `vercel.json`
- ✅ No routes configured in Vercel dashboard
- ✅ Deployment succeeds without error

## Still Having Issues?

1. Check Vercel dashboard project settings
2. Remove any "Routes" configuration
3. Ensure `vercel.json` is committed to your repository
4. Try deploying via CLI instead of dashboard

