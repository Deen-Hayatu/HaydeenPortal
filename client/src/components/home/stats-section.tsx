import { motion } from "framer-motion";
import { Users, Building, ShieldCheck, Clock } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Clock className="w-8 h-8 text-[#27AE60]" />,
      number: "8-week",
      label: "Delivery Cycles",
      description: "Time-boxed sprints with demo-ready increments"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#27AE60]" />,
      number: "4",
      label: "Compliance Checklists",
      description: "Data, privacy, security & uptime review per release"
    },
    {
      icon: <Building className="w-8 h-8 text-[#27AE60]" />,
      number: "3",
      label: "Pilot Verticals",
      description: "Agriculture, primary care & digital commerce"
    },
    {
      icon: <Users className="w-8 h-8 text-[#27AE60]" />,
      number: "100%",
      label: "Ghana-Based",
      description: "Core team & research partners in-country"
    }
  ];

  const deliveryPrinciples = [
    "Transparent reporting with MVP documentation hub",
    "Hosted on Vercel edge + Neon for zero-ops scaling",
    "Bank-grade encryption & access controls baked in",
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
            Delivery metrics that de-risk your launch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every build sprint is backed by field interviews, measurable KPIs, and deployment practices trusted by modern SaaS teams. Here's how we keep the work professional even before public launch.
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
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-[#0A3D62] to-[#3C6382] rounded-2xl px-8 py-10 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-2">
                  Operational readiness isn’t an afterthought
                </h3>
                <p className="text-white/80">
                  Before we ever ask for public testimonials, we ship against the same standards enterprise partners expect.
                </p>
              </div>
              <ul className="space-y-3 flex-1">
                {deliveryPrinciples.map((principle) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#FCD116]" />
                    <p className="text-sm">{principle}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;