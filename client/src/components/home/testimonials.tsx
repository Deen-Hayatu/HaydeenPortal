import TestimonialCard from "@/components/ui/testimonial-card";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kwame Asante",
      role: "Farm Manager",
      company: "Asante Cocoa Farms",
      content: "I participated in AgriConnect's development interviews. Mohammad's team really understands our daily challenges - from weather unpredictability to market access. Looking forward to using the platform when it launches.",
      rating: 5,
    },
    {
      name: "Dr. Akosua Mensah",
      role: "Chief Medical Officer",
      company: "Kumasi General Hospital",
      content: "The GhEHR concept addresses real problems we face daily. Having participated in their research, I'm impressed by their thorough understanding of Ghana's healthcare system challenges and NHIS integration needs.",
      rating: 5,
    },
    {
      name: "Samuel Osei",
      role: "CEO",
      company: "Osei Trading Company",
      content: "Haydeen Technologies delivered an excellent website for us. Their understanding of local business needs and mobile money integration was outstanding. Professional service from a promising Ghana-based startup.",
      rating: 5,
    },
    {
      name: "Fatima Ibrahim",
      role: "Agricultural Coordinator",
      company: "Northern Ghana Farmers Association",
      content: "Their focus on multilingual support and offline functionality shows deep understanding of rural Ghana's needs. We're excited to see AgriConnect launch and support our farmers' digital transformation.",
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
            What Stakeholders Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Feedback from farmers, healthcare providers, and business partners who are shaping our MVP development process.
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
      </div>
    </section>
  );
};

export default Testimonials;