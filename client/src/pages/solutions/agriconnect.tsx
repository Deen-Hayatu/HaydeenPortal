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
                A digital platform connecting farmers, buyers, suppliers, and logistics service providers to streamline agricultural trade and logistics across West Africa.
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
                src="https://images.unsplash.com/photo-1544698310-e5848922d1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="West African farmer using AgriConnect mobile app" 
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
              <div className="text-4xl font-bold text-[#27AE60] mb-2">1,000+</div>
              <p className="text-gray-600">Target active users by Year 1</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">20%</div>
              <p className="text-gray-600">Agriculture's contribution to Ghana's GDP</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">45%</div>
              <p className="text-gray-600">Workforce employed in agriculture</p>
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
                    src="https://images.unsplash.com/photo-1580281820385-d04e2e4e9b36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="West African farmer checking crop data on mobile app" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketplace" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1581515145842-d1a55f6f77be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Digital marketplace for West African farmers" 
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
                    src="https://images.unsplash.com/photo-1565464027194-61c0d6d8c0b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="West African farmers learning through mobile educational content" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="West African farmer community meeting" 
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

      {/* Platform Features & Access */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Multiple Ways to Access AgriConnect</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Access AgriConnect through multiple channels designed for different technology levels and connectivity situations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mobile App */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#27AE60] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Mobile Apps</h3>
              <p className="text-gray-600 mb-4">Android & iOS apps with full functionality for smartphones.</p>
              <div className="text-sm text-gray-500">
                • Offline capability<br/>
                • Push notifications<br/>
                • Camera integration
              </div>
            </div>

            {/* Web Platform */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1ABC9C] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Web Platform</h3>
              <p className="text-gray-600 mb-4">Full-featured web application accessible from any browser.</p>
              <div className="text-sm text-gray-500">
                • Desktop experience<br/>
                • Advanced analytics<br/>
                • Bulk operations
              </div>
            </div>

            {/* USSD */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#F39C12] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#F39C12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948-.684l1.498.75a1 1 0 01.684.948V7a1 1 0 01-1 1H4a1 1 0 01-1-1V5zM8 15a5 5 0 0110 0v1h-2v-1a3 3 0 00-6 0v1H8v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">USSD Code</h3>
              <p className="text-gray-600 mb-4">Basic services accessible without internet on any phone.</p>
              <div className="text-sm text-gray-500">
                • No internet required<br/>
                • Works on any phone<br/>
                • Price checking & SMS alerts
              </div>
            </div>
          </div>

          {/* Payment Integration */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#0A3D62] mb-6 text-center">Integrated Payment Solutions</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-lg font-semibold text-[#27AE60] mb-2">MTN Mobile Money</div>
                <p className="text-gray-600 text-sm">Secure payments and transfers</p>
              </div>
              <div className="p-4">
                <div className="text-lg font-semibold text-[#1ABC9C] mb-2">Telecel Money</div>
                <p className="text-gray-600 text-sm">Quick mobile transactions</p>
              </div>
              <div className="p-4">
                <div className="text-lg font-semibold text-[#F39C12] mb-2">Kudipay</div>
                <p className="text-gray-600 text-sm">Digital wallet integration</p>
              </div>
              <div className="p-4">
                <div className="text-lg font-semibold text-[#E74C3C] mb-2">Bank Transfers</div>
                <p className="text-gray-600 text-sm">Traditional banking options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Choose Your Plan</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Flexible subscription options designed to grow with your agricultural business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-[#F2F2F2] rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-2">Basic</h3>
                <div className="text-4xl font-bold text-[#27AE60] mb-2">Free</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Weather forecasts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Basic marketplace access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Community forums</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">USSD access</span>
                </li>
              </ul>
              <button className="w-full btn bg-[#27AE60] text-white hover:bg-opacity-90">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#27AE60] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#27AE60] text-white px-4 py-1 rounded-full text-sm font-medium">Popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-2">Pro</h3>
                <div className="text-4xl font-bold text-[#27AE60] mb-2">GHS 10<span className="text-lg">/month</span></div>
                <p className="text-gray-600">For growing farms</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Premium buyer access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Price trend alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>
              <button className="w-full btn bg-[#27AE60] text-white hover:bg-opacity-90">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#F2F2F2] rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-[#27AE60] mb-2">GHS 50<span className="text-lg">/month</span></div>
                <p className="text-gray-600">For large operations</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Full logistics integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Bulk order management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Custom reporting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full btn bg-[#27AE60] text-white hover:bg-opacity-90">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>All plans include 1.5% - 2.5% transaction fees on marketplace purchases.</p>
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
