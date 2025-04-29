import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Award, Globe, Users, Database, BookOpen } from "lucide-react";

const Agriconnect = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#27AE60] text-white py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AgriConnect</h1>
              <p className="text-xl mb-8 opacity-90">
                Connecting farmers with agricultural data, markets, and resources to improve productivity and profitability in West Africa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn bg-white text-[#27AE60] hover:bg-opacity-90">
                  Request a Demo
                </Link>
                <a href="#features" className="btn bg-[#0A3D62] text-white hover:bg-opacity-90">
                  Explore Features
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1591339093167-ea5ad9a36ce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Farmer using AgriConnect mobile app" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-6">Transforming Agriculture in West Africa</h2>
            <p className="text-lg text-gray-600">
              AgriConnect is our flagship platform designed to address the critical challenges faced by farmers across West Africa. By combining powerful technology with deep local knowledge, we're helping farmers improve yields, access better markets, and increase their income.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">2,500+</div>
              <p className="text-gray-600">Farmers using AgriConnect</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">35%</div>
              <p className="text-gray-600">Average yield improvement</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">5</div>
              <p className="text-gray-600">West African countries served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Key Features</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              AgriConnect offers a comprehensive suite of tools designed specifically for West African farmers and agricultural businesses.
            </p>
          </div>

          <Tabs defaultValue="data" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="data" className="data-tab">
                <Database className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Data & Insights</span>
                <span className="md:hidden">Data</span>
              </TabsTrigger>
              <TabsTrigger value="marketplace">
                <Globe className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Marketplace</span>
                <span className="md:hidden">Market</span>
              </TabsTrigger>
              <TabsTrigger value="education">
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Education</span>
                <span className="md:hidden">Learn</span>
              </TabsTrigger>
              <TabsTrigger value="community">
                <Users className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Community</span>
                <span className="md:hidden">Connect</span>
              </TabsTrigger>
              <TabsTrigger value="finance">
                <Award className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Finance Access</span>
                <span className="md:hidden">Finance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="data" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Data & Insights</h3>
                  <p className="text-gray-600 mb-6">
                    Access real-time weather forecasts, soil data, and crop-specific insights to make informed decisions about planting, harvesting, and crop management.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Hyperlocal weather forecasts with 90% accuracy</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Soil nutrient analysis and recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Pest and disease early warning system</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Crop yield prediction and optimization</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581093458791-9d62fa3333e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Farmer checking crop data on mobile app" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketplace" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1518735869015-566a18eae4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Digital marketplace for farmers" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Marketplace</h3>
                  <p className="text-gray-600 mb-6">
                    Connect directly with buyers, input suppliers, and service providers through our secure digital marketplace with fair, transparent pricing.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Direct connections to premium buyers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Bulk purchasing of inputs at discounted prices</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Secure payment processing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Quality verification and traceability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Education Resources</h3>
                  <p className="text-gray-600 mb-6">
                    Access a wealth of agricultural knowledge and best practices through our educational resources, available in multiple local languages.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Video tutorials on farming techniques</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Content available in 8 local languages</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Offline access for low-connectivity areas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Seasonal guides for key crops</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1531973486364-5fa64260d75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Farmers learning through mobile educational content" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1609234656388-0ff363383899?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Farmer community meeting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Community</h3>
                  <p className="text-gray-600 mb-6">
                    Connect with other farmers, agricultural experts, and extension officers to share knowledge, ask questions, and collaborate.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Discussion forums for specific crops and regions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Direct messaging with agricultural experts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Group buying and selling opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Local event notifications and coordination</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="finance" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Finance Access</h3>
                  <p className="text-gray-600 mb-6">
                    Gain access to financial services including micro-loans, insurance, and savings products specifically designed for farmers.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Seasonal micro-loans for inputs and equipment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Weather index insurance for crop protection</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Digital savings and payment services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-[#27AE60] mr-2 flex-shrink-0" />
                      <span>Financial literacy training and resources</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Farmer accessing financial services on mobile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#27AE60] font-semibold mb-2 inline-block">CASE STUDY</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Transforming Agriculture in Northern Ghana</h2>
              <p className="text-gray-600">
                See how AgriConnect helped small-scale farmers in Northern Ghana increase yields and income.
              </p>
            </div>

            <div className="bg-[#F2F2F2] rounded-xl p-8 mb-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0A3D62] mb-2">The Challenge</h3>
                <p className="text-gray-600">
                  Small-scale farmers in Northern Ghana faced multiple challenges: limited access to weather information, difficulty connecting with premium buyers, and lack of resources for optimizing crop production. Most farmers were earning below-subsistence incomes despite their hard work and dedication.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0A3D62] mb-2">The Solution</h3>
                <p className="text-gray-600">
                  We deployed AgriConnect to 2,500+ farmers across the region, providing them with:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Localized weather forecasts and soil information</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Direct connections to premium buyers offering fair prices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Educational resources in local languages</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Access to affordable financing for quality inputs</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#0A3D62] mb-2">The Results</h3>
                <p className="text-gray-600 mb-4">
                  After one year of implementation, we observed significant improvements across key metrics:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#27AE60]">35%</div>
                    <p className="text-sm text-gray-600">Increase in crop yields</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#27AE60]">40%</div>
                    <p className="text-sm text-gray-600">Higher farmer income</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#27AE60]">50%</div>
                    <p className="text-sm text-gray-600">Reduced post-harvest losses</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#27AE60]">85%</div>
                    <p className="text-sm text-gray-600">User satisfaction rate</p>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="italic text-gray-600 border-l-4 border-[#27AE60] pl-4 py-2 mb-8">
              "AgriConnect has transformed how I farm. I now know when to plant, have better information about my soil, and can sell my crops at fair prices. My income has increased significantly, and I can provide better for my family."
              <footer className="text-right mt-2 font-semibold">- Abena K., Farmer in Tamale</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#27AE60] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Agriculture?</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a farmer, agricultural business, or organization working in the sector, AgriConnect can help you achieve better results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn bg-white text-[#27AE60] hover:bg-opacity-90">
                Request a Demo
              </Link>
              <Link href="/solutions" className="btn bg-[#0A3D62] text-white hover:bg-opacity-90">
                Explore Other Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Agriconnect;
