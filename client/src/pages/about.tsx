import { Link } from "wouter";
import { Check, ShieldCheck } from "lucide-react";
import founderProfessionalPhoto from "../assets/founder-professional-photo.jpg";

const operatingPrinciples = [
  {
    title: "Field research cadence",
    description: "Bi-weekly interviews with farmers, clinicians, and cooperatives keep our backlog grounded in real needs.",
    meta: "23 farmer + 12 clinic touchpoints logged",
  },
  {
    title: "Deployment-first architecture",
    description: "Vercel Edge + Neon serverless Postgres are live today, so MVPs ship onto the same stack we’ll use in production.",
    meta: "Zero-downtime previews, SOC 2 aligned controls",
  },
  {
    title: "Transparent delivery",
    description: "We publish sprint notes, KPIs, and risks inside the MVP documentation hub for every partner engagement.",
    meta: "8-week sprint reviews · Weekly stakeholder notes",
  },
];

const About = () => {
  const heroStats = [
    { label: "Founded", value: "Jan 2025" },
    { label: "HQ", value: "Effiduasi, Ghana" },
    { label: "Focus", value: "Agri + Health MVPs" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Haydeen Technologies</h1>
            <p className="text-xl opacity-90 mb-4">
              Bridging critical gaps in Ghana's and West Africa's industries through innovative software solutions.
            </p>
            <p className="text-lg opacity-80">
              Our mission: Transform agriculture and STEM fields with technology that enhances efficiency and drives sustainable growth across key sectors.
            </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm uppercase tracking-[0.3em] text-white/80">
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#FCD116] animate-pulse" />
                  Pre-seed Ghanaian founders
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  Vercel Edge · Neon Postgres
                </span>
              </div>
          </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="text-white/70 text-sm tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

        {/* Operating Principles */}
        <section className="py-16 md:py-20 bg-[#F8F9FA]">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#27AE60]">How we operate</p>
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Execution principles before public launch</h2>
              <p className="max-w-3xl mx-auto text-gray-600">
                Even without public testimonials, partners can audit our delivery playbook—research cadence, infrastructure, and transparency standards are already in motion.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {operatingPrinciples.map((principle) => (
                <div key={principle.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="inline-flex items-center gap-2 text-[#27AE60] text-xs font-semibold uppercase tracking-widest mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    Operating principle
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A3D62] mb-2">{principle.title}</h3>
                  <p className="text-gray-600 mb-4">{principle.description}</p>
                  <p className="text-sm text-gray-500 border-t border-dashed pt-3">{principle.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded by Mohammad Deen Hayatu in January 2025 in Effiduasi, Ghana, Haydeen Technologies emerged with a clear mission: to develop innovative software solutions that bridge critical gaps in Ghana's and West Africa's industries, starting with agriculture and STEM fields.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with recognizing the challenges facing Ghana's agricultural sector, which contributes ~20% to GDP and employs ~45% of the workforce. We saw inefficient supply chains, limited market access, and low technology adoption as key problems to solve.
              </p>
              <p className="text-gray-600 mb-4">
                This insight led to the development of our flagship product, AgriConnect—a comprehensive digital platform connecting farmers, buyers, suppliers, and logistics service providers to streamline agricultural trade and logistics across West Africa.
              </p>
              <p className="text-gray-600">
                Today, we're positioning ourselves to become the leading provider of industry-specific software solutions in West Africa, with plans to expand into e-commerce, logistics, and STEM research—always enhancing efficiency and growth across key sectors.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={founderProfessionalPhoto} 
                alt="Mohammad Deen Hayatu, Founder of Haydeen Technologies" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business Objectives */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Growth Vision</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We have ambitious but achievable goals for transforming West Africa's digital landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Objective 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full">
              <div className="text-3xl font-bold text-[#27AE60] mb-2">6 Months</div>
              <h3 className="text-lg font-bold text-[#0A3D62] mb-2">Beta Launch</h3>
              <p className="text-gray-600 text-sm flex-grow">
                AgriConnect and GhEHR beta versions for initial user testing
              </p>
            </div>

            {/* Objective 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full">
              <div className="text-3xl font-bold text-[#1ABC9C] mb-2">50+</div>
              <h3 className="text-lg font-bold text-[#0A3D62] mb-2">Beta Users</h3>
              <p className="text-gray-600 text-sm">
                Initial farmers and healthcare providers for MVP validation
              </p>
            </div>

            {/* Objective 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full">
              <div className="text-3xl font-bold text-[#F39C12] mb-2">2025 Q2</div>
              <h3 className="text-lg font-bold text-[#0A3D62] mb-2">Public Launch</h3>
              <p className="text-gray-600 text-sm flex-grow">
                Official launch based on beta feedback and iterations
              </p>
            </div>

            {/* Objective 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full">
              <div className="text-3xl font-bold text-[#E74C3C] mb-2">500+</div>
              <h3 className="text-lg font-bold text-[#0A3D62] mb-2">Year 1 Goal</h3>
              <p className="text-gray-600 text-sm flex-grow">
                Target active users by end of first year post-launch
              </p>
            </div>
          </div>

          {/* Market Context */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-[#0A3D62] mb-6 text-center">Market Opportunity</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#27AE60] mb-2">20%</div>
                <p className="text-gray-600">
                  Agriculture's contribution to Ghana's GDP
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1ABC9C] mb-2">45%</div>
                <p className="text-gray-600">
                  Workforce employed in agriculture sector
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#F39C12] mb-2">75%</div>
                <p className="text-gray-600">
                  Projected mobile penetration by 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Mission & Values</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We're guided by a strong set of principles as we work to create meaningful technological solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col h-full">
              <div className="w-14 h-14 rounded-full bg-[#27AE60] bg-opacity-10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Innovation with Purpose</h3>
              <p className="text-gray-600">
                We don't create technology for technology's sake. Our solutions are designed to solve real problems and create measurable impact.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#1ABC9C] bg-opacity-10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1ABC9C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Local Context, Global Standards</h3>
              <p className="text-gray-600">
                We build solutions deeply rooted in local needs while adhering to world-class engineering and design standards.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#F39C12] bg-opacity-10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F39C12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Inclusive Growth</h3>
              <p className="text-gray-600">
                We believe technology should be accessible to all and help create opportunities for underserved communities and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Roadmap */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Technology Roadmap</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              From AgriConnect to comprehensive digital transformation across multiple sectors.
            </p>
          </div>

          <div className="space-y-8">
            {/* Phase 1: AgriConnect */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#27AE60]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#27AE60] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 1 - Current</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">AgriConnect Platform</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Our flagship MVP connecting farmers, buyers, suppliers, and logistics providers across Ghana's agricultural value chain.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Digital Marketplace</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Logistics Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">Mobile Payment Systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#27AE60]" />
                      <span className="text-sm">USSD Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: GhEHR Healthcare */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#E74C3C]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#E74C3C] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 2 - Development</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">GhEHR Healthcare System</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Comprehensive electronic health record system designed specifically for Ghana's healthcare ecosystem and medical practices.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#E74C3C]"></div>
                      <span className="text-sm">Digital Patient Records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#E74C3C]"></div>
                      <span className="text-sm">Healthcare Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#E74C3C]"></div>
                      <span className="text-sm">NHIS Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#E74C3C]"></div>
                      <span className="text-sm">Multi-Language Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: Multi-Sector Expansion */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#1ABC9C]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#1ABC9C] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 3 - Year 3</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">Multi-Sector Solutions</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Expanding into e-commerce, logistics optimization, and STEM research platforms across Ghana.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#1ABC9C]"></div>
                      <span className="text-sm">EcoVend Platform</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#1ABC9C]"></div>
                      <span className="text-sm">MarketMate Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#1ABC9C]"></div>
                      <span className="text-sm">TransitPro Logistics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#1ABC9C]"></div>
                      <span className="text-sm">STEM Research Tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4: Regional Expansion */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#F39C12]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block bg-[#F39C12] text-white px-4 py-2 rounded-full text-sm font-medium mb-2">Phase 4 - Year 4-5</span>
                  <h3 className="text-2xl font-bold text-[#0A3D62]">West Africa Expansion</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600 mb-4">
                    Scaling successful solutions across Nigeria and Côte d'Ivoire markets with localized adaptations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#F39C12]"></div>
                      <span className="text-sm">Nigeria Market Entry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#F39C12]"></div>
                      <span className="text-sm">Côte d'Ivoire Expansion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#F39C12]"></div>
                      <span className="text-sm">Multi-Language Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#F39C12]"></div>
                      <span className="text-sm">Regional Partnerships</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Meet the Founder</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Leading Haydeen Technologies' mission to transform West Africa's digital landscape.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="mb-6 rounded-full overflow-hidden w-64 h-64 mx-auto md:mx-0">
                  <img 
                    src={founderProfessionalPhoto} 
                    alt="Mohammad Deen Hayatu, Founder of Haydeen Technologies" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#0A3D62] mb-2">Mohammad Deen Hayatu</h3>
                <p className="text-[#27AE60] font-medium text-xl mb-6">Founder & Lead Developer</p>
                <p className="text-gray-600 mb-6">
                  Mohammad Deen Hayatu is a passionate full-stack developer and entrepreneur from Effiduasi, Ghana. With deep understanding of West Africa's agricultural challenges and technological opportunities, he founded Haydeen Technologies to bridge critical gaps in the region's industries.
                </p>
                <p className="text-gray-600 mb-6">
                  As the sole developer behind AgriConnect and other innovative solutions, Mohammad combines technical expertise with local market knowledge to create software that truly serves the needs of West African businesses and communities.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Full-stack development expertise</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Deep understanding of West African markets</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Committed to solving real-world problems</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#27AE60] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Building scalable technology solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0A3D62] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us on Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Interested in working with us or learning more about our solutions? Get in touch today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link href="/solutions" className="btn bg-white text-[#0A3D62] hover:bg-opacity-90">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
