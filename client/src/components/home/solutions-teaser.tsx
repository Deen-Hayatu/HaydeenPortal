import { Link } from "wouter";
import { Globe, ShoppingBag, Map, Laptop, Heart } from "lucide-react";
import AnimatedCard from "@/components/ui/animated-card";
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button";
import { motion } from "framer-motion";

const solutions = [
  {
    id: 1,
    title: "AgriConnect",
    description: "Connecting farmers with agricultural data, markets, and resources to improve productivity and profitability.",
    icon: <Globe className="h-8 w-8 text-[#27AE60]" />,
    color: "bg-[#27AE60]",
    path: "/solutions/agriconnect",
    isAvailable: true,
  },
  {
    id: 2,
    title: "GhEHR",
    description: "Comprehensive electronic health record system designed specifically for Ghana's healthcare ecosystem and medical practices.",
    icon: <Heart className="h-8 w-8 text-[#E74C3C]" />,
    color: "bg-[#E74C3C]",
    path: "/solutions/ghehr",
    isAvailable: true,
  },
  {
    id: 3,
    title: "EcoVend",
    description: "Sustainable e-commerce platform connecting local artisans and eco-friendly products with global markets.",
    icon: <ShoppingBag className="h-8 w-8 text-[#1ABC9C]" />,
    color: "bg-[#1ABC9C]",
    path: "#",
    isAvailable: false,
  },
  {
    id: 4,
    title: "TransitPro",
    description: "Optimizing logistics and transportation networks across West Africa for efficient goods movement.",
    icon: <Map className="h-8 w-8 text-[#F39C12]" />,
    color: "bg-[#F39C12]",
    path: "#",
    isAvailable: false,
  },
  {
    id: 5,
    title: "Website Design",
    description: "Custom website design and development for companies and individuals, creating modern, responsive digital experiences.",
    icon: <Laptop className="h-8 w-8 text-[#3498DB]" />,
    color: "bg-[#3498DB]",
    path: "/solutions/website-design",
    isAvailable: true,
  },
];

const SolutionsTeaser = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">Our Solutions</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We develop innovative software solutions that address critical challenges across various industries in West Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <AnimatedCard 
              key={solution.id}
              delay={index * 0.1}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className={`${solution.color} h-2 transition-all duration-300 group-hover:h-3`}></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mb-2 group-hover:text-[#27AE60] transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                
                {solution.isAvailable ? (
                  <EnhancedCTAButton
                    variant="primary"
                    size="sm"
                    href={solution.path}
                    className="w-full justify-center"
                  >
                    Learn More
                  </EnhancedCTAButton>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Coming Soon</span>
                  </div>
                )}
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses across Ghana and West Africa who have modernized their operations with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedCTAButton variant="primary" size="lg" href="/contact">
              Get Started Today
            </EnhancedCTAButton>
            <EnhancedCTAButton variant="demo" size="lg" href="/products">
              Book a Demo
            </EnhancedCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsTeaser;
