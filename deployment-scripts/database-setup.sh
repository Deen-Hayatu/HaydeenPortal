#!/bin/bash

# Database Setup Script for Haydeen Technologies
# This script helps set up the database for production deployment

echo "🗄️  Haydeen Technologies - Database Setup"
echo "========================================="

# Load environment variables
if [ -f ".env.local" ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
else
    echo "❌ .env.local file not found. Please create it first."
    exit 1
fi

# Check if DATABASE_URL is set
check_database_url() {
    if [ -z "$DATABASE_URL" ]; then
        echo "❌ DATABASE_URL is not set in .env.local"
        echo "Please add your database connection string to .env.local"
        exit 1
    else
        echo "✅ DATABASE_URL is configured"
    fi
}

# Test database connection
test_connection() {
    echo "🔌 Testing database connection..."
    
    # Try to connect using psql if available
    if command -v psql &> /dev/null; then
        psql "$DATABASE_URL" -c "SELECT version();" &> /dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Database connection successful"
        else
            echo "❌ Database connection failed"
            echo "Please check your DATABASE_URL and database server status"
            exit 1
        fi
    else
        echo "⚠️  psql not available, skipping connection test"
        echo "💡 Install PostgreSQL client tools for connection testing"
    fi
}

# Push database schema
push_schema() {
    echo "📊 Pushing database schema..."
    npm run db:push
    
    if [ $? -eq 0 ]; then
        echo "✅ Database schema pushed successfully"
    else
        echo "❌ Failed to push database schema"
        echo "Please check your database connection and schema files"
        exit 1
    fi
}

# Generate migrations (optional)
generate_migrations() {
    echo "📝 Generating database migrations..."
    npm run db:generate
    
    if [ $? -eq 0 ]; then
        echo "✅ Database migrations generated"
    else
        echo "⚠️  Migration generation failed or no changes detected"
    fi
}

# Seed database with initial data
seed_database() {
    echo "🌱 Seeding database with initial data..."
    
    if [ -f "seed-data.ts" ]; then
        npm run db:seed
        
        if [ $? -eq 0 ]; then
            echo "✅ Database seeded successfully"
        else
            echo "⚠️  Database seeding failed or no seed script available"
        fi
    else
        echo "⚠️  No seed-data.ts file found, skipping seeding"
    fi
}

# Open database studio
open_studio() {
    echo "🎨 Opening Drizzle Studio for database management..."
    echo "💡 Studio will open at http://localhost:4983"
    echo "📋 Use this to verify your database setup"
    echo ""
    read -p "Press Enter to open Drizzle Studio (Ctrl+C to skip)..."
    
    npm run db:studio &
    STUDIO_PID=$!
    
    echo "🎨 Drizzle Studio is running (PID: $STUDIO_PID)"
    echo "📖 Open http://localhost:4983 in your browser"
    echo "🛑 Press Ctrl+C to stop the studio when you're done"
    
    wait $STUDIO_PID
}

# Database backup
create_backup() {
    if command -v pg_dump &> /dev/null; then
        echo "💾 Creating database backup..."
        BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
        pg_dump "$DATABASE_URL" > "$BACKUP_FILE"
        
        if [ $? -eq 0 ]; then
            echo "✅ Database backup created: $BACKUP_FILE"
        else
            echo "❌ Database backup failed"
        fi
    else
        echo "⚠️  pg_dump not available, skipping backup"
    fi
}

# Database information
show_database_info() {
    echo ""
    echo "📊 Database Configuration Summary"
    echo "================================"
    echo ""
    
    # Extract database info from URL (safely)
    if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:/]+):?([0-9]*)/(.+) ]]; then
        echo "🏷️  Database Type: PostgreSQL"
        echo "🌐 Host: ${BASH_REMATCH[3]}"
        echo "📊 Database: ${BASH_REMATCH[5]}"
        echo "👤 User: ${BASH_REMATCH[1]}"
        if [ -n "${BASH_REMATCH[4]}" ]; then
            echo "🔌 Port: ${BASH_REMATCH[4]}"
        else
            echo "🔌 Port: 5432 (default)"
        fi
    else
        echo "🔗 Connection String: [configured]"
    fi
    
    echo ""
    echo "📋 Available Commands:"
    echo "   npm run db:push     - Push schema changes"
    echo "   npm run db:generate - Generate migrations"
    echo "   npm run db:migrate  - Run migrations"
    echo "   npm run db:studio   - Open database studio"
    echo "   npm run db:seed     - Seed with initial data"
    echo ""
}

# Menu system
show_menu() {
    echo ""
    echo "🛠️  Database Setup Menu"
    echo "====================="
    echo "1. Test database connection"
    echo "2. Push database schema"
    echo "3. Generate migrations"
    echo "4. Seed database"
    echo "5. Open Drizzle Studio"
    echo "6. Create backup"
    echo "7. Show database info"
    echo "8. Run full setup (2,3,4)"
    echo "9. Exit"
    echo ""
    read -p "Select an option (1-9): " choice
    
    case $choice in
        1) test_connection ;;
        2) push_schema ;;
        3) generate_migrations ;;
        4) seed_database ;;
        5) open_studio ;;
        6) create_backup ;;
        7) show_database_info ;;
        8) full_setup ;;
        9) echo "👋 Goodbye!"; exit 0 ;;
        *) echo "❌ Invalid option"; show_menu ;;
    esac
}

# Full setup workflow
full_setup() {
    echo "🚀 Running full database setup..."
    push_schema
    generate_migrations
    seed_database
    echo "✅ Full database setup completed!"
}

# Main execution
main() {
    check_database_url
    show_database_info
    
    # Check if running interactively
    if [ -t 0 ]; then
        show_menu
    else
        echo "🔄 Running automated setup..."
        full_setup
    fi
}

# Handle Ctrl+C gracefully
trap 'echo ""; echo "🛑 Database setup interrupted"; exit 1' INT

# Run main function
main