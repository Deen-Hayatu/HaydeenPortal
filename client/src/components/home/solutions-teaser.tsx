import { Link } from "wouter";
import { Globe, ShoppingBag, Map, Laptop, Heart, ArrowRight } from "lucide-react";
import AnimatedCard from "@/components/ui/animated-card";
import EnhancedButton from "@/components/ui/enhanced-button";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/ui/countdown-timer";

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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">Solving Real Problems for Ghana's Key Industries</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            From helping farmers connect directly with buyers to modernizing healthcare records, we're building technology that makes a difference. AgriConnect launches Q2 2026, GhEHR launches Q1 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <AnimatedCard 
              key={solution.id}
              delay={index * 0.1}
              className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col h-full"
            >
              <div className={`${solution.color} h-2 transition-all duration-300 group-hover:h-3`}></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col flex-grow">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mb-2 group-hover:text-[#27AE60] transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{solution.description}</p>
                  
                  <div className="mb-4">
                    {solution.isAvailable ? (
                      solution.title === "AgriConnect" ? (
                        <span className="bg-[#27AE60] text-white text-xs px-2 py-1 rounded-full font-medium">
                          Launching Q2 2026
                        </span>
                      ) : solution.title === "GhEHR" ? (
                        <span className="bg-[#E74C3C] text-white text-xs px-2 py-1 rounded-full font-medium">
                          Launching Q1 2026
                        </span>
                      ) : (
                        <span className="bg-[#27AE60] text-white text-xs px-2 py-1 rounded-full font-medium">
                          Available Now
                        </span>
                      )
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-auto">
                  {solution.isAvailable ? (
                    <Link href={solution.path}>
                      <EnhancedButton
                        variant="primary"
                        size="sm"
                        fullWidth
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="group-hover:scale-105 transition-transform duration-300"
                      >
                        Explore MVP
                      </EnhancedButton>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">Future Development</span>
                    </div>
                  )}
                </div>
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
            Be Among the First to Experience Our Platforms
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our beta program and get early access to AgriConnect (Q2 2026) and GhEHR (Q1 2026). Limited spots available for farmers, healthcare workers, and early adopters.
          </p>
          
          {/* Countdown Timers */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-[#F2F2F2] rounded-lg p-6">
              <CountdownTimer 
                targetDate={new Date('2026-01-01')} 
                label="GhEHR"
              />
            </div>
            <div className="bg-[#F2F2F2] rounded-lg p-6">
              <CountdownTimer 
                targetDate={new Date('2026-04-01')} 
                label="AgriConnect"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <EnhancedButton 
                variant="primary" 
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Request Beta Access
              </EnhancedButton>
            </Link>
            <Link href="/products">
              <EnhancedButton 
                variant="outline" 
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                View Platform Details
              </EnhancedButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsTeaser;
