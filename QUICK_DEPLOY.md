# Quick Vercel Deployment Guide

## 🚀 Fast Track Deployment

### Step 1: Prepare Environment Variables

Generate a secure SESSION_SECRET:
```bash
openssl rand -base64 32
```

You'll need:
- `DATABASE_URL` - Your PostgreSQL connection string
- `SESSION_SECRET` - Generated secure string (32+ characters)
- `SENDGRID_API_KEY` - (Optional) For email functionality
- `EMAIL_FROM` - (Optional) Default: noreply@haydeentech.com
- `VITE_GA_MEASUREMENT_ID` - (Optional) Google Analytics ID

### Step 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add each variable for **Production**, **Preview**, and **Development**:
     ```
     DATABASE_URL=your_database_url
     SESSION_SECRET=your_generated_secret
     SENDGRID_API_KEY=your_sendgrid_key (optional)
     EMAIL_FROM=noreply@haydeentech.com (optional)
     VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX (optional)
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your site will be live at: `https://your-project.vercel.app`

### Step 3: Verify Deployment

- [ ] Visit your deployment URL
- [ ] Test homepage loads
- [ ] Test contact form
- [ ] Test API: `https://your-project.vercel.app/api/health`
- [ ] Check database connection works

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS as instructed
4. SSL certificate is automatic

## 🔧 Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Run `npm run build` locally first
- Verify all dependencies are in package.json

**Database connection issues?**
- Verify DATABASE_URL is correct
- Check database allows external connections
- Test connection string locally

**API not working?**
- Check function logs in Vercel dashboard
- Verify environment variables are set
- Test `/api/health` endpoint

## 📝 Next Steps

1. Test all features on production
2. Set up monitoring
3. Configure custom domain
4. Enable analytics

## 🎉 You're Live!

Your site is now deployed to Vercel. Every push to your main branch will automatically deploy.

