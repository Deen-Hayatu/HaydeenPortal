import { Link } from "wouter";
import { Shield, Users, FileText, BarChart3, Check, Stethoscope, Database, Cloud } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeadTags from "@/components/seo/head-tags";
import ghehrLogo from "@assets/GhEHR logo_1752832735160.png";

const GhEHR = () => {
  return (
    <>
      <HeadTags
        title="GhEHR | Ghana Electronic Health Record System by Haydeen Technologies"
        description="GhEHR is a comprehensive electronic health record system designed specifically for Ghana's healthcare ecosystem. Features patient records, healthcare analytics, NHIS integration, and secure data management."
        keywords="GhEHR, electronic health records Ghana, healthcare technology, NHIS integration, Ghana Health Service, medical records system, healthcare analytics Ghana, patient data management"
        canonical="https://haydeentechnologies.com/solutions/ghehr"
      />
      {/* Hero Section */}
      <section className="relative bg-[#27AE60] text-white py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src={ghehrLogo} 
                  alt="GhEHR Logo" 
                  className="h-16 w-auto mr-4"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">GhEHR</h1>
                  <p className="text-lg opacity-90">Ghana Electronic Health Record</p>
                </div>
              </div>
              <p className="text-xl mb-8 opacity-90">
                A comprehensive electronic health record system designed specifically for Ghana's healthcare ecosystem, improving patient care and medical data management across all healthcare facilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn bg-white text-[#27AE60] hover:bg-opacity-90">
                  Request Demo
                </Link>
                <a href="#features" className="btn bg-[#0A3D62] text-white hover:bg-opacity-90">
                  Explore Features
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professional using GhEHR system" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-6">Transforming Healthcare in Ghana</h2>
            <p className="text-lg text-gray-600">
              GhEHR addresses the critical need for digital healthcare infrastructure in Ghana, providing a unified platform for patient records, medical history, and healthcare analytics tailored to local medical practices and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">500+</div>
              <p className="text-gray-600">Healthcare facilities targeted in Phase 1</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">30M+</div>
              <p className="text-gray-600">Ghanaian population to benefit</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-[#F2F2F2] rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-[#27AE60] mb-2">24/7</div>
              <p className="text-gray-600">Real-time access to patient data</p>
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
              GhEHR offers comprehensive healthcare management tools designed specifically for Ghana's medical infrastructure and practices.
            </p>
          </div>

          <Tabs defaultValue="records" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="records">Patient Records</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Comprehensive Patient Records</h3>
                  <p className="text-gray-600 mb-6">
                    Complete digital patient records system with support for local medical practices, traditional medicine documentation, and multi-language patient communication.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Digital patient history and medical records</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Prescription and medication tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lab results and diagnostic imaging storage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Support for local languages and medical terminology</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Healthcare professional accessing patient records on GhEHR" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Healthcare analytics dashboard showing Ghana health data" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Healthcare Analytics & Insights</h3>
                  <p className="text-gray-600 mb-6">
                    Advanced analytics for healthcare management, epidemiological tracking, and resource optimization tailored to Ghana's health challenges.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Disease surveillance and outbreak detection</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Resource allocation and capacity planning</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Population health metrics and trends</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Maternal and child health tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Healthcare System Integration</h3>
                  <p className="text-gray-600 mb-6">
                    Seamless integration with existing healthcare infrastructure, government health systems, and international health organizations.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ghana Health Service integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>NHIS (National Health Insurance Scheme) connectivity</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Pharmacy and medical supply chain integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>WHO and international health reporting standards</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Healthcare system integration across Ghana" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="border rounded-lg p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg md:order-first order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Healthcare data security and privacy protection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Security & Compliance</h3>
                  <p className="text-gray-600 mb-6">
                    Enterprise-grade security measures ensuring patient privacy and compliance with Ghana's data protection laws and international healthcare standards.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>End-to-end encryption for all patient data</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ghana Data Protection Act compliance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Role-based access control and audit trails</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Secure cloud infrastructure with local data residency</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits for Ghana */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Benefits for Ghana's Healthcare System</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              GhEHR is designed to address the unique challenges of Ghana's healthcare landscape while improving outcomes for patients and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F2F2F2] rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Improved Patient Care</h3>
              <p className="text-gray-600">
                Complete patient history accessibility across all healthcare facilities in Ghana for better diagnosis and treatment decisions.
              </p>
            </div>

            <div className="bg-[#F2F2F2] rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-[#1ABC9C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Centralized Data Management</h3>
              <p className="text-gray-600">
                Unified healthcare data system reducing duplication and improving coordination between healthcare providers.
              </p>
            </div>

            <div className="bg-[#F2F2F2] rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-[#F39C12] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Public Health Insights</h3>
              <p className="text-gray-600">
                Real-time health analytics supporting government policy decisions and resource allocation for better health outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Implementation Roadmap</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our phased approach ensures smooth adoption across Ghana's healthcare system.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Phase 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#27AE60]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#27AE60] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 1 - Pilot</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">Regional Hospitals</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Deploy GhEHR in 10 major regional hospitals across Ghana to establish core functionality and user training programs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Core EHR functionality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Healthcare provider training</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">System integration testing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Data migration protocols</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#1ABC9C]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#1ABC9C] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 2 - Expansion</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">District Health Centers</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Expand to 200+ district health centers and clinics, implementing mobile access for rural healthcare workers.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="text-sm">Mobile application deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="text-sm">Rural connectivity solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#F39C12]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#F39C12] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 3 - Integration</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">National Health Network</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Complete national rollout with full NHIS integration and cross-border health data sharing capabilities.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#F39C12]" />
                      <span className="text-sm">NHIS full integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#F39C12]" />
                      <span className="text-sm">ECOWAS health data sharing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#27AE60] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Healthcare in Ghana?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join us in building a comprehensive electronic health record system that will improve healthcare outcomes for all Ghanaians.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn bg-white text-[#27AE60] hover:bg-opacity-90">
                Request Partnership
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

export default GhEHR;