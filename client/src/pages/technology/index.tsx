import { motion } from "framer-motion";
import { Code, Database, Shield, Cloud, Smartphone, Zap } from "lucide-react";

const TechnologyPage = () => {
  const techStack = [
    {
      category: "Frontend",
      icon: <Code className="w-8 h-8 text-[#27AE60]" />,
      technologies: [
        { name: "React 18", description: "Modern UI framework with hooks and concurrent features" },
        { name: "TypeScript", description: "Type-safe JavaScript for better development experience" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development" },
        { name: "Vite", description: "Fast build tool and development server" }
      ]
    },
    {
      category: "Backend",
      icon: <Database className="w-8 h-8 text-[#27AE60]" />,
      technologies: [
        { name: "Node.js", description: "JavaScript runtime for server-side development" },
        { name: "Express.js", description: "Web framework for building REST APIs" },
        { name: "Drizzle ORM", description: "Type-safe database queries and migrations" },
        { name: "PostgreSQL", description: "Reliable relational database for data integrity" }
      ]
    },
    {
      category: "Security",
      icon: <Shield className="w-8 h-8 text-[#27AE60]" />,
      technologies: [
        { name: "CSP Headers", description: "Content Security Policy for XSS protection" },
        { name: "Rate Limiting", description: "API protection against abuse and spam" },
        { name: "Input Validation", description: "Zod schema validation for all user inputs" },
        { name: "Session Security", description: "Secure session management and authentication" }
      ]
    },
    {
      category: "Infrastructure",
      icon: <Cloud className="w-8 h-8 text-[#27AE60]" />,
      technologies: [
        { name: "Vercel", description: "Edge deployment for global performance" },
        { name: "Neon Database", description: "Serverless PostgreSQL with branching" },
        { name: "CDN", description: "Global content delivery for fast loading" },
        { name: "SSL/TLS", description: "End-to-end encryption for all communications" }
      ]
    }
  ];

  const architecturePrinciples = [
    {
      icon: <Smartphone className="w-6 h-6 text-[#27AE60]" />,
      title: "Mobile-First Design",
      description: "Built for Ghana's mobile-heavy internet usage, with offline capabilities and low-bandwidth optimization"
    },
    {
      icon: <Zap className="w-6 h-6 text-[#27AE60]" />,
      title: "Performance Optimized",
      description: "Sub-3 second load times with lazy loading, image optimization, and efficient caching strategies"
    },
    {
      icon: <Database className="w-6 h-6 text-[#27AE60]" />,
      title: "Scalable Architecture",
      description: "Microservices-ready design that can handle growth from hundreds to millions of users"
    },
    {
      icon: <Shield className="w-6 h-6 text-[#27AE60]" />,
      title: "Security by Design",
      description: "Built-in protection against common attacks, with data encryption and privacy compliance"
    }
  ];

  const developmentProcess = [
    {
      phase: "Research & Planning",
      duration: "2-4 weeks",
      description: "Stakeholder interviews, market research, and technical architecture planning",
      status: "Completed for AgriConnect & GhEHR"
    },
    {
      phase: "MVP Development",
      duration: "3-6 months",
      description: "Core feature development, database design, and initial user interface",
      status: "In Progress - AgriConnect 70%, GhEHR 45%"
    },
    {
      phase: "Beta Testing",
      duration: "2-3 months",
      description: "Limited user testing, feedback collection, and iterative improvements",
      status: "Q2 2025 - AgriConnect pilot with 50 farmers"
    },
    {
      phase: "Production Launch",
      duration: "1-2 months",
      description: "Full deployment, marketing launch, and onboarding systems",
      status: "Q3 2025 - Public launch planned"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A3D62] to-[#27AE60]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Technology & Architecture
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Built with modern, scalable technologies designed for West African markets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Technology Stack</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use proven, enterprise-grade technologies to ensure reliability, security, and scalability for our solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {stack.icon}
                  <h3 className="text-xl font-bold text-[#0A3D62] ml-3">{stack.category}</h3>
                </div>
                <div className="space-y-4">
                  {stack.technologies.map((tech) => (
                    <div key={tech.name}>
                      <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Principles */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Architecture Principles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our architectural decisions are driven by the unique needs of West African markets and users.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {architecturePrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#27AE60]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-2">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Development Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our structured approach to building reliable, user-centered solutions.
            </p>
          </div>

          <div className="space-y-8">
            {developmentProcess.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#27AE60] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-[#0A3D62]">{phase.phase}</h3>
                      <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 ml-12">{phase.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="px-4 py-2 bg-[#27AE60]/10 text-[#27AE60] rounded-lg font-medium text-sm whitespace-nowrap">
                      {phase.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source & Documentation */}
      <section className="py-16 md:py-24 bg-[#0A3D62] text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Documentation & Standards</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
              We believe in transparency and follow industry best practices for code quality, security, and documentation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Clean Code</h3>
                <p className="opacity-80">TypeScript, ESLint, and Prettier for maintainable code</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Security First</h3>
                <p className="opacity-80">OWASP compliance and regular security audits</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Data Privacy</h3>
                <p className="opacity-80">GDPR-ready with data protection by design</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;