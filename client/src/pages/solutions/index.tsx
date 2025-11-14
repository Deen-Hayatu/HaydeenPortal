import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Solution } from "@/lib/types";
import { Globe, ShoppingBag, Map, BarChart, Laptop, Heart, ShieldCheck, Server, Clock, Brain, Sparkles } from "lucide-react";

const Solutions = () => {
  const { data: solutions, isLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  // Fallback solutions in case API request fails
  const fallbackSolutions = [
    {
      id: 1,
      title: "AgriConnect",
      description: "Connecting farmers with agricultural data, markets, and resources to improve productivity and profitability.",
      longDescription: "AgriConnect is our flagship platform designed to transform farming in West Africa. It combines real-time weather and soil data, market information, educational resources, and direct marketplace connections to help farmers make better decisions, improve yields, and increase their income.",
      features: [
        "Real-time weather and soil data integration",
        "Direct marketplace connection with fair pricing",
        "Mobile access with low-bandwidth optimization",
        "Educational resources in multiple local languages",
        "Supply chain tracking and transparency"
      ],
      icon: <Globe className="h-10 w-10 text-[#27AE60]" />,
      color: "bg-[#27AE60]",
      colorClass: "text-[#27AE60]",
      slug: "agriconnect",
      isAvailable: true,
    },
    {
      id: 2,
      title: "GhEHR",
      description: "Comprehensive electronic health record system designed specifically for Ghana's healthcare ecosystem and medical practices.",
      longDescription: "GhEHR (Ghana Electronic Health Record) is a comprehensive healthcare management system tailored to Ghana's unique medical infrastructure and practices. It provides unified patient records, healthcare analytics, and system integration to improve healthcare outcomes across the country.",
      features: [
        "Digital patient history and medical records",
        "Healthcare analytics and population health insights",
        "Ghana Health Service and NHIS integration",
        "Multi-language support for local medical terminology",
        "Secure cloud infrastructure with local data residency"
      ],
      icon: <Heart className="h-10 w-10 text-[#E74C3C]" />,
      color: "bg-[#E74C3C]",
      colorClass: "text-[#E74C3C]",
      slug: "ghehr",
      isAvailable: true,
    },
    {
      id: 3,
      title: "EcoVend",
      description: "Sustainable e-commerce platform connecting local artisans and eco-friendly products with global markets.",
      longDescription: "EcoVend is our upcoming e-commerce platform that connects local artisans and eco-friendly product manufacturers in West Africa with global markets. This platform focuses on sustainability, fair trade, and creating economic opportunities for small-scale producers.",
      features: [
        "Global marketplace for local artisans",
        "Secure payment processing",
        "Logistics and shipping integration",
        "Product storytelling and producer profiles",
        "Impact tracking for sustainable purchases"
      ],
      icon: <ShoppingBag className="h-10 w-10 text-[#1ABC9C]" />,
      color: "bg-[#1ABC9C]",
      colorClass: "text-[#1ABC9C]",
      slug: "ecovend",
      isAvailable: false,
    },
    {
      id: 4,
      title: "TransitPro",
      description: "Optimizing logistics and transportation networks across West Africa for efficient goods movement.",
      longDescription: "TransitPro will address the logistics challenges faced in West Africa by optimizing transportation networks, tracking shipments, and improving the efficiency of goods movement across the region. The platform will help reduce costs and delivery times while improving reliability.",
      features: [
        "Route optimization and planning",
        "Real-time shipment tracking",
        "Driver management and communication",
        "Documentation and compliance automation",
        "Analytics and performance reporting"
      ],
      icon: <Map className="h-10 w-10 text-[#F39C12]" />,
      color: "bg-[#F39C12]",
      colorClass: "text-[#F39C12]",
      slug: "transitpro",
      isAvailable: false,
    },
    {
      id: 5,
      title: "MarketMate",
      description: "AI-powered market research and analytics platform for businesses operating in West African markets.",
      longDescription: "MarketMate will provide businesses with AI-powered market research and analytics specifically tailored for West African markets. The platform will help companies make data-driven decisions based on accurate, localized market insights.",
      features: [
        "Local market trend analysis",
        "Consumer behavior insights",
        "Competitive landscape mapping",
        "Customized market reports",
        "Forecasting and opportunity identification"
      ],
      icon: <BarChart className="h-10 w-10 text-[#0A3D62]" />,
      color: "bg-[#0A3D62]",
      colorClass: "text-[#0A3D62]",
      slug: "marketmate",
      isAvailable: false,
    },
      {
        id: 6,
      title: "Website Design",
      description: "Custom website design and development for companies and individuals, creating modern, responsive digital experiences.",
      longDescription: "Our Website Design service provides custom, responsive websites for companies and individuals. We've designed sites for notable organizations like MPC.org, delivering visually appealing, user-friendly websites that effectively communicate brand messages and engage visitors.",
      features: [
        "Custom responsive design for all devices",
        "Content management system implementation",
        "E-commerce integration",
        "SEO optimization",
        "Performance tuning and analytics"
      ],
      icon: <Laptop className="h-10 w-10 text-[#3498DB]" />,
      color: "bg-[#3498DB]",
      colorClass: "text-[#3498DB]",
      slug: "website-design",
        isAvailable: true,
      },
      {
        id: 7,
        title: "Intelligent Knowledge Systems",
        description: "Retrieval-Augmented Generation (RAG) and Agentic RAG implementations that put your proprietary data behind secure, explainable AI copilots.",
        longDescription: "We architect, fine-tune, and deploy production-grade RAG/Agentic RAG stacks for banks, hospitals, and fast-scaling organisations. From vectorizing archives to orchestrating multi-step agents, we handle data governance, prompt engineering, and continued evaluation.",
        features: [
          "Document ingestion pipelines with automated PII scrubbing",
          "Hybrid search (semantic + metadata) using pgvector/Weaviate",
          "Guardrailed prompt orchestration with ReAct/State Graph agents",
          "Observability dashboards for hallucination + latency tracking",
          "Multi-tenant deployments on Vercel + Neon or customer cloud"
        ],
        icon: <Brain className="h-10 w-10 text-[#8E44AD]" />,
        color: "bg-[#8E44AD]",
        colorClass: "text-[#8E44AD]",
        slug: "rag-solutions",
        isAvailable: true,
    }
  ];

  const displaySolutions = solutions || fallbackSolutions;

  const executionHighlights = [
    {
      title: "Production infrastructure ready",
      description: "Vercel Edge hosting + Neon Postgres mean every MVP preview runs on the same stack we'll deploy to production.",
      icon: <Server className="w-6 h-6 text-[#27AE60]" />,
    },
    {
      title: "Security & compliance baked in",
      description: "Data encryption, access logging, and role-based controls are part of the baseline—no retrofitting once pilots start.",
      icon: <ShieldCheck className="w-6 h-6 text-[#0A3D62]" />,
    },
    {
      title: "8-week delivery cycles",
      description: "Each engagement follows research → build → review loops with a documented sprint report shared with partners.",
      icon: <Clock className="w-6 h-6 text-[#F39C12]" />,
    },
  ];

  const engagementSteps = [
    { label: "Week 0-2", title: "Discovery & NDA", description: "Stakeholder interviews, access provisioning, and alignment on KPIs." },
    { label: "Week 3-6", title: "Build & Validate", description: "Feature delivery on staging with usability tests across Ghanaian cohorts." },
    { label: "Week 7-8", title: "Pilot Readiness", description: "Security checklist, training collateral, and go-live support plan." },
  ];

  const ragSellingPoints = [
    {
      title: "Data-first pipelines",
      description: "Automated ingestion, cleaning, and chunking for PDFs, SharePoint, EMRs, and SQL sources—complete with PII redaction and versioning.",
    },
    {
      title: "Foundation model agnostic",
      description: "We deploy OpenAI, Anthropic, or on-prem llama variants with tool abstractions so you can swap models without rewriting code.",
    },
    {
      title: "Agentic workflows",
      description: "RAG is only step one: we add planning/critique loops, retrieval verification, and human handoff so agents act safely on your behalf.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A3D62] to-[#3C6382] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">Our Solutions</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">
              Building innovative MVPs to transform West Africa's digital landscape
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              From AgriConnect's agricultural marketplace to GhEHR's healthcare platform - we're developing solutions that address real challenges faced by Ghanaian communities.
            </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm uppercase tracking-[0.3em] text-white/80">
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#FCD116] animate-pulse" />
                  Vercel Edge + Neon Postgres
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  8-week sprint reviews
                </span>
              </div>
          </div>
        </div>
      </section>

        {/* Delivery Guarantees */}
        <section className="bg-white">
          <div className="container -mt-12 md:-mt-16 relative z-20">
            <div className="grid md:grid-cols-3 gap-6">
              {executionHighlights.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A3D62]">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Solutions Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4 font-poppins">MVP Development Portfolio</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We're currently developing two flagship MVPs and have a pipeline of solutions designed to address critical challenges across Ghana's key industries. Each solution is built through extensive stakeholder research and local market understanding.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg border shadow-sm p-8 animate-pulse">
                  <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-7 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-40"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {displaySolutions.map((solution) => (
                <div key={solution.id} className="bg-white rounded-lg border shadow-sm p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex flex-col flex-grow">
                    <div className={`w-16 h-16 ${solution.color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{solution.longDescription}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${solution.colorClass} mr-2 flex-shrink-0 mt-0.5`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    {solution.isAvailable ? (
                      <Link 
                        href={`/solutions/${solution.slug}`} 
                        className={`inline-flex items-center px-4 py-2 font-medium rounded-md ${solution.color} text-white hover:bg-opacity-90 transition`}
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 font-medium rounded-md bg-gray-100 text-gray-500">
                        Coming Soon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* RAG & Agentic AI Services */}
        <section className="py-16 md:py-24 bg-[#0A3D62] text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FCD116] mb-4">New capability</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">RAG & Agentic Intelligence for regulated teams</h2>
                <p className="text-white/90 mb-6">
                  We design, build, and operate Retrieval-Augmented Generation (RAG) and Agentic RAG systems that turn your private corpora into trustworthy copilots. From ingestion to evaluation, everything runs on the same Vercel + Neon backbone as our other MVPs or on your preferred cloud.
                </p>
                <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-[#FCD116]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Typical deliverables</p>
                  </div>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Data ingestion + vectorization pipelines with automated governance reports</li>
                    <li>• RAG orchestration service (LangChain/LangGraph, custom TypeScript agents)</li>
                    <li>• Evaluation harness covering hallucination, latency, and cost alerts</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                {ragSellingPoints.map((point) => (
                  <div key={point.title} className="bg-white/10 rounded-2xl p-5 border border-white/10">
                    <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                    <p className="text-white/80 text-sm">{point.description}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0A3D62] font-semibold hover:bg-[#FCD116] hover:text-black transition"
                  >
                    Scope a RAG engagement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Development Roadmap */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4 font-poppins">Development Roadmap</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Our strategic development approach focuses on addressing Ghana's most critical digital infrastructure needs through carefully planned MVP releases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phase 1 - Current */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#27AE60]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#27AE60] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <span className="bg-[#27AE60] text-white text-xs px-2 py-1 rounded-full font-medium">
                  Current Phase
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3 font-poppins">Foundation MVPs</h3>
              <p className="text-gray-600 mb-4">Building core solutions for agriculture and healthcare sectors.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#27AE60] rounded-full"></div>
                  AgriConnect MVP Development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#27AE60] rounded-full"></div>
                  GhEHR System Architecture
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#27AE60] rounded-full"></div>
                  Stakeholder Feedback Integration
                </li>
              </ul>
            </div>

            {/* Phase 2 - Next */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#F39C12]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#F39C12] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <span className="bg-[#F39C12] text-white text-xs px-2 py-1 rounded-full font-medium">
                  Next Phase
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3 font-poppins">Market Expansion</h3>
              <p className="text-gray-600 mb-4">Scale successful MVPs and launch beta programs.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
                  Beta Testing Programs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
                  E-commerce Platform Launch
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
                  Regional Market Research
                </li>
              </ul>
            </div>

            {/* Phase 3 - Future */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-gray-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                  Future Vision
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3 font-poppins">Regional Leadership</h3>
              <p className="text-gray-600 mb-4">Expand across West Africa with comprehensive solutions.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Multi-country Deployment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  AI/ML Enhancement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Enterprise Solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Engagement Playbook */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#27AE60]">How we partner</p>
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Engagement playbook in 3 checkpoints</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Every MVP build is scoped against this cadence so stakeholders know exactly what happens each week.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {engagementSteps.map((step) => (
                <div key={step.label} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-2">{step.label}</p>
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0A3D62] text-white font-semibold hover:bg-[#0A3D62]/90 transition"
              >
                Schedule a discovery call
              </Link>
            </div>
          </div>
        </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Target Industries</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our solutions focus on key sectors where technology can create the most significant impact in Ghana and West Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Agriculture */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#27AE60] bg-opacity-10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2 font-poppins group-hover:text-[#27AE60] transition-colors">Agriculture</h3>
              <p className="text-gray-600 leading-relaxed">Empowering farmers with technology for improved productivity, market access, and sustainable farming practices.</p>
              <div className="mt-4">
                <span className="bg-[#27AE60] text-white text-xs px-2 py-1 rounded-full font-medium">AgriConnect MVP</span>
              </div>
            </div>

            {/* Healthcare */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#E74C3C] bg-opacity-10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E74C3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2 font-poppins group-hover:text-[#E74C3C] transition-colors">Healthcare</h3>
              <p className="text-gray-600 leading-relaxed">Modernizing Ghana's healthcare system with comprehensive electronic health records and patient management solutions.</p>
              <div className="mt-4">
                <span className="bg-[#E74C3C] text-white text-xs px-2 py-1 rounded-full font-medium">GhEHR MVP</span>
              </div>
            </div>

            {/* E-commerce */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#1ABC9C] bg-opacity-10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1ABC9C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2 font-poppins group-hover:text-[#1ABC9C] transition-colors">E-commerce</h3>
              <p className="text-gray-600 leading-relaxed">Sustainable marketplace connecting local artisans and eco-friendly products with global markets and fair trade practices.</p>
              <div className="mt-4">
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">EcoVend Planned</span>
              </div>
            </div>

            {/* Logistics */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#F39C12] bg-opacity-10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F39C12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2 font-poppins group-hover:text-[#F39C12] transition-colors">Logistics</h3>
              <p className="text-gray-600 leading-relaxed">Optimizing transportation networks and supply chain management across West Africa for efficient goods movement.</p>
              <div className="mt-4">
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">TransitPro Planned</span>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0A3D62] to-[#3C6382] text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Join Our Development Journey</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of Ghana's digital transformation. Stay updated on our MVP development progress and get early access to AgriConnect and GhEHR when they launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-[#27AE60] hover:bg-[#229954] text-white px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Get Development Updates
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                View Our MVPs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Solutions;
