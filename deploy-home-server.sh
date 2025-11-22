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
    echo -e "${YELLOW}⚠️  PM2 is not installed. Installing globally...${NC}"
    npm install -g pm2
fi

# Stop existing PM2 process if running
echo ""
echo "🛑 Stopping existing process (if any)..."
pm2 stop haydeen-portal 2>/dev/null || true
pm2 delete haydeen-portal 2>/dev/null || true

# Start with PM2
echo ""
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📋 Next steps:"
echo "   1. Check status: pm2 status"
echo "   2. View logs: pm2 logs haydeen-portal"
echo "   3. Monitor: pm2 monit"
echo "   4. Setup nginx (see nginx.conf.example)"
echo ""
echo "🌐 Application should be running on: http://localhost:5000"
echo ""

