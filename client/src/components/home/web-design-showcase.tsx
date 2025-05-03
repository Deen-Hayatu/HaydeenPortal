import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import mpcScreenshot from "@/assets/mpcghana-screenshot.png";

const WebDesignShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">Featured Client</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">
            Website Design Excellence
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We design beautiful, functional websites for companies and individuals.
            Our portfolio includes prominent organizations like MPCGhana.org.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">MPCGhana.org</h3>
              <div className="mb-4 rounded-lg shadow-md overflow-hidden border border-[#3498DB]/30">
                <img 
                  src={mpcScreenshot} 
                  alt="MPCGhana.org Website Screenshot" 
                  className="w-full object-cover"
                />
              </div>
              <p className="text-gray-700 mb-6">
                We designed and developed the MPCGhana.org website, creating a modern digital presence
                that effectively communicates their mission and provides valuable resources to their audience.
              </p>
              <div className="flex items-center">
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
            <div className="md:w-1/2 bg-[#3498DB]/10 p-6 md:p-8 flex items-center justify-center">
              <div className="p-4 rounded-lg border border-[#3498DB]/30 bg-white text-center w-full">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#3498DB]/20 text-[#3498DB]">
                    Design Portfolio
                  </span>
                </div>
                <h4 className="font-bold text-[#0A3D62] mb-3">Our Web Design Services</h4>
                <ul className="text-left text-gray-700 mb-4 space-y-2">
                  <li>✓ Custom responsive website design</li>
                  <li>✓ E-commerce development</li>
                  <li>✓ Content management systems</li>
                  <li>✓ SEO optimization</li>
                  <li>✓ Performance tuning</li>
                </ul>
                <a 
                  href="/solutions/website-design" 
                  className="inline-block px-4 py-2 bg-[#3498DB] text-white rounded-md font-medium hover:bg-[#3498DB]/90 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDesignShowcase;