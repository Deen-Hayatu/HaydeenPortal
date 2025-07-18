import { Link } from "wouter";
import { MapPin, Clock, Users, Briefcase, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeadTags from "@/components/seo/head-tags";

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Effiduasi, Ashanti / Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "Join our team to build user-friendly interfaces for AgriConnect and GhEHR platforms using React and modern web technologies.",
      requirements: [
        "3+ years experience with React.js and TypeScript",
        "Experience with Tailwind CSS and responsive design",
        "Understanding of Ghana's digital landscape",
        "Fluency in English and Twi preferred"
      ],
      benefits: [
        "Competitive salary in GHS",
        "Health insurance coverage",
        "Professional development opportunities",
        "Flexible remote work options"
      ]
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Effiduasi, Ashanti / Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Develop robust APIs and database systems for our agricultural and healthcare platforms, with focus on Ghana-specific integrations.",
      requirements: [
        "4+ years experience with Node.js and PostgreSQL",
        "Experience with payment integrations (Mobile Money preferred)",
        "Knowledge of healthcare or agricultural systems",
        "Understanding of Ghana's regulatory requirements"
      ],
      benefits: [
        "Competitive salary in GHS",
        "Health insurance coverage",
        "Professional development opportunities",
        "Flexible remote work options"
      ]
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Effiduasi, Ashanti",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead product strategy for AgriConnect and GhEHR, working closely with stakeholders in Ghana's agricultural and healthcare sectors.",
      requirements: [
        "5+ years product management experience",
        "Experience in healthcare or agricultural technology",
        "Deep understanding of Ghana's market dynamics",
        "Strong communication skills in English and local languages"
      ],
      benefits: [
        "Competitive salary in GHS",
        "Health insurance coverage",
        "Professional development opportunities",
        "Leadership development programs"
      ]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      experience: "2-4 years",
      description: "Design intuitive user experiences for our platforms, considering Ghana's diverse user base and technological constraints.",
      requirements: [
        "3+ years UI/UX design experience",
        "Portfolio showing mobile-first design",
        "Understanding of accessibility in developing markets",
        "Experience with Figma and design systems"
      ],
      benefits: [
        "Competitive hourly rate",
        "Flexible working hours",
        "Project-based compensation",
        "Portfolio enhancement opportunities"
      ]
    }
  ];

  const companyValues = [
    {
      icon: Heart,
      title: "Impact-Driven",
      description: "We build technology that makes a real difference in Ghana and West Africa"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We work together as a team, valuing diverse perspectives and local knowledge"
    },
    {
      icon: GraduationCap,
      title: "Learning-Focused",
      description: "We invest in continuous learning and professional development for all team members"
    },
    {
      icon: Briefcase,
      title: "Professional Excellence",
      description: "We deliver high-quality solutions while maintaining work-life balance"
    }
  ];

  return (
    <>
      <HeadTags
        title="Careers | Join Haydeen Technologies Ghana - Software Development Jobs"
        description="Join Ghana's leading technology company. We're hiring developers, product managers, and designers to build innovative solutions for agriculture and healthcare in West Africa."
        keywords="software jobs Ghana, developer jobs Ashanti, tech careers Ghana, AgriConnect jobs, healthcare technology jobs, remote work Ghana, Effiduasi jobs"
        canonical="https://haydeentechnologies.com/careers"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A3D62] to-[#3C6382] text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build the future of technology in Ghana and West Africa
            </p>
            <p className="text-lg mb-8 opacity-80">
              We're looking for passionate individuals who want to make a difference through technology
            </p>
            <Button asChild size="lg" className="bg-[#27AE60] hover:bg-[#229954]">
              <Link href="#positions">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building a company culture that reflects the best of Ghana's collaborative spirit and innovative mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-[#27AE60] mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="bg-gray-50 py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us in building innovative solutions for Ghana's agricultural and healthcare sectors.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {openPositions.map((position) => (
              <Card key={position.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                      <CardDescription className="text-lg">{position.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-[#27AE60] text-white">
                      {position.department}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {position.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {position.experience}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {position.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-wrap gap-3">
                      <Button className="bg-[#0A3D62] hover:bg-[#082E4A]">
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        Share Position
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#27AE60] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Application</h3>
                <p className="text-sm text-muted-foreground">
                  Send your CV and cover letter highlighting your experience with Ghana's tech ecosystem.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#27AE60] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Technical Interview</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss your technical skills and experience with projects relevant to our mission.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#27AE60] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Team Meeting</h3>
                <p className="text-sm text-muted-foreground">
                  Meet our team and learn more about our culture and vision for Ghana's digital future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0A3D62] text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-lg mb-8 opacity-90">
              We're always looking for talented individuals who share our passion for building technology solutions for Ghana and West Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#27AE60] hover:bg-[#229954]">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0A3D62]">
                <a href="mailto:careers@haydeentechnologies.com">Send CV</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;