# Setup Environment Variables

## Quick Fix

Your application is running but needs environment variables configured. Create a `.env` file:

```bash
# On your Linux server
cd /home/haydeentech/HaydeenPortal

# Copy example file
cp .env.example .env

# Edit with your settings
nano .env
```

## Required Variables

### Minimum Required (for basic operation)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/haydeen
SESSION_SECRET=your_secure_random_string_at_least_32_characters_long
```

### Database Setup Options

#### Option 1: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Install PostgreSQL (if not installed)
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE haydeen;
CREATE USER haydeen_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE haydeen TO haydeen_user;
\q
```

Then in `.env`:
```env
DATABASE_URL=postgresql://haydeen_user:your_secure_password@localhost:5432/haydeen
```

#### Option 2: Remote Database (Neon, Supabase, etc.)

If using a cloud database:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

#### Option 3: Skip Database (for testing)

If you just want to test the frontend without database:

```env
# Set a dummy DATABASE_URL (API routes will return 503, but frontend will work)
DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
```

**Note**: With a dummy URL, API routes will fail, but the static frontend will still work.

## Complete .env Example

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/haydeen

# Session Secret (Required - generate a random string)
SESSION_SECRET=your_secure_random_string_at_least_32_characters_long_use_openssl_rand_hex_32

# Email Configuration (Optional - for contact forms)
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_FROM=noreply@yourdomain.com

# Google Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Generate Secure Session Secret

```bash
# Generate a secure random string
openssl rand -hex 32
```

Copy the output and use it as your `SESSION_SECRET`.

## After Creating .env

1. **Restart PM2** to load new environment variables:

```bash
pm2 restart haydeen-portal
```

2. **Check logs** to verify it's working:

```bash
pm2 logs haydeen-portal --lines 20
```

3. **Test the API**:

```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{"status":"healthy","timestamp":"2024-..."}
```

## Troubleshooting

### Still getting DATABASE_URL error?

1. **Check .env file exists**:
   ```bash
   ls -la .env
   ```

2. **Verify file contents**:
   ```bash
   cat .env
   ```

3. **Check for syntax errors** (no spaces around `=`):
   ```bash
   # ✅ Correct
   DATABASE_URL=postgresql://...
   
   # ❌ Wrong
   DATABASE_URL = postgresql://...
   ```

4. **Restart PM2** after changes:
   ```bash
   pm2 restart haydeen-portal
   ```

### Database Connection Issues

If you get database connection errors:

1. **Test connection**:
   ```bash
   psql $DATABASE_URL
   ```

2. **Check PostgreSQL is running**:
   ```bash
   sudo systemctl status postgresql
   ```

3. **Check firewall** (if using remote database):
   ```bash
   sudo ufw status
   ```

## Quick Start (No Database)

If you just want to see the frontend working without setting up a database:

```bash
# Create minimal .env
cat > .env << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
SESSION_SECRET=$(openssl rand -hex 32)
EOF

# Restart PM2
pm2 restart haydeen-portal

# Check status
pm2 logs haydeen-portal
```

The frontend will work, but API routes (contact forms, etc.) will return 503 errors.

