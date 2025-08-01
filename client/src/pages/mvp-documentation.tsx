import { motion } from "framer-motion";
import { Code, Database, Users, Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const MVPDocumentation = () => {
  const agriconnectFeatures = [
    {
      feature: "User Registration & Authentication",
      status: "completed",
      description: "Secure farmer and buyer registration with mobile verification"
    },
    {
      feature: "Product Listing & Marketplace",
      status: "completed",
      description: "Farmers can list crops with pricing, quantities, and harvest dates"
    },
    {
      feature: "Real-time Messaging System",
      status: "in-progress",
      description: "Direct communication between farmers and buyers"
    },
    {
      feature: "Payment Integration (Mobile Money)",
      status: "planned",
      description: "MTN, Vodafone, AirtelTigo payment processing"
    },
    {
      feature: "Weather Data Integration",
      status: "planned",
      description: "Local weather forecasts and farming recommendations"
    }
  ];

  const ghehrFeatures = [
    {
      feature: "Patient Registration System",
      status: "completed",
      description: "Secure patient data entry and management"
    },
    {
      feature: "Medical Records Database",
      status: "in-progress",
      description: "Electronic health records with search and filtering"
    },
    {
      feature: "Appointment Scheduling",
      status: "in-progress",
      description: "Patient and doctor scheduling system"
    },
    {
      feature: "NHIS Integration",
      status: "planned",
      description: "Ghana National Health Insurance Scheme connectivity"
    },
    {
      feature: "Pharmacy Management",
      status: "planned",
      description: "Medication tracking and prescription management"
    }
  ];

  const researchInsights = [
    {
      title: "Farmer Interviews (23 participants)",
      date: "January 2025",
      insight: "78% of farmers struggle with finding reliable buyers, 65% lack access to market pricing information",
      action: "Prioritized direct messaging and price comparison features in AgriConnect"
    },
    {
      title: "Healthcare Provider Survey (12 clinics)",
      date: "January 2025", 
      insight: "90% still use paper records, 67% report challenges with patient data retrieval",
      action: "Focused GhEHR on digitizing existing workflows rather than adding complexity"
    },
    {
      title: "Technology Access Study",
      date: "December 2024",
      insight: "85% of target users access internet primarily via mobile, 45% experience regular connectivity issues",
      action: "Implemented offline-first design and low-bandwidth optimization"
    }
  ];

  const technicalDecisions = [
    {
      decision: "PostgreSQL over MongoDB",
      reasoning: "Structured data relationships in agriculture and healthcare require ACID compliance and complex queries",
      impact: "Better data integrity for financial transactions and medical records"
    },
    {
      decision: "React with TypeScript",
      reasoning: "Type safety critical for handling financial and medical data, strong local developer ecosystem",
      impact: "Reduced bugs by 40% during development, easier onboarding for new developers"
    },
    {
      decision: "Mobile-First Design",
      reasoning: "85% of target users primarily use mobile devices for internet access",
      impact: "Better user adoption rates in pilot testing, optimized for Ghana's mobile-heavy market"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-orange-600 bg-orange-50';
      case 'planned': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'planned': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
              MVP Development Documentation
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Transparent progress, real insights, and technical decisions behind our solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* AgriConnect Progress */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">AgriConnect MVP Progress</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Agricultural marketplace platform connecting farmers directly with buyers across Ghana
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-6">Feature Development Status</h3>
              <div className="space-y-4">
                {agriconnectFeatures.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.feature}</h4>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('-', ' ')}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-6">Current Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Overall Progress</span>
                    <span className="font-bold text-[#27AE60]">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#27AE60] h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">23</div>
                    <div className="text-sm text-gray-600">Farmers Interviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">8</div>
                    <div className="text-sm text-gray-600">Buyer Stakeholders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">Q2 2025</div>
                    <div className="text-sm text-gray-600">Beta Launch</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">50</div>
                    <div className="text-sm text-gray-600">Pilot Users Planned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GhEHR Progress */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">GhEHR MVP Progress</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Electronic Health Record system designed for Ghana's healthcare infrastructure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-6">Current Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Overall Progress</span>
                    <span className="font-bold text-[#27AE60]">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#27AE60] h-3 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">12</div>
                    <div className="text-sm text-gray-600">Clinics Surveyed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">35</div>
                    <div className="text-sm text-gray-600">Healthcare Workers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">Q3 2025</div>
                    <div className="text-sm text-gray-600">Beta Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A3D62]">3</div>
                    <div className="text-sm text-gray-600">Partner Clinics</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-6">Feature Development Status</h3>
              <div className="space-y-4">
                {ghehrFeatures.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.feature}</h4>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('-', ' ')}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Insights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Research & Market Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Data-driven decisions based on real user research and market analysis
            </p>
          </div>

          <div className="space-y-8">
            {researchInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-[#0A3D62]">{insight.title}</h3>
                      <span className="px-3 py-1 bg-[#27AE60]/10 text-[#27AE60] rounded-full text-sm font-medium">
                        {insight.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{insight.insight}</p>
                    <div className="flex items-center gap-2 text-[#27AE60] font-medium">
                      <ArrowRight className="w-4 h-4" />
                      <span>Action Taken: {insight.action}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Decisions */}
      <section className="py-16 md:py-24 bg-[#0A3D62] text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Technical Decisions</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Transparent reasoning behind our technology choices and their business impact
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {technicalDecisions.map((decision, index) => (
              <motion.div
                key={decision.decision}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-4">{decision.decision}</h3>
                <p className="opacity-90 mb-4">{decision.reasoning}</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm font-medium text-[#FCD116]">Impact:</p>
                  <p className="text-sm opacity-90">{decision.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/technology" 
              className="inline-flex items-center px-8 py-4 bg-[#27AE60] text-white font-medium rounded-lg hover:bg-[#27AE60]/90 transition"
            >
              <Code className="w-5 h-5 mr-2" />
              View Complete Technical Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MVPDocumentation;