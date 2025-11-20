#!/bin/bash

# Vercel Deployment Setup Script for Haydeen Technologies
# This script automates the initial Vercel deployment setup

echo "🚀 Haydeen Technologies - Vercel Deployment Setup"
echo "================================================="

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed. Please install Git and try again."
        exit 1
    fi
    
    echo "✅ All requirements satisfied"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
}

# Install Vercel CLI if not present
install_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
        
        if [ $? -eq 0 ]; then
            echo "✅ Vercel CLI installed successfully"
        else
            echo "❌ Failed to install Vercel CLI"
            exit 1
        fi
    else
        echo "✅ Vercel CLI already installed"
    fi
}

# Check if .env.local exists
check_environment() {
    if [ ! -f ".env.local" ]; then
        echo "⚠️  .env.local file not found"
        echo "📝 Creating template .env.local file..."
        
        cat > .env.local << EOF
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/dbname

# Email Configuration (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Session Security
SESSION_SECRET=your_secure_random_string_at_least_32_characters

# Development
NODE_ENV=development
EOF
        
        echo "✅ Template .env.local created"
        echo "⚠️  Please update .env.local with your actual values before proceeding"
        echo ""
        echo "Required updates:"
        echo "1. DATABASE_URL - Your PostgreSQL connection string"
        echo "2. SESSION_SECRET - Generate a secure random string"
        echo "3. SENDGRID_API_KEY - Your SendGrid API key (if using email)"
        echo "4. VITE_GA_MEASUREMENT_ID - Your Google Analytics ID (if using analytics)"
        echo ""
        read -p "Press Enter after updating .env.local to continue..."
    else
        echo "✅ .env.local file exists"
    fi
}

# Test local build
test_build() {
    echo "🔨 Testing local build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Local build successful"
    else
        echo "❌ Local build failed. Please fix errors before deploying."
        exit 1
    fi
}

# Run type checking
run_type_check() {
    echo "🔍 Running type check..."
    npm run type-check 2>/dev/null || npx tsc --noEmit
    
    if [ $? -eq 0 ]; then
        echo "✅ Type check passed"
    else
        echo "⚠️  Type check found issues. Consider fixing them before deployment."
    fi
}

# Initialize git repository if needed
setup_git() {
    if [ ! -d ".git" ]; then
        echo "📂 Initializing git repository..."
        git init
        git add .
        git commit -m "Initial commit: Haydeen Technologies website"
        echo "✅ Git repository initialized"
        echo "💡 Consider pushing to GitHub for better deployment workflow"
    else
        echo "✅ Git repository already exists"
    fi
}

# Login to Vercel
vercel_login() {
    echo "🔐 Vercel login required..."
    vercel login
    
    if [ $? -eq 0 ]; then
        echo "✅ Vercel login successful"
    else
        echo "❌ Vercel login failed"
        exit 1
    fi
}

# Deploy to Vercel
deploy_to_vercel() {
    echo "🚀 Deploying to Vercel..."
    echo "📝 Follow the prompts:"
    echo "   - Set up and deploy? Yes"
    echo "   - Link to existing project? No (for first deployment)"
    echo "   - Project name: haydeen-technologies"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: dist/public"
    echo "   - Development Command: npm run dev"
    echo ""
    
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo ""
        echo "🎉 Your Haydeen Technologies website is now live!"
        echo ""
        echo "📋 Next steps:"
        echo "1. Configure environment variables in Vercel dashboard"
        echo "2. Set up your production database"
        echo "3. Configure custom domain (optional)"
        echo "4. Set up monitoring and analytics"
        echo ""
        echo "📖 See VERCEL_MIGRATION_GUIDE.md for detailed post-deployment steps"
    else
        echo "❌ Deployment failed"
        exit 1
    fi
}

# Environment variables setup reminder
env_vars_reminder() {
    echo ""
    echo "⚠️  IMPORTANT: Environment Variables Setup"
    echo "==========================================="
    echo ""
    echo "You need to configure the following environment variables in Vercel:"
    echo ""
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Select your haydeen-technologies project"
    echo "3. Go to Settings → Environment Variables"
    echo "4. Add these variables:"
    echo ""
    echo "   DATABASE_URL (Production database connection string)"
    echo "   SESSION_SECRET (Secure random string)"
    echo "   SENDGRID_API_KEY (If using email functionality)"
    echo "   EMAIL_FROM (Verified sender email for SendGrid)"
    echo "   VITE_GA_MEASUREMENT_ID (If using Google Analytics)"
    echo ""
    echo "5. Deploy again after adding environment variables:"
    echo "   vercel --prod"
    echo ""
}

# Main execution
main() {
    check_requirements
    install_dependencies
    install_vercel_cli
    check_environment
    test_build
    run_type_check
    setup_git
    vercel_login
    deploy_to_vercel
    env_vars_reminder
}

# Run main function
main