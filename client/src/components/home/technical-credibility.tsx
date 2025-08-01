import { motion } from "framer-motion";
import { Code, Database, Shield, Zap, Globe, Users } from "lucide-react";
import { Link } from "wouter";

const TechnicalCredibility = () => {
  const techHighlights = [
    {
      icon: <Code className="w-6 h-6 text-[#27AE60]" />,
      title: "Modern Tech Stack",
      description: "React 18, TypeScript, Node.js, PostgreSQL",
      details: "Enterprise-grade technologies for scalable solutions"
    },
    {
      icon: <Shield className="w-6 h-6 text-[#27AE60]" />,
      title: "Security First",
      description: "OWASP compliance, CSP headers, rate limiting",
      details: "Built-in protection against common vulnerabilities"
    },
    {
      icon: <Database className="w-6 h-6 text-[#27AE60]" />,
      title: "Scalable Architecture",
      description: "Microservices-ready, database optimization",
      details: "Designed to handle growth from hundreds to millions of users"
    },
    {
      icon: <Zap className="w-6 h-6 text-[#27AE60]" />,
      title: "Performance Optimized",
      description: "Sub-3s load times, mobile-first design",
      details: "Optimized for Ghana's mobile-heavy internet usage"
    }
  ];

  const developmentStats = [
    {
      metric: "AgriConnect MVP",
      value: "70%",
      description: "Core features development complete"
    },
    {
      metric: "GhEHR MVP",
      value: "45%",
      description: "Healthcare system in development"
    },
    {
      metric: "User Research",
      value: "50+",
      description: "Farmers and healthcare providers interviewed"
    },
    {
      metric: "Beta Launch",
      value: "Q2 2025",
      description: "AgriConnect pilot testing planned"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
              Technical Excellence & Transparency
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We believe in transparent development. Here's our current technical approach and genuine progress on our MVP solutions.
            </p>
          </motion.div>
        </div>

        {/* Technical Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#27AE60]/10 rounded-full flex items-center justify-center mr-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A3D62]">{item.title}</h3>
              </div>
              <p className="font-medium text-gray-900 mb-2">{item.description}</p>
              <p className="text-sm text-gray-600">{item.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Development Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Authentic Development Progress</h3>
            <p className="text-gray-600">
              Real metrics from our MVP development journey, updated monthly
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {developmentStats.map((stat, index) => (
              <motion.div
                key={stat.metric}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#27AE60] mb-2">{stat.value}</div>
                <div className="font-semibold text-[#0A3D62] mb-1">{stat.metric}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transparency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#0A3D62] rounded-2xl p-8 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Development Transparency</h3>
            <p className="text-lg opacity-90 mb-8">
              As a new startup founded in January 2025, we're committed to honest communication about our progress. 
              We're currently in active MVP development and will share detailed case studies as our solutions launch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/mvp-progress" 
                className="inline-flex items-center px-6 py-3 bg-[#27AE60] text-white font-medium rounded-lg hover:bg-[#27AE60]/90 transition"
              >
                <Code className="w-5 h-5 mr-2" />
                View MVP Progress & Documentation
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#0A3D62] transition"
              >
                <Users className="w-5 h-5 mr-2" />
                Schedule Technical Discussion
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalCredibility;