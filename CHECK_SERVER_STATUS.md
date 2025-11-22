# Check Server Status After Restart

## The server restarted but curl can't connect. Check what's happening:

```bash
# 1. Check PM2 status
pm2 status

# 2. Check recent logs for errors
pm2 logs haydeen-portal --lines 30

# 3. Check if process is listening on port 5000
sudo netstat -tulpn | grep 5000

# 4. Check for any startup errors
pm2 logs haydeen-portal --err --lines 20
```

## Common Issues After Restart

### Issue 1: Server Still Starting
The server might need a few seconds to start. Wait 5 seconds and try again:
```bash
sleep 5
curl http://localhost:5000/api/health
```

### Issue 2: Server Crashed
If the server crashed, check logs:
```bash
pm2 logs haydeen-portal --err
```

Look for:
- Configuration errors
- Database connection errors
- Port already in use
- Missing dependencies

### Issue 3: Port Already in Use
Check if something else is using port 5000:
```bash
sudo lsof -i :5000
# or
sudo netstat -tulpn | grep 5000
```

### Issue 4: Environment Variables Not Loaded
PM2 might need to reload environment:
```bash
pm2 restart haydeen-portal --update-env
```

## Quick Diagnostic Commands

Run these to diagnose:

```bash
# Check if PM2 process is running
pm2 list

# Check detailed status
pm2 describe haydeen-portal

# Check all logs
pm2 logs haydeen-portal --lines 50

# Check only errors
pm2 logs haydeen-portal --err --lines 50

# Check if port is listening
sudo ss -tulpn | grep 5000
```

## If Server Crashed

1. **Check error logs**:
   ```bash
   pm2 logs haydeen-portal --err
   ```

2. **Check if build is correct**:
   ```bash
   ls -la dist/index.js
   ```

3. **Try starting manually** (to see errors directly):
   ```bash
   cd /home/haydeentech/HaydeenPortal
   NODE_ENV=production node dist/index.js
   ```

4. **If manual start works**, restart PM2:
   ```bash
   pm2 restart haydeen-portal
   ```

## Expected Log Output

When server starts correctly, you should see:
```
[INFO] Configuration validated successfully
[INFO] Created upload directory
serving on port 5000
[INFO] Database connection established successfully
```

If you see errors instead, share them and we can fix them.

