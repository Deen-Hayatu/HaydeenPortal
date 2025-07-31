import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Solution } from "@/lib/types";
import { Globe, ShoppingBag, Map, BarChart, Laptop, Heart } from "lucide-react";

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
      id: 5,
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
    }
  ];

  const displaySolutions = solutions || fallbackSolutions;

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
                <div key={solution.id} className="bg-white rounded-lg border shadow-sm p-8 hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 ${solution.color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.longDescription}</p>
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
              ))}
            </div>
          )}
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
            {/* Industry 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#27AE60] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Agriculture</h3>
              <p className="text-gray-600">Empowering farmers with technology for improved productivity and market access.</p>
            </div>

            {/* Industry 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1ABC9C] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1ABC9C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Commerce</h3>
              <p className="text-gray-600">Enabling businesses to reach new markets and optimize their operations.</p>
            </div>

            {/* Industry 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F39C12] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F39C12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Logistics</h3>
              <p className="text-gray-600">Optimizing transportation and delivery networks across the region.</p>
            </div>

            {/* Industry 4 */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#0A3D62] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0A3D62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Research</h3>
              <p className="text-gray-600">Supporting scientific innovation with data processing and analytics tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0A3D62] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Industry?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today to discuss how our solutions can address your specific challenges.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Solutions;
