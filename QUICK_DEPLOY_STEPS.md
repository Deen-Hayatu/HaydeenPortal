# Quick Deployment Steps

## ✅ Node.js Installed
- Node.js: v22.21.0 ✅
- npm: 10.9.4 ✅

## Next Steps

### 1. Navigate to Project Directory

```bash
cd /path/to/HaydeenPortal
```

### 2. Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your settings
nano .env
```

**Required variables:**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/haydeen
SESSION_SECRET=your_secure_random_string_32_chars_minimum
```

**Optional variables:**
```env
SENDGRID_API_KEY=your_key_here
EMAIL_FROM=noreply@yourdomain.com
```

### 3. Run Deployment Script

```bash
# Make sure script is executable
chmod +x deploy-home-server.sh

# Run deployment
./deploy-home-server.sh
```

The script will:
- ✅ Check Node.js version
- ✅ Install npm dependencies
- ✅ Build the application (client + server)
- ✅ Start with PM2 process manager
- ✅ Create logs directory

### 4. Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs haydeen-portal

# Test API endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":"2024-..."}
```

### 5. Access Your Application

- **Direct access**: `http://your-server-ip:5000`
- **With Nginx** (optional): `http://your-domain.com`

## Troubleshooting

### If deployment fails:

1. **Check logs**:
   ```bash
   pm2 logs haydeen-portal --lines 50
   ```

2. **Verify build output**:
   ```bash
   ls -la dist/public/assets/
   ls -la dist/index.js
   ```

3. **Check environment**:
   ```bash
   cat .env
   ```

4. **Test database connection** (if using database):
   ```bash
   psql $DATABASE_URL
   ```

### Common Issues

**Port already in use:**
```bash
# Check what's using port 5000
sudo netstat -tulpn | grep 5000

# Or change PORT in .env
```

**Permission errors:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

**Build fails:**
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build:all
```

## Next: Setup Nginx (Optional but Recommended)

See `HOME_SERVER_DEPLOYMENT.md` for Nginx reverse proxy setup.

