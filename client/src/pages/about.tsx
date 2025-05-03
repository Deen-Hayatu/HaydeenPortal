import { Link } from "wouter";
import { Check } from "lucide-react";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Haydeen Technologies</h1>
            <p className="text-xl opacity-90">
              Developing innovative software solutions for West Africa's most pressing challenges.
            </p>
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
                Haydeen Technologies was founded in 2020 with a clear mission: to develop innovative software solutions that address critical gaps in Ghana's and West Africa's industries.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began in the agricultural sector, where we saw an opportunity to connect farmers with vital resources, data, and markets through technology. This led to the development of our flagship product, AgriConnect.
              </p>
              <p className="text-gray-600">
                Today, we're expanding our impact into commerce, logistics, marketing, and scientific research—always with a focus on creating solutions tailored to the unique needs and challenges of the West African context.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Haydeen Technologies team meeting" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Mission & Values</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We're guided by a strong set of principles as we work to create meaningful technological solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
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

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Leadership Team</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Meet the experienced professionals guiding Haydeen Technologies' mission and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Kofi Mensah" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-1">Kofi Mensah</h3>
              <p className="text-[#27AE60] font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 mb-3">
                Software engineer with 12+ years of experience in building solutions for emerging markets.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Ama Dankwa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-1">Ama Dankwa</h3>
              <p className="text-[#27AE60] font-medium mb-3">Chief Strategy Officer</p>
              <p className="text-gray-600 mb-3">
                Economist and strategist focused on digital transformation across key West African industries.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="David Osei" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] mb-1">David Osei</h3>
              <p className="text-[#27AE60] font-medium mb-3">CTO</p>
              <p className="text-gray-600 mb-3">
                Tech leader with expertise in building scalable platforms and mobile-first solutions.
              </p>
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
