# Troubleshoot ERR_CONNECTION_REFUSED

## What This Error Means

`ERR_CONNECTION_REFUSED` means your browser cannot connect to the server. The server might be:
- Not running
- Blocked by firewall
- Not accessible from your network
- Listening on wrong interface

## Quick Checks

### 1. Verify Server is Running

On your Linux server:

```bash
# Check PM2 status
pm2 status

# Should show: online

# Check if process is listening on port 5000
sudo netstat -tulpn | grep 5000
# or
sudo ss -tulpn | grep 5000

# Should show something like:
# tcp  0  0  0.0.0.0:5000  LISTEN  233694/node
```

### 2. Test from Server Itself

On your Linux server:

```bash
# Test localhost
curl http://localhost:5000/api/health

# Test with server's IP
curl http://YOUR_SERVER_IP:5000/api/health

# Replace YOUR_SERVER_IP with actual IP (find with: hostname -I)
```

If this works, the server is running correctly.

### 3. Check Firewall

The firewall might be blocking port 5000:

```bash
# Check firewall status (Ubuntu/Debian)
sudo ufw status

# Allow port 5000
sudo ufw allow 5000/tcp

# Check firewall status (CentOS/RHEL)
sudo firewall-cmd --list-all

# Allow port 5000 (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```

### 4. Find Your Server's IP Address

On your Linux server:

```bash
# Get IP address
hostname -I

# Or
ip addr show

# Look for inet address (usually starts with 192.168.x.x or 10.x.x.x)
```

### 5. Test from Your Local Computer

From your local machine (not the server):

```bash
# Replace YOUR_SERVER_IP with the actual IP
curl http://YOUR_SERVER_IP:5000/api/health

# Or test in browser:
# http://YOUR_SERVER_IP:5000
```

## Common Scenarios

### Scenario 1: Accessing from Same Network

If you're on the same network as the server:

1. **Find server IP**: `hostname -I` on server
2. **Open in browser**: `http://SERVER_IP:5000`
3. **Allow firewall**: `sudo ufw allow 5000/tcp`

### Scenario 2: Accessing from Different Network (Internet)

You need to:

1. **Port forwarding** on your router (forward port 5000 to server IP)
2. **Dynamic DNS** (if IP changes) or use your public IP
3. **Allow firewall**: `sudo ufw allow 5000/tcp`
4. **Access via**: `http://YOUR_PUBLIC_IP:5000` or `http://your-domain.com:5000`

**Security Note**: Exposing port 5000 directly is not recommended. Use Nginx reverse proxy with SSL instead.

### Scenario 3: Using Nginx Reverse Proxy (Recommended)

Instead of exposing port 5000, use Nginx:

1. **Install Nginx**:
   ```bash
   sudo apt install nginx
   ```

2. **Configure Nginx** (see `nginx.conf.example`):
   ```bash
   sudo cp nginx.conf.example /etc/nginx/sites-available/haydeen-portal
   sudo nano /etc/nginx/sites-available/haydeen-portal
   # Update paths and domain
   sudo ln -s /etc/nginx/sites-available/haydeen-portal /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Allow ports 80/443**:
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. **Access via**: `http://your-domain.com` (no port needed)

## Verify Server Configuration

Check that the server is listening on all interfaces (0.0.0.0):

```bash
# On server, check what the server is listening on
sudo netstat -tulpn | grep 5000

# Should show: 0.0.0.0:5000 (not 127.0.0.1:5000)
```

If it shows `127.0.0.1:5000`, the server is only listening on localhost and won't accept external connections.

## Quick Fix Commands

Run these on your Linux server:

```bash
# 1. Check server is running
pm2 status

# 2. Check what's listening on port 5000
sudo netstat -tulpn | grep 5000

# 3. Get server IP
hostname -I

# 4. Allow firewall (Ubuntu/Debian)
sudo ufw allow 5000/tcp

# 5. Test from server
curl http://localhost:5000/api/health
```

Then from your browser, try:
- `http://SERVER_IP:5000` (replace SERVER_IP with actual IP)

## Still Not Working?

### Check Server Logs

```bash
pm2 logs haydeen-portal --lines 50
```

Look for any errors or connection issues.

### Test Network Connectivity

From your local machine:

```bash
# Test if you can reach the server
ping YOUR_SERVER_IP

# Test if port 5000 is open
telnet YOUR_SERVER_IP 5000
# or
nc -zv YOUR_SERVER_IP 5000
```

If ping works but telnet/nc fails, the firewall is blocking the port.

### Check Router Settings

If accessing from outside your network:
- Check router port forwarding settings
- Verify port 5000 is forwarded to server's local IP
- Check if your ISP blocks incoming connections

## Security Recommendation

**Don't expose port 5000 directly to the internet.** Instead:

1. Use Nginx reverse proxy (port 80/443)
2. Set up SSL with Let's Encrypt
3. Keep port 5000 only accessible internally
4. Use firewall rules to restrict access

See `HOME_SERVER_DEPLOYMENT.md` for Nginx setup instructions.

