import { Link } from "wouter";

const BlogPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">Latest Insights</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Stay tuned for our upcoming thoughts on technology, innovation, and development in West Africa.
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0A3D62] to-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A3D62] mb-4">Blog & Insights Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              We're preparing valuable content about AgriConnect development, Ghana's tech ecosystem, and insights from our MVP journey. Our blog will launch alongside our platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-[#27AE60] text-white font-medium rounded-lg hover:bg-[#27AE60]/90 transition">
                Get Updates
              </Link>
              <Link href="/products" className="inline-flex items-center px-6 py-3 border-2 border-[#0A3D62] text-[#0A3D62] font-medium rounded-lg hover:bg-[#0A3D62] hover:text-white transition">
                View Our MVPs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;