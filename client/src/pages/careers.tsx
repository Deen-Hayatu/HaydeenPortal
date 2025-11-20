import { Link } from "wouter";
import { MapPin, Clock, Users, Briefcase, Palette, Monitor, BarChart3, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeadTags from "@/components/seo/head-tags";

const hiringSteps = [
  {
    title: "Apply + portfolio/CV",
    description: "Submit via the careers form or contact email; we acknowledge within 3 business days.",
    duration: "Days 0–3",
  },
  {
    title: "Working session",
    description: "45-minute call to review past work or research approach—no speculative assignments.",
    duration: "Days 4–7",
  },
  {
    title: "Offer & onboarding",
    description: "We execute NDAs, grant access to our Vercel/Neon stack, and plug you into sprint documentation.",
    duration: "Days 8–10",
  },
];

const Careers = () => {
  return (
    <>
      <HeadTags
        title="Careers | Internship Opportunities - Haydeen Technologies Ghana"
        description="Join Haydeen Technologies as a UX/UI Design Intern or Agribusiness Research Intern. Help build AgriConnect platform and conduct market research in Ghana's agricultural sector."
        keywords="UX UI design internship Ghana, agribusiness research internship Ghana, agricultural market research Ghana, AgriConnect design, agriculture internship Ashanti"
        canonical="https://haydeentechnologies.com/careers"
      />
      
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl opacity-90 mb-4">
              We're currently seeking talented interns to help build AgriConnect and conduct agricultural market research.
            </p>
            <p className="text-lg opacity-80">
              Join us in creating technology and insights that will impact farmers and transform agriculture across Ghana.
            </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center text-xs uppercase tracking-[0.4em] text-white/80">
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#FCD116] animate-pulse" />
                  Paid, sprint-based internships
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  Remote-friendly · Ghana time zones
                </span>
              </div>
          </div>
        </div>
      </section>

      {/* Current Opening */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Current Openings</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We have two exciting internship opportunities available to help build our AgriConnect platform.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* UX/UI Design Intern */}
            <Card className="bg-white border shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0A3D62] to-[#27AE60] text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">UX/UI Design Intern</CardTitle>
                    <CardDescription className="text-white/90 text-lg">
                      Help design the user interface for our AgriConnect agricultural marketplace platform
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
                        <span>Design user interfaces for AgriConnect mobile and web applications</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Create wireframes and mockups for farmer and buyer dashboards</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Design mobile-first interfaces optimized for Ghana's connectivity</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Conduct user research with farmers and agricultural buyers</span>
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
                        <span>Interest in agricultural technology and marketplace platforms</span>
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

                <div className="mt-8 text-center">
                  <Link href="/apply?position=UX/UI Design Intern">
                    <Button size="lg" className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white px-8 py-3 text-lg">
                      Apply for UX/UI Position
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Agribusiness Research Intern */}
            <Card className="bg-white border shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#27AE60] to-[#1ABC9C] text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">Agribusiness Research Intern</CardTitle>
                    <CardDescription className="text-white/90 text-lg">
                      Conduct market research to support AgriConnect platform development and strategy
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-8 w-8 text-white" />
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
                        <span>Research Ghana's agricultural market trends and opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Analyze farmer needs and buyer requirements for digital platforms</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Conduct surveys and interviews with agricultural stakeholders</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Prepare market analysis reports and presentations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Support business development and partnership strategies</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#0A3D62] mb-4">What We're Looking For</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Background in agribusiness, agricultural economics, or related field</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Understanding of Ghana's agricultural value chains</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Experience with market research methods and data analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Knowledge of agricultural markets in West Africa</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Strong analytical and communication skills</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#1ABC9C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Fluency in English and local languages preferred</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/apply?position=Agribusiness Research Intern">
                    <Button size="lg" className="bg-[#1ABC9C] hover:bg-[#1ABC9C]/90 text-white px-8 py-3 text-lg">
                      Apply for Research Position
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="bg-[#F8F9FA] rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#0A3D62] mb-6 text-center">What We Offer Both Positions</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#27AE60] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-[#27AE60]" />
                  </div>
                  <span className="text-gray-700">Flexible remote work options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1ABC9C] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-[#1ABC9C]" />
                  </div>
                  <span className="text-gray-700">Real-world project experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F39C12] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#F39C12]" />
                  </div>
                  <span className="text-gray-700">Mentorship and guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E74C3C] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Search className="h-5 w-5 text-[#E74C3C]" />
                  </div>
                  <span className="text-gray-700">Portfolio development opportunities</span>
                </div>
              </div>
              <p className="text-center text-gray-500 mt-6">
                Send your portfolio/CV and interest via our contact form, specifying which position interests you
              </p>
            </div>
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

        {/* Hiring Process */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#27AE60]">What to expect</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our hiring process in three check-ins</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                We keep internships structured and respectful of your time—here's exactly what happens once you apply.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hiringSteps.map((step) => (
                <div key={step.title} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-2">{step.duration}</p>
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              <span className="inline-flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#27AE60]" />
                Every applicant receives written feedback after the working session.
              </span>
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
              <Link href="/apply">
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