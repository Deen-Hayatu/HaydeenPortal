# Haydeen Technologies Website

## Project Overview
A comprehensive digital platform for Haydeen Technologies, delivering innovative software solutions and website design services for West African industries with a focus on scalable, user-centric digital experiences.

## Project Details
- **Founder**: Mohammad Deen Hayatu
- **Location**: Effiduasi, Ghana
- **Mission**: Develop innovative software solutions to bridge critical gaps in Ghana's and West Africa's industries, starting with agriculture and STEM fields
- **Vision**: To become the leading provider of industry-specific software solutions in West Africa

## Key Technologies
- React.js + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database with Drizzle ORM
- Tailwind CSS + shadcn/ui components
- Email.js for contact forms
- Responsive web design
- Zod validation

## Business Objectives (From Business Plan)
- Launch AgriConnect within 6 months as the first MVP
- Acquire 500–1,000 active users (farmers, buyers, suppliers) in Year 1
- Generate GHS150,000–GHS200,000 in revenue by Year 1
- Expand to Nigeria and Côte d'Ivoire in Year 4-5
- Develop additional solutions for e-commerce, logistics, and STEM research by Year 3

## Current Features
- **Core Pages**: Home, About, Solutions, Blog, Contact
- **Solutions Showcased**: 
  - AgriConnect (flagship agricultural platform)
  - GhEHR (comprehensive electronic health record system for Ghana)
  - Website Design services (featuring MPCGhana.org case study)
  - EcoVend, MarketMate, TransitPro (coming soon)
- **Website Design Services**: Highlighted for companies and individuals
- **Contact System**: Email.js integration with form validation
- **Blog System**: PostgreSQL-backed blog with authentication
- **Responsive Design**: Mobile-first approach

## Recent Changes
- **2025-01-30**: Added GhEHR (Ghana Electronic Health Record) as major healthcare solution
  - Created dedicated GhEHR solution page with comprehensive features and roadmap
  - Added GhEHR to main solutions teaser and solutions index page
  - Updated About page technology roadmap to include GhEHR as Phase 2
  - Integrated healthcare analytics and Ghana Health Service integration details
  - Added NHIS (National Health Insurance Scheme) connectivity features
- **2025-01-29**: Replaced all stock images with West African representation
  - Updated all blog post cover images and author avatars
  - Changed hero section background image
  - Modified AgriConnect solution page farmer images  
  - Updated featured case study images
  - Replaced seed data images with appropriate representation
- **2025-01-29**: Updated contact information with correct address
  - Changed address from placeholder to actual location: Bw 14 Benz road, Effiduasi Ashanti
  - Updated footer, contact page, and map to reflect correct location
  - Updated founder photos with professional images
  - Simplified leadership team to reflect sole developer structure
- **2025-01-29**: Updated About page with authentic business information from business plan
  - Added Mohammad Deen Hayatu as founder
  - Updated company story with actual location (Effiduasi, Ghana)
  - Included real business objectives and market data
  - Updated team section to reflect actual structure
- **Previous**: Implemented new Haydeen Technologies logo
- **Previous**: Added MPCGhana.org screenshot to website design showcase
- **Previous**: Updated all team and blog images to feature Black people
- **Previous**: Added Website Design to footer Solutions list

## User Preferences
- Simple, everyday language (user is non-technical)
- Professional, supportive tone without emojis
- Focus on authentic business information over placeholder content
- Emphasis on West African market focus and local context

## Project Architecture
- Frontend: React SPA with Wouter routing
- Backend: Express.js API server
- Database: PostgreSQL with Drizzle migrations
- Styling: Tailwind CSS with custom design system
- Components: shadcn/ui component library
- Forms: react-hook-form with Zod validation
- State: React Query for server state management

## Development Workflow
- Uses Replit's "Start application" workflow running `npm run dev`
- Hot module replacement for instant development feedback
- Database migrations handled via `npm run db:push`