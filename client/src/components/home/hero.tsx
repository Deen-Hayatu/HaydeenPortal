import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative bg-[#0A3D62] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D62] to-[#1ABC9C] opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="West African landscape" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight mb-6">
            Innovative Software Solutions for West Africa
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Addressing critical gaps in Ghana's and West Africa's industries—starting with agriculture and expanding into commerce, logistics, marketing, and scientific research.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/solutions/agriconnect" className="btn btn-primary">
              Explore Agriconnect
            </Link>
            <Link href="/contact" className="btn bg-white text-[#0A3D62] hover:bg-opacity-90">
              Get Started
            </Link>
          </div>
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
