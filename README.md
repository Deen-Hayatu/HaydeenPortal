# Haydeen Technologies Website

A comprehensive digital platform for Haydeen Technologies, delivering innovative software solutions and website design services for West African industries with a focus on scalable, user-centric digital experiences.

## About Haydeen Technologies

**Founder**: Mohammad Deen Hayatu  
**Location**: Effiduasi, Ghana  
**Mission**: Develop innovative software solutions to bridge critical gaps in Ghana's and West Africa's industries, starting with agriculture and STEM fields  
**Vision**: To become the leading provider of industry-specific software solutions in West Africa

## Featured Solutions

### AgriConnect
Our flagship agricultural platform connecting farmers, buyers, suppliers, and logistics service providers across West Africa. Features include:
- Real-time weather and soil data integration
- Direct marketplace connections with fair pricing
- Mobile access with low-bandwidth optimization
- Educational resources in multiple local languages
- Supply chain tracking and transparency

### Website Design Services
Professional website design and development services for companies and individuals, featuring our work with clients like MPCGhana.org.

## Technology Stack

- **Frontend**: React.js + TypeScript with Wouter routing
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Email**: Email.js for contact forms
- **Validation**: Zod schemas
- **State Management**: React Query for server state

## Business Objectives

- Launch AgriConnect within 6 months as the first MVP
- Acquire 500–1,000 active users (farmers, buyers, suppliers) in Year 1
- Generate GHS150,000–GHS200,000 in revenue by Year 1
- Expand to Nigeria and Côte d'Ivoire in Year 4-5
- Develop additional solutions for e-commerce, logistics, and STEM research by Year 3

## Features

- **Core Pages**: Home, About, Solutions, Blog, Contact
- **Solutions Showcase**: AgriConnect, Website Design, EcoVend, MarketMate, TransitPro
- **Contact System**: Integrated contact forms with email notifications
- **Blog System**: PostgreSQL-backed blog with authentication
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Cultural Authenticity**: All imagery features West African representation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/haydeen-technologies.git
cd haydeen-technologies
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your database credentials and other configuration.

4. Set up the database
```bash
npm run db:push
```

5. Seed the database (optional)
```bash
npx tsx seed-data.ts
```

6. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database configuration
├── shared/                # Shared types and schemas
└── attached_assets/       # Project assets and images
```

### Key Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Haydeen Technologies.

## Contact

**Mohammad Deen Hayatu**  
Founder & CEO, Haydeen Technologies  
Location: Bw 14 Benz road, Effiduasi Ashanti, Ghana  
Website: [Your website URL]  
Email: [Your contact email]

---

*Building innovative software solutions for West Africa's digital transformation.*