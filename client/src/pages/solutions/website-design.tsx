import { ArrowLeft, CheckCircle, ExternalLink, Laptop, Layout, Monitor } from "lucide-react";
import { Link } from "wouter";
import mpcScreenshot from "@/assets/mpcghana-screenshot.png";

const WebsiteDesignPage = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#3498DB]">Home</Link>
          <span>/</span>
          <Link href="/solutions" className="hover:text-[#3498DB]">Solutions</Link>
          <span>/</span>
          <span className="text-[#3498DB]">Website Design</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A3D62] mb-6 font-poppins">Website Design</h1>
            <p className="text-lg text-gray-700 mb-6">
              At Haydeen Technologies, we create stunning, functional websites for companies and individuals.
              Our web design services combine beautiful aesthetics with powerful functionality to deliver
              digital experiences that engage visitors and achieve business goals. We're proud to have designed
              websites like MPCGhana.org.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://mpcghana.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                View MPCGhana.org <ExternalLink className="h-4 w-4" />
              </a>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 bg-[#3498DB]/10 rounded-xl p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3498DB]/20 text-[#3498DB]">
                <Laptop className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Featured Client</h3>
              <p className="mb-4">We designed and developed the website for MPCGhana.org</p>
              <div className="p-3 bg-white rounded-lg border border-[#3498DB]/30">
                <div className="h-8 mx-auto text-center font-bold text-[#3498DB]">
                  MPCGhana.org
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62] mb-8 font-poppins">Our Website Design Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#3498DB]/10 rounded-full flex items-center justify-center mb-4 text-[#3498DB]">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Responsive Design</h3>
              <p className="text-gray-600">Websites that look great and function flawlessly on all devices, from desktops to smartphones.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#3498DB]/10 rounded-full flex items-center justify-center mb-4 text-[#3498DB]">
                <Monitor className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">Custom Development</h3>
              <p className="text-gray-600">Tailored website development to meet your specific business needs and objectives.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#3498DB]/10 rounded-full flex items-center justify-center mb-4 text-[#3498DB]">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-2">SEO Optimization</h3>
              <p className="text-gray-600">Websites built with search engine visibility in mind to help you rank higher and attract more visitors.</p>
            </div>
          </div>
        </div>

        {/* MPCGhana.org Case Study */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62] mb-6 font-poppins">Case Study: MPCGhana.org</h2>
            
            <div className="md:flex gap-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="rounded-lg shadow-md overflow-hidden border border-[#3498DB]/30">
                  <img 
                    src={mpcScreenshot} 
                    alt="MPCGhana.org Website Screenshot" 
                    className="w-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Project Overview</h3>
                <p className="text-gray-700 mb-4">
                  We designed and developed the official website for MPCGhana.org, creating a modern digital presence
                  that effectively communicates their mission and provides valuable resources to their audience.
                </p>
                
                <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#3498DB] flex-shrink-0 mt-0.5" />
                    <span>Responsive design optimized for all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#3498DB] flex-shrink-0 mt-0.5" />
                    <span>Content management system for easy updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#3498DB] flex-shrink-0 mt-0.5" />
                    <span>Interactive data visualizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#3498DB] flex-shrink-0 mt-0.5" />
                    <span>Resource library and document repository</span>
                  </li>
                </ul>
                
                <a 
                  href="https://mpcghana.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#3498DB] font-medium flex items-center hover:underline"
                >
                  Visit MPCGhana.org
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">Ready to create your dream website?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your website design project and see how Haydeen Technologies
            can help you achieve your digital goals.
          </p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-white text-[#3498DB] font-bold rounded-md hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link href="/solutions" className="text-[#3498DB] flex items-center hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Solutions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDesignPage;