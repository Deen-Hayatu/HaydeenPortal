import TestimonialCard from "@/components/ui/testimonial-card";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kwame Asante",
      role: "Farm Manager",
      company: "Asante Cocoa Farms",
      content: "AgriConnect has transformed how we manage our cocoa plantation. The weather forecasting and market price alerts help us make better decisions every day. Our productivity has increased by 40% since using this platform.",
      rating: 5,
    },
    {
      name: "Dr. Akosua Mensah",
      role: "Chief Medical Officer",
      company: "Kumasi General Hospital",
      content: "GhEHR has revolutionized our patient records management. We can now access patient history instantly, and the integration with NHIS makes billing seamless. It's exactly what Ghana's healthcare system needed.",
      rating: 5,
    },
    {
      name: "Samuel Osei",
      role: "CEO",
      company: "Osei Trading Company",
      content: "Haydeen Technologies built our e-commerce platform in just 6 weeks. Their understanding of the Ghanaian market and mobile money integration was outstanding. Sales have tripled since launch.",
      rating: 5,
    },
    {
      name: "Fatima Ibrahim",
      role: "Agricultural Coordinator",
      company: "Northern Ghana Farmers Association",
      content: "The multilingual support in AgriConnect, including local languages, makes it accessible to all our farmers. The offline functionality is crucial for our remote areas. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied customers across Ghana and West Africa who have transformed their businesses with our innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
                className="h-full"
              />
            </motion.div>
          ))}
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
              <span className="text-gray-700 font-medium">ISO 27001 Compliant</span>
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
      </div>
    </section>
  );
};

export default Testimonials;