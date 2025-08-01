import { Link } from "wouter";
import HeadTags from "@/components/seo/head-tags";

const Blog = () => {
  return (
    <>
      <HeadTags
        title="Blog & Insights | Haydeen Technologies Ghana - Coming Soon"
        description="Stay tuned for insights from Haydeen Technologies about AgriConnect development, Ghana's tech ecosystem, and our MVP journey in West Africa."
        keywords="Haydeen Technologies blog, Ghana tech insights, AgriConnect development, MVP journey, West Africa technology"
        canonical="https://haydeentechnologies.com/blog"
      />
      
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl opacity-90">
              Coming soon: Insights from our journey building innovative solutions for West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#F8F9FA] rounded-xl p-12 mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0A3D62] to-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Blog Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We're preparing valuable content that will share insights from our MVP development journey, lessons learned from building AgriConnect and GhEHR, and perspectives on Ghana's evolving tech ecosystem.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#27AE60] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] mb-2">MVP Development</h3>
                  <p className="text-sm text-gray-600">Behind-the-scenes insights from building AgriConnect and GhEHR</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1ABC9C] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] mb-2">Ghana Tech Scene</h3>
                  <p className="text-sm text-gray-600">Analysis of opportunities and challenges in West Africa's digital landscape</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F39C12] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#F39C12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] mb-2">Innovation Stories</h3>
                  <p className="text-sm text-gray-600">Real stories from farmers, healthcare workers, and our development process</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="inline-flex items-center px-8 py-3 bg-[#27AE60] text-white font-medium rounded-lg hover:bg-[#27AE60]/90 transition">
                Get Updates When We Launch
              </Link>
              <Link href="/products" className="inline-flex items-center px-8 py-3 border-2 border-[#0A3D62] text-[#0A3D62] font-medium rounded-lg hover:bg-[#0A3D62] hover:text-white transition">
                Explore Our MVPs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;