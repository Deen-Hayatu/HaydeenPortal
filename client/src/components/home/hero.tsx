import { Link } from "wouter";
import AgriculturalHeroBg from "@/components/ui/agricultural-hero-bg";
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button";
import PlatformScreenshot from "@/components/ui/platform-screenshot";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0A3D62] via-[#1B4F72] to-[#27AE60] text-white overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background with agricultural theme */}
      <div className="absolute inset-0 z-0">
        <AgriculturalHeroBg />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D62]/80 via-[#1B4F72]/70 to-[#27AE60]/60"></div>
      </div>
      
      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold font-poppins leading-tight"
              >
                Innovative Software Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27AE60] to-[#2ECC71]">
                  West Africa
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl opacity-90 max-w-2xl"
              >
                Addressing critical gaps in Ghana's and West Africa's industries—starting with agriculture and expanding into healthcare, commerce, logistics, and scientific research.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <EnhancedCTAButton variant="primary" size="lg" href="/solutions/agriconnect">
                Explore AgriConnect
              </EnhancedCTAButton>
              <EnhancedCTAButton variant="demo" size="lg" href="/products">
                Watch Demo
              </EnhancedCTAButton>
              <EnhancedCTAButton variant="contact" size="lg" href="/contact">
                Talk to an Expert
              </EnhancedCTAButton>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#27AE60]">500+</div>
                <div className="text-sm opacity-75">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#27AE60]">95%</div>
                <div className="text-sm opacity-75">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#27AE60]">24/7</div>
                <div className="text-sm opacity-75">Support</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Platform Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <PlatformScreenshot 
                platform="agriconnect" 
                className="transform hover:scale-105 transition-transform duration-500 animate-float"
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#27AE60] rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-sm">NEW</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#F39C12] rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xs">AI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,69.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
