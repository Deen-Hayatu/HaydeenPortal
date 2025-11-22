# Home Server Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- PM2 (will be installed automatically)
- Nginx (optional, for reverse proxy)
- PostgreSQL database (if using database features)

## Quick Start

### 1. Clone and Setup

```bash
cd /path/to/HaydeenPortal
cp .env.example .env
# Edit .env with your configuration
```

### 2. Deploy

```bash
chmod +x deploy-home-server.sh
./deploy-home-server.sh
```

This script will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Build the application (client + server)
- ✅ Start with PM2 process manager
- ✅ Create logs directory

### 3. Verify

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs haydeen-portal

# Test the application
curl http://localhost:5000/api/health
```

## Manual Deployment

If you prefer to deploy manually:

```bash
# 1. Install dependencies
npm install

# 2. Build everything
npm run build:all

# 3. Start with PM2
pm2 start ecosystem.config.js

# 4. Save PM2 config
pm2 save
```

## Nginx Setup (Recommended)

### 1. Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### 2. Configure Nginx

```bash
# Copy example config
sudo cp nginx.conf.example /etc/nginx/sites-available/haydeen-portal

# Edit the config
sudo nano /etc/nginx/sites-available/haydeen-portal

# Update paths:
# - Replace /path/to/HaydeenPortal with your actual path
# - Replace your-domain.com with your domain
# - Update port if not using 5000

# Enable site
sudo ln -s /etc/nginx/sites-available/haydeen-portal /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 3. Firewall Setup

```bash
# Allow HTTP (port 80)
sudo ufw allow 80/tcp

# Allow HTTPS (port 443) - if using SSL
sudo ufw allow 443/tcp

# Allow Node.js port (if not using Nginx)
sudo ufw allow 5000/tcp
```

## SSL Certificate (Let's Encrypt)

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Get Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. Auto-renewal

Certbot sets up auto-renewal automatically. Test with:

```bash
sudo certbot renew --dry-run
```

## PM2 Management

### Basic Commands

```bash
# View status
pm2 status

# View logs
pm2 logs haydeen-portal

# Restart
pm2 restart haydeen-portal

# Stop
pm2 stop haydeen-portal

# Delete
pm2 delete haydeen-portal

# Monitor (real-time)
pm2 monit

# Save current process list
pm2 save

# Startup script (auto-start on boot)
pm2 startup
# Follow the instructions it prints
```

### Viewing Logs

```bash
# All logs
pm2 logs haydeen-portal

# Error logs only
pm2 logs haydeen-portal --err

# Last 100 lines
pm2 logs haydeen-portal --lines 100
```

## Environment Variables

Create `.env` file with:

```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/haydeen

# Email (Optional)
SENDGRID_API_KEY=your_key_here
EMAIL_FROM=noreply@yourdomain.com

# Session
SESSION_SECRET=your_secure_random_string_32_chars_minimum
```

## Troubleshooting

### Application won't start

1. Check logs: `pm2 logs haydeen-portal`
2. Verify build: `ls -la dist/`
3. Check environment: `cat .env`
4. Test database connection
5. Check port availability: `netstat -tulpn | grep 5000`

### Static files not loading

1. Verify build output: `ls -la dist/public/assets/`
2. Check Nginx config paths
3. Verify file permissions: `chmod -R 755 dist/public`

### API routes not working

1. Check Nginx proxy config
2. Verify Node.js server is running: `pm2 status`
3. Check API logs: `pm2 logs haydeen-portal | grep api`

### Database connection issues

1. Verify DATABASE_URL in .env
2. Test connection: `psql $DATABASE_URL`
3. Check database is running
4. Verify firewall allows connections

## Updating the Application

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies (if any)
npm install

# 3. Rebuild
npm run build:all

# 4. Restart PM2
pm2 restart haydeen-portal
```

## Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Process info
pm2 describe haydeen-portal

# Memory usage
pm2 list
```

### System Monitoring

```bash
# Check system resources
htop

# Check disk space
df -h

# Check network
netstat -tulpn
```

## Backup

### Database Backup

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Application Backup

```bash
# Backup entire directory
tar -czf haydeen-portal-backup-$(date +%Y%m%d).tar.gz /path/to/HaydeenPortal
```

## Security Checklist

- [ ] Firewall configured (UFW/iptables)
- [ ] Nginx security headers enabled
- [ ] SSL certificate installed
- [ ] Environment variables secured (.env not in git)
- [ ] Database credentials strong
- [ ] Regular backups scheduled
- [ ] PM2 auto-restart enabled
- [ ] Log rotation configured

## Support

For issues:
1. Check PM2 logs: `pm2 logs haydeen-portal`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check system logs: `journalctl -u nginx -f`

