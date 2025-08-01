import { Link } from "wouter";
import { MapPin, Clock, Users, Briefcase, Palette, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeadTags from "@/components/seo/head-tags";

const Careers = () => {
  return (
    <>
      <HeadTags
        title="Careers | UX/UI Design Internship - Haydeen Technologies Ghana"
        description="Join Haydeen Technologies as a UX/UI Design Intern. Help design user experiences for AgriConnect and GhEHR platforms. Short-term contract opportunity in Ghana."
        keywords="UX UI design internship Ghana, design jobs Ghana, UX internship Ashanti, AgriConnect design, healthcare UX design, remote design work Ghana"
        canonical="https://haydeentechnologies.com/careers"
      />
      
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Design Team</h1>
            <p className="text-xl opacity-90 mb-4">
              We're currently seeking a UX/UI Design Intern to help shape the user experience of our AgriConnect and GhEHR platforms.
            </p>
            <p className="text-lg opacity-80">
              Join us in creating intuitive, user-centered designs that will impact farmers and healthcare workers across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Current Opening */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Current Opening</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We have one exciting opportunity available for a talented UX/UI design intern.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0A3D62] to-[#27AE60] text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">UX/UI Design Intern</CardTitle>
                    <CardDescription className="text-white/90 text-lg">
                      Help design user experiences for Ghana's leading AgriTech and HealthTech platforms
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <MapPin className="h-4 w-4 mr-1" />
                    Remote / Effiduasi, Ashanti
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Clock className="h-4 w-4 mr-1" />
                    Short-term Contract
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Users className="h-4 w-4 mr-1" />
                    Internship Level
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A3D62] mb-4">What You'll Do</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Design user interfaces for AgriConnect agricultural marketplace platform</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Create user experience flows for GhEHR healthcare record system</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Conduct user research with farmers and healthcare workers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Design mobile-first interfaces optimized for Ghana's connectivity</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Collaborate with development team on implementation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#0A3D62] mb-4">What We're Looking For</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Experience with UX/UI design tools (Figma, Adobe XD, or similar)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Portfolio showcasing mobile-first design projects</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Understanding of user-centered design principles</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Interest in agricultural or healthcare technology</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Knowledge of Ghana's digital landscape preferred</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Strong communication skills in English</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#F8F9FA] rounded-lg">
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-4">What We Offer</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#27AE60] bg-opacity-10 rounded-full flex items-center justify-center">
                        <Monitor className="h-4 w-4 text-[#27AE60]" />
                      </div>
                      <span className="text-gray-700">Flexible remote work options</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1ABC9C] bg-opacity-10 rounded-full flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-[#1ABC9C]" />
                      </div>
                      <span className="text-gray-700">Real-world project experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F39C12] bg-opacity-10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-[#F39C12]" />
                      </div>
                      <span className="text-gray-700">Mentorship from experienced team</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#E74C3C] bg-opacity-10 rounded-full flex items-center justify-center">
                        <Palette className="h-4 w-4 text-[#E74C3C]" />
                      </div>
                      <span className="text-gray-700">Portfolio development opportunities</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white px-8 py-3 text-lg">
                      Apply for This Position
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-3">
                    Send your portfolio and interest via our contact form
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Why Join Haydeen Technologies?</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Be part of a mission-driven team creating technology that transforms lives across Ghana and West Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#27AE60] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-[#27AE60]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Real Impact</h3>
              <p className="text-gray-600">
                Your designs will directly impact farmers improving their livelihoods and healthcare workers serving their communities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#1ABC9C] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-[#1ABC9C]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Career Growth</h3>
              <p className="text-gray-600">
                Gain experience working on innovative MVPs in Ghana's growing tech ecosystem with mentorship and learning opportunities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#F39C12] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="h-8 w-8 text-[#F39C12]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Cutting-Edge Projects</h3>
              <p className="text-gray-600">
                Work on AgriConnect and GhEHR platforms, designing solutions for unique challenges in West African markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0A3D62] to-[#27AE60] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Mission?</h2>
            <p className="text-xl opacity-90 mb-8">
              Send us your portfolio and let us know why you're interested in designing for Ghana's agricultural and healthcare sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#0A3D62] hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Apply Now
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A3D62] px-8 py-3 text-lg font-medium">
                  View Our Platforms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;