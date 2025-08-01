import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-8">
            Customer Testimonials
          </h2>
          
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
              <div className="text-6xl text-[#27AE60] mb-6 opacity-20">
                💬
              </div>
              <h3 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're actively developing our MVP solutions and working closely with farmers, healthcare providers, and businesses across Ghana. Customer testimonials will be available once our platforms launch.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Join our waiting list to be among the first to experience our solutions
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Ghana Business License</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Local Ghana Team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">24/7 Local Support</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;