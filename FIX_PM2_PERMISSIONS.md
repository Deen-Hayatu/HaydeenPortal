# Fix PM2 Installation Permission Issues

## Quick Fix

If you got a permission error installing PM2, here are your options:

### Option 1: Install PM2 with sudo (Recommended)

```bash
sudo npm install -g pm2
```

Then run the deployment script again:
```bash
./deploy-home-server.sh
```

### Option 2: Fix npm permissions (Better long-term solution)

This allows you to install global packages without sudo:

```bash
# Create a directory for global packages
mkdir ~/.npm-global

# Configure npm to use this directory
npm config set prefix '~/.npm-global'

# Add to your PATH (add this line to ~/.bashrc or ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Reload your shell
source ~/.bashrc  # or source ~/.zshrc

# Now install PM2
npm install -g pm2
```

### Option 3: Install PM2 locally (No global install needed)

The updated deployment script will automatically install PM2 locally if global install fails:

```bash
# Just run the deployment script - it will handle it
./deploy-home-server.sh
```

If PM2 is installed locally, use:
```bash
# Instead of: pm2 status
./node_modules/.bin/pm2 status

# Or use npx:
npx pm2 status
```

## Verify PM2 Installation

```bash
# Check if PM2 is installed
pm2 --version

# Or if installed locally:
./node_modules/.bin/pm2 --version
npx pm2 --version
```

## After Fixing Permissions

Run the deployment script again:
```bash
./deploy-home-server.sh
```

The script will now:
- ✅ Detect PM2 (global or local)
- ✅ Use the correct command automatically
- ✅ Start your application

## Alternative: Use systemd instead of PM2

If you prefer not to use PM2, you can create a systemd service instead. See `HOME_SERVER_DEPLOYMENT.md` for details.

