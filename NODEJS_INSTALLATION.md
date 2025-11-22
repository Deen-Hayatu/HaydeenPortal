# Node.js Installation Guide for Linux Home Server

## Quick Answer

**Yes, you need Node.js installed on your Linux home server.**

Your project requires Node.js 22.x (as specified in `package.json`).

## Installation Methods

### Method 1: Automated Script (Recommended)

```bash
# On your Linux server
chmod +x install-nodejs-linux.sh
./install-nodejs-linux.sh
```

This script automatically detects your Linux distribution and installs Node.js 22.x.

### Method 2: Manual Installation by Distribution

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install prerequisites
sudo apt install -y curl gnupg2 software-properties-common

# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify
node --version  # Should show v22.x.x
npm --version
```

#### CentOS/RHEL/Fedora

```bash
# Install curl
sudo yum install -y curl

# Add NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -

# Install Node.js
sudo yum install -y nodejs

# Verify
node --version
npm --version
```

#### Arch Linux

```bash
sudo pacman -Syu
sudo pacman -S nodejs npm

# Verify
node --version
npm --version
```

### Method 3: Using NVM (Node Version Manager) - Works on All Linux

NVM allows you to install and manage multiple Node.js versions.

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc

# Install Node.js 22.x
nvm install 22
nvm use 22
nvm alias default 22

# Verify
node --version
npm --version
```

**Important**: Add these lines to your `~/.bashrc` or `~/.zshrc`:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Verify Installation

After installation, verify:

```bash
# Check Node.js version (should be 22.x.x)
node --version

# Check npm version
npm --version

# Check installation location
which node
which npm
```

## Requirements

- **Node.js**: Version 22.x (as specified in `package.json`)
- **npm**: Comes with Node.js (usually version 10.x+)
- **Minimum**: Node.js 18.x will work, but 22.x is recommended

## Troubleshooting

### "Command not found" after installation

1. **Reload your shell**:
   ```bash
   source ~/.bashrc
   # or
   source ~/.zshrc
   ```

2. **Check PATH**:
   ```bash
   echo $PATH
   which node
   ```

3. **For NVM users**: Make sure NVM is loaded in your shell config

### Permission errors

If you get permission errors, you might need to:
```bash
# Fix npm permissions (if using system Node.js)
sudo chown -R $(whoami) ~/.npm
```

### Wrong Node.js version

If you have an older version:
```bash
# Using NVM (recommended)
nvm install 22
nvm use 22

# Or reinstall using package manager
# (remove old version first)
```

## After Installation

Once Node.js is installed:

1. **Navigate to your project**:
   ```bash
   cd /path/to/HaydeenPortal
   ```

2. **Run deployment**:
   ```bash
   ./deploy-home-server.sh
   ```

The deployment script will:
- ✅ Check Node.js version automatically
- ✅ Install dependencies
- ✅ Build the application
- ✅ Start with PM2

## Quick Check

Run this on your Linux server to check if Node.js is already installed:

```bash
node --version && echo "✅ Node.js is installed" || echo "❌ Node.js is not installed"
```

If it shows a version (especially v22.x.x), you're good to go!

