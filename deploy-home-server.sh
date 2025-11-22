#!/bin/bash

# Home Server Deployment Script for Haydeen Portal
# Usage: ./deploy-home-server.sh

set -e  # Exit on error

echo "🚀 Haydeen Portal - Home Server Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 22.x or later.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠️  Please edit .env and add your configuration values.${NC}"
    else
        echo -e "${RED}❌ .env.example not found. Please create .env manually.${NC}"
        exit 1
    fi
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed${NC}"

# Build the application
echo ""
echo "🔨 Building application..."
npm run build:all

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed${NC}"

# Check if dist/public exists
if [ ! -d "dist/public" ]; then
    echo -e "${RED}❌ Build output not found in dist/public${NC}"
    exit 1
fi

# Check if dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ Server bundle not found in dist/index.js${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build verification passed${NC}"

# Create logs directory
mkdir -p logs

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  PM2 is not installed. Installing...${NC}"
    
    # Try to install globally first
    if npm install -g pm2 2>/dev/null; then
        echo -e "${GREEN}✅ PM2 installed globally${NC}"
    else
        echo -e "${YELLOW}⚠️  Global install failed (permission issue). Trying with sudo...${NC}"
        if sudo npm install -g pm2; then
            echo -e "${GREEN}✅ PM2 installed globally with sudo${NC}"
        else
            echo -e "${YELLOW}⚠️  Installing PM2 locally instead...${NC}"
            npm install --save-dev pm2
            echo -e "${GREEN}✅ PM2 installed locally${NC}"
            echo -e "${YELLOW}⚠️  Note: You'll need to use 'npx pm2' or './node_modules/.bin/pm2' instead of 'pm2'${NC}"
        fi
    fi
fi

# Determine PM2 command (global or local)
if command -v pm2 &> /dev/null; then
    PM2_CMD="pm2"
elif [ -f "./node_modules/.bin/pm2" ]; then
    PM2_CMD="./node_modules/.bin/pm2"
elif [ -f "./node_modules/pm2/bin/pm2" ]; then
    PM2_CMD="./node_modules/pm2/bin/pm2"
else
    echo -e "${RED}❌ PM2 not found. Please install manually: npm install -g pm2${NC}"
    exit 1
fi

# Stop existing PM2 process if running
echo ""
echo "🛑 Stopping existing process (if any)..."
$PM2_CMD stop haydeen-portal 2>/dev/null || true
$PM2_CMD delete haydeen-portal 2>/dev/null || true

# Start with PM2
echo ""
echo "🚀 Starting application with PM2..."
$PM2_CMD start ecosystem.config.cjs

# Save PM2 configuration
$PM2_CMD save

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📋 Next steps:"
if [ "$PM2_CMD" = "pm2" ]; then
    echo "   1. Check status: pm2 status"
    echo "   2. View logs: pm2 logs haydeen-portal"
    echo "   3. Monitor: pm2 monit"
else
    echo "   1. Check status: $PM2_CMD status"
    echo "   2. View logs: $PM2_CMD logs haydeen-portal"
    echo "   3. Monitor: $PM2_CMD monit"
    echo ""
    echo -e "${YELLOW}⚠️  Note: PM2 is installed locally. Use '$PM2_CMD' instead of 'pm2'${NC}"
fi
echo "   4. Setup nginx (see nginx.conf.example)"
echo ""
echo "🌐 Application should be running on: http://localhost:5000"
echo ""

