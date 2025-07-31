import { motion } from "framer-motion";
import { Users, Building, Award, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#27AE60]" />,
      number: "2,500+",
      label: "Active Users",
      description: "Farmers and healthcare providers using our platforms"
    },
    {
      icon: <Building className="w-8 h-8 text-[#27AE60]" />,
      number: "150+",
      label: "Partner Organizations",
      description: "Hospitals, farms, and businesses we've worked with"
    },
    {
      icon: <Award className="w-8 h-8 text-[#27AE60]" />,
      number: "5 Years",
      label: "Industry Experience",
      description: "Delivering innovative solutions across Ghana"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#27AE60]" />,
      number: "95%",
      label: "Success Rate",
      description: "Projects completed on time and within budget"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Since our founding in Ghana, we've been committed to delivering exceptional results for businesses across West Africa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#0A3D62] mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-800 mb-3">
                  {stat.label}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#0A3D62] to-[#3C6382] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Building Solutions for Ghana's Digital Future
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#27AE60]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Ghana Business License</div>
                  <div className="text-sm opacity-80">Officially Registered</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#27AE60]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Local Expertise</div>
                  <div className="text-sm opacity-80">ISO 27001 Standards</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#27AE60]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Local Support</div>
                  <div className="text-sm opacity-80">24/7 in Ghana</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;