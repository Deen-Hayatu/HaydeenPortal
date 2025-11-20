# Vercel Deployment Checklist

## Pre-Deployment Steps

### 1. Environment Variables Setup
Before deploying, ensure you have these environment variables ready:

**Required:**
- `DATABASE_URL` - Your PostgreSQL connection string (from Neon, Supabase, etc.)
- `SESSION_SECRET` - A secure random string (at least 32 characters)

**Optional but Recommended:**
- `SENDGRID_API_KEY` - For email functionality
- `EMAIL_FROM` - Email address for sending emails (default: noreply@haydeentech.com)
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID
- `NODE_ENV` - Set to "production" (automatically set by Vercel)

### 2. Database Setup
- [ ] Create production database (Neon, Supabase, or similar)
- [ ] Run database migrations: `npm run db:push`
- [ ] Test database connection locally
- [ ] Backup any existing data

### 3. Build Test
- [ ] Run `npm run build` locally to ensure build succeeds
- [ ] Check for TypeScript errors: `npm run check`
- [ ] Verify no console errors

### 4. Git Repository
- [ ] Ensure all changes are committed
- [ ] Push to GitHub/GitLab/Bitbucket
- [ ] Verify `.gitignore` includes sensitive files

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add each variable:
     - `DATABASE_URL` (Production)
     - `SESSION_SECRET` (Production)
     - `SENDGRID_API_KEY` (Production, optional)
     - `EMAIL_FROM` (Production, optional)
     - `VITE_GA_MEASUREMENT_ID` (Production, optional)
   - Make sure to add for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Check deployment logs for errors

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Set up and deploy? **Yes**
     - Which scope? (select your account)
     - Link to existing project? **No** (first time)
     - Project name: **haydeen-technologies** (or your choice)
     - Directory: **./**
     - Override settings? **No** (use vercel.json)

4. **Add Environment Variables via CLI**
   ```bash
   vercel env add DATABASE_URL
   # Paste your database URL when prompted
   # Select: Production, Preview, Development
   
   vercel env add SESSION_SECRET
   # Generate a secure random string
   # You can use: openssl rand -base64 32
   
   vercel env add SENDGRID_API_KEY
   # If using email functionality
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Steps

### 1. Verify Deployment
- [ ] Visit your deployment URL
- [ ] Test homepage loads
- [ ] Test navigation
- [ ] Test contact form
- [ ] Test API endpoints

### 2. Database Verification
- [ ] Verify database connection works
- [ ] Test database queries
- [ ] Check database logs

### 3. Custom Domain (Optional)
- [ ] Add custom domain in Vercel dashboard
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (automatic)

### 4. Monitoring Setup
- [ ] Enable Vercel Analytics (if desired)
- [ ] Set up error monitoring
- [ ] Configure performance monitoring

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Check for TypeScript errors
4. Verify all dependencies are in `package.json`

### Database Connection Issues
1. Verify `DATABASE_URL` is correct
2. Check database allows connections from Vercel IPs
3. Test connection string locally
4. Check database logs

### API Routes Not Working
1. Verify `api/index.ts` exists
2. Check function logs in Vercel dashboard
3. Verify rewrites in `vercel.json`
4. Test API endpoints directly

### Environment Variables Not Working
1. Verify variables are set for correct environment
2. Check variable names match exactly
3. Redeploy after adding variables
4. Use `vercel env ls` to list variables

## Environment Variable Generation

### Generate SESSION_SECRET
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Quick Reference

### Vercel CLI Commands
```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel env ls            # List environment variables
vercel env add KEY       # Add environment variable
vercel env rm KEY        # Remove environment variable
vercel logs              # View deployment logs
vercel domains           # Manage domains
```

### Important URLs
- Vercel Dashboard: https://vercel.com/dashboard
- Project Settings: https://vercel.com/[project]/settings
- Deployment Logs: Check in dashboard under "Deployments"

## Next Steps After Deployment

1. **Test All Features**
   - Contact form
   - Beta signup forms
   - Countdown timers
   - All pages load correctly

2. **Performance Check**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Optimize if needed

3. **SEO Verification**
   - Verify meta tags
   - Check sitemap.xml
   - Verify robots.txt

4. **Monitor**
   - Set up error alerts
   - Monitor performance
   - Track user analytics

## Support

If you encounter issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Check deployment logs in dashboard
3. Test locally first
4. Check environment variables

