import { Link } from "wouter";
import { Check } from "lucide-react";

const FeaturedCaseStudy = () => {
  const benefits = [
    "Real-time weather and soil data integration",
    "Direct marketplace connection with fair pricing",
    "Mobile access with low-bandwidth optimization",
    "Educational resources in multiple local languages",
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[#27AE60] font-semibold mb-2 inline-block">FEATURED CASE STUDY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">
              Transforming Agriculture in Northern Ghana
            </h2>
            <p className="text-gray-600 mb-6">
              See how our AgriConnect platform helped 2,500+ small-scale farmers improve crop yields by 35% and connect directly with premium buyers.
            </p>
            
            <ul className="space-y-3 text-gray-600 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            
            <Link href="/solutions/agriconnect" className="btn btn-primary">
              Read Full Case Study
            </Link>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1580281820385-d04e2e4e9b36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Farmers in Ghana using the AgriConnect platform" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
