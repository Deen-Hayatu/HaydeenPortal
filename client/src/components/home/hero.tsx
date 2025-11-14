import AgriculturalHeroBg from "@/components/ui/agricultural-hero-bg";
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button";
import PlatformScreenshot from "@/components/ui/platform-screenshot";
import TrustBadges from "@/components/ui/trust-badges";
import OptimizedImage from "@/components/ui/optimized-image";
import { LazyComponent } from "@/components/performance/intersection-observer";
import { motion } from "framer-motion";
import { Link } from "wouter";

const Hero = () => {
  const deliverySignals = [
    {
      value: "2 MVPs",
      label: "AgriConnect & GhEHR in build",
    },
    {
      value: "15+ Interviews",
      label: "Ghana farmers & clinicians",
    },
    {
      value: "<48h",
      label: "Response SLA for pilots",
    },
  ];

  return (
    <section 
      className="relative bg-gradient-to-br from-[#0A3D62] via-[#1B4F72] to-[#27AE60] text-white overflow-hidden min-h-screen flex items-center"
      aria-label="Hero section - Innovative Software Solutions for West Africa"
    >
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium tracking-wide uppercase"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FCD116] animate-pulse" />
                  Pre-seed Ghanaian team · Powered by Vercel + Neon
                </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold font-poppins leading-tight"
              >
                  Building mission-critical platforms for{" "}
                <span className="text-[#FCD116] drop-shadow-lg">
                    West Africa
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl opacity-90 max-w-2xl"
              >
                  We craft reliable MVPs for Ghana's agriculture and healthcare systems—combining stakeholder research, compliant architecture, and an execution stack that ships fast (Vercel edge + Neon serverless Postgres). Partners get transparent roadmaps, data safeguards, and teams on the ground in Effiduasi.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <EnhancedCTAButton variant="primary" size="lg" href="/solutions/agriconnect" className="bg-[#FCD116] text-black hover:bg-[#F1C40F] px-8 py-4 text-lg font-bold">
                Learn About AgriConnect
              </EnhancedCTAButton>
              <EnhancedCTAButton variant="demo" size="lg" href="/products">
                View MVPs
              </EnhancedCTAButton>
              <EnhancedCTAButton variant="contact" size="lg" href="/contact">
                Get Updates
              </EnhancedCTAButton>
            </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="grid sm:grid-cols-3 gap-4 text-left"
              >
                {deliverySignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
                  >
                    <div className="text-2xl font-bold">{signal.value}</div>
                    <p className="text-sm text-white/80">{signal.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="text-white/70">Need the delivery playbook?</span>
                <Link
                  href="/mvp-progress"
                  className="inline-flex items-center gap-1 font-semibold text-[#FCD116] hover:text-white transition"
                >
                  Review MVP documentation →
                </Link>
              </motion.div>
            
            {/* Ghana-specific trust badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <TrustBadges variant="dark" />
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
