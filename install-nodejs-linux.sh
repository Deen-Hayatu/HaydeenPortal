#!/bin/bash

# Node.js Installation Script for Linux Home Server
# This script installs Node.js 22.x (LTS) on various Linux distributions

set -e

echo "🚀 Node.js Installation for Linux Home Server"
echo "=============================================="

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VER=$VERSION_ID
else
    echo "❌ Cannot detect Linux distribution"
    exit 1
fi

echo "📋 Detected OS: $OS $VER"

# Function to install Node.js on Ubuntu/Debian
install_ubuntu_debian() {
    echo "📦 Installing Node.js on Ubuntu/Debian..."
    
    # Update package list
    sudo apt update
    
    # Install prerequisites
    sudo apt install -y curl gnupg2 software-properties-common
    
    # Add NodeSource repository for Node.js 22.x
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    
    # Install Node.js
    sudo apt install -y nodejs
    
    # Verify installation
    node --version
    npm --version
    
    echo "✅ Node.js installed successfully"
}

# Function to install Node.js on CentOS/RHEL/Fedora
install_centos_rhel() {
    echo "📦 Installing Node.js on CentOS/RHEL/Fedora..."
    
    # Install prerequisites
    sudo yum install -y curl
    
    # Add NodeSource repository for Node.js 22.x
    curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
    
    # Install Node.js
    sudo yum install -y nodejs
    
    # Verify installation
    node --version
    npm --version
    
    echo "✅ Node.js installed successfully"
}

# Function to install Node.js on Arch Linux
install_arch() {
    echo "📦 Installing Node.js on Arch Linux..."
    
    sudo pacman -Syu --noconfirm
    sudo pacman -S --noconfirm nodejs npm
    
    # Verify installation
    node --version
    npm --version
    
    echo "✅ Node.js installed successfully"
}

# Function to install using NVM (Node Version Manager) - works on all distros
install_nvm() {
    echo "📦 Installing Node.js using NVM (recommended)..."
    
    # Install NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Install Node.js 22.x
    nvm install 22
    nvm use 22
    nvm alias default 22
    
    # Verify installation
    node --version
    npm --version
    
    echo "✅ Node.js installed successfully via NVM"
    echo ""
    echo "⚠️  Note: Add these lines to your ~/.bashrc or ~/.zshrc:"
    echo "export NVM_DIR=\"\$HOME/.nvm\""
    echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\""
}

# Main installation logic
case $OS in
    ubuntu|debian)
        install_ubuntu_debian
        ;;
    centos|rhel|fedora)
        install_centos_rhel
        ;;
    arch|manjaro)
        install_arch
        ;;
    *)
        echo "⚠️  Unsupported distribution: $OS"
        echo "📦 Falling back to NVM installation (works on all Linux)..."
        install_nvm
        ;;
esac

echo ""
echo "✅ Node.js installation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Verify: node --version (should show v22.x.x)"
echo "   2. Verify: npm --version"
echo "   3. Run deployment: ./deploy-home-server.sh"
echo ""

