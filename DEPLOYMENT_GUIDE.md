# Deployment Guide: VS Code Development & Vercel Hosting

## Prerequisites
- Node.js 18+ installed
- Git installed
- VS Code installed
- Vercel CLI installed (`npm i -g vercel`)
- PostgreSQL database (Neon, Supabase, or PlanetScale recommended)

## Step 1: Project Setup in VS Code

### 1.1 Clone/Download Project
```bash
# If using Git
git clone <your-repo-url>
cd haydeen-technologies

# Or download and extract the project files
```

### 1.2 Install Dependencies
```bash
npm install
```

### 1.3 VS Code Extensions (Recommended)
Install these extensions for optimal development:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### 1.4 VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Step 2: Environment Configuration

### 2.1 Create Environment Files
Create `.env.local` (for development):
```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Optional: Analytics
VITE_GA_MEASUREMENT_ID=your_google_analytics_id

# Email (if using SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key

# Session Secret
SESSION_SECRET=your_secure_random_string
```

### 2.2 Update Environment Variables
- Replace Replit's PostgreSQL with your own database
- Get a connection string from Neon, Supabase, or PlanetScale
- Update all environment references

## Step 3: Database Setup

### 3.1 Choose a Database Provider
**Recommended Options:**
- **Neon** (PostgreSQL, generous free tier)
- **Supabase** (PostgreSQL with additional features)
- **PlanetScale** (MySQL-compatible)

### 3.2 Database Migration
```bash
# Push schema to your new database
npm run db:push

# Or generate and run migrations
npm run db:generate
npm run db:migrate
```

### 3.3 Seed Data (Optional)
```bash
# If you have seed data
npm run db:seed
```

## Step 4: Local Development

### 4.1 Start Development Server
```bash
npm run dev
```

### 4.2 Verify Functionality
- Test all pages and features
- Verify database connections
- Test contact forms
- Check mobile responsiveness

## Step 5: Vercel Deployment

### 5.1 Prepare for Deployment
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 5.2 Update package.json Scripts
Add Vercel build script:
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && npm run build",
    "build:server": "tsc server/**/*.ts --outDir dist/server",
    "vercel-build": "npm run build:client"
  }
}
```

### 5.3 Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set build command: npm run build
# - Set output directory: client/dist
# - Set install command: npm install
```

### 5.4 Configure Environment Variables in Vercel
In Vercel dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all variables from your `.env.local`:
   - `DATABASE_URL`
   - `VITE_GA_MEASUREMENT_ID`
   - `SENDGRID_API_KEY`
   - `SESSION_SECRET`

## Step 6: Domain & SSL Setup

### 6.1 Custom Domain (Optional)
1. In Vercel dashboard, go to Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

### 6.2 Update Meta Tags
Update `client/index.html` with your production URL:
```html
<meta property="og:url" content="https://your-domain.com" />
<meta property="twitter:url" content="https://your-domain.com" />
<link rel="canonical" href="https://your-domain.com" />
```

## Step 7: Post-Deployment Verification

### 7.1 Test Production Site
- [ ] All pages load correctly
- [ ] Database operations work
- [ ] Contact forms submit successfully
- [ ] Mobile responsiveness
- [ ] SEO meta tags
- [ ] Performance (Google PageSpeed Insights)

### 7.2 Monitor & Analytics
- Set up Google Analytics (if configured)
- Monitor Vercel deployment logs
- Check database performance
- Set up error monitoring (Sentry recommended)

## Step 8: Ongoing Development Workflow

### 8.1 Git Workflow
```bash
# Make changes
git add .
git commit -m "Feature: description"
git push origin main

# Vercel auto-deploys from main branch
```

### 8.2 Preview Deployments
- Every pull request gets a preview URL
- Test changes before merging to main
- Vercel provides deployment previews

## Step 9: Performance Optimization

### 9.1 Image Optimization
- Use Vercel's Image Optimization
- Replace static images with next/image equivalent
- Implement lazy loading

### 9.2 Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### 9.3 Caching Strategy
- Static assets cached automatically
- Configure API caching headers
- Use Vercel Edge Functions for dynamic content

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check build logs in Vercel dashboard
2. **Database Connection**: Verify connection string and firewall settings
3. **Environment Variables**: Ensure all required vars are set in Vercel
4. **Static Files**: Check file paths and imports
5. **API Routes**: Verify serverless function configuration

### Debug Commands:
```bash
# Local build test
npm run build

# Type checking
npx tsc --noEmit

# Lint check
npx eslint . --ext .ts,.tsx

# Database connection test
npm run db:studio
```

## Security Checklist
- [ ] Environment variables properly configured
- [ ] Database access restricted
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Security headers configured
- [ ] API rate limiting enabled
- [ ] Input validation implemented

## Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Database Docs](https://neon.tech/docs)
- [Drizzle ORM Guide](https://orm.drizzle.team/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)