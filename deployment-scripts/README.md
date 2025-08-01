# Deployment Scripts for Haydeen Technologies

This folder contains automated scripts to help with the migration and deployment process from Replit to Vercel.

## Scripts Overview

### 1. `vercel-setup.sh`
**Automated Vercel deployment setup script**

Features:
- Checks system requirements (Node.js, npm, git)
- Installs dependencies and Vercel CLI
- Creates template environment files
- Tests local build
- Initializes git repository
- Deploys to Vercel with guided prompts
- Provides post-deployment instructions

Usage:
```bash
chmod +x deployment-scripts/vercel-setup.sh
./deployment-scripts/vercel-setup.sh
```

### 2. `database-setup.sh`
**Interactive database configuration and management**

Features:
- Tests database connection
- Pushes database schema
- Generates migrations
- Seeds database with initial data
- Opens Drizzle Studio for management
- Creates database backups
- Interactive menu system

Usage:
```bash
chmod +x deployment-scripts/database-setup.sh
./deployment-scripts/database-setup.sh
```

## Prerequisites

Before running these scripts, ensure you have:

1. **Local Environment Setup**
   - Node.js 18+ installed
   - Git installed
   - Terminal/bash shell access

2. **Database Provider Account**
   - Neon (recommended)
   - Supabase
   - PlanetScale
   - Or any PostgreSQL provider

3. **Environment Configuration**
   - `.env.local` file with your database credentials
   - Required environment variables configured

## Quick Start

1. **Make scripts executable:**
   ```bash
   chmod +x deployment-scripts/*.sh
   ```

2. **Set up database:**
   ```bash
   ./deployment-scripts/database-setup.sh
   ```

3. **Deploy to Vercel:**
   ```bash
   ./deployment-scripts/vercel-setup.sh
   ```

## Environment Variables Required

Create `.env.local` with these variables:

```env
# Database (Required)
DATABASE_URL=postgresql://username:password@host:port/dbname

# Session Security (Required)
SESSION_SECRET=your_secure_random_string_at_least_32_characters

# Email (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
NODE_ENV=development
```

## Script Features

### Error Handling
- Comprehensive error checking at each step
- Clear error messages with suggested fixes
- Graceful handling of interruptions (Ctrl+C)

### Interactive Prompts
- Step-by-step guidance through deployment process
- Confirmation prompts for critical operations
- Menu-driven interface for database operations

### Validation
- Checks system requirements before proceeding
- Validates environment configuration
- Tests builds and connections before deployment

### Logging
- Clear progress indicators
- Success/failure status for each operation
- Helpful tips and next steps

## Troubleshooting

### Common Issues

**Permission Denied:**
```bash
chmod +x deployment-scripts/*.sh
```

**Missing Dependencies:**
```bash
# Install Node.js 18+
# Install Git
# Install npm packages: npm install
```

**Database Connection Issues:**
```bash
# Check DATABASE_URL format
# Verify database server is running
# Check firewall/network access
```

**Build Failures:**
```bash
npm run type-check  # Check TypeScript errors
npm run lint       # Check ESLint errors
npm run build      # Test local build
```

### Getting Help

1. **Check logs:** Scripts provide detailed error messages
2. **Verify environment:** Ensure all required variables are set
3. **Test components:** Run individual steps manually if needed
4. **Consult documentation:** See `VERCEL_MIGRATION_GUIDE.md` for detailed instructions

## Manual Alternatives

If scripts don't work in your environment, you can run commands manually:

**Database Setup:**
```bash
npm run db:push
npm run db:generate
npm run db:seed
npm run db:studio
```

**Vercel Deployment:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Security Notes

- Scripts handle sensitive data (database URLs) safely
- Environment variables are loaded but not displayed
- No credentials are logged or stored by scripts
- Always review scripts before running in production

## Contributing

To improve these scripts:

1. Test on different operating systems
2. Add support for additional database providers
3. Enhance error messages and user guidance
4. Add more automated validation steps

---

*These scripts are designed to make the migration process as smooth as possible. For detailed documentation, see `VERCEL_MIGRATION_GUIDE.md`.*