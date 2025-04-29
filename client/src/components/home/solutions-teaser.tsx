import { Link } from "wouter";
import { Globe, ShoppingBag, Map } from "lucide-react";

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
    title: "EcoVend",
    description: "Sustainable e-commerce platform connecting local artisans and eco-friendly products with global markets.",
    icon: <ShoppingBag className="h-8 w-8 text-[#1ABC9C]" />,
    color: "bg-[#1ABC9C]",
    path: "#",
    isAvailable: false,
  },
  {
    id: 3,
    title: "TransitPro",
    description: "Optimizing logistics and transportation networks across West Africa for efficient goods movement.",
    icon: <Map className="h-8 w-8 text-[#F39C12]" />,
    color: "bg-[#F39C12]",
    path: "#",
    isAvailable: false,
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
          {solutions.map((solution) => (
            <div 
              key={solution.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`${solution.color} h-2`}></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-[#F2F2F2] rounded-full flex items-center justify-center mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                
                {solution.isAvailable ? (
                  <Link href={solution.path} className="text-[#27AE60] font-semibold inline-flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-gray-400 inline-flex items-center">
                    Coming soon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/solutions" className="btn btn-outline">
            View All Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsTeaser;
