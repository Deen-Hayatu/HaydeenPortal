import { motion } from "framer-motion";
import { Quote, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

const leadershipCommitments = [
  {
    title: "Transparency over hype",
    body: "We publish sprint notes, KPI targets, and risks inside our MVP documentation hub so partners always know where we are in the build.",
    caption: "Weekly delivery notes · Access granted to pilot partners",
  },
  {
    title: "Human-centered research",
    body: "15+ interviews with agribusiness leaders, clinicians, and local cooperatives inform every backlog item—we design with Ghana in mind.",
    caption: "Research cadence: bi-weekly synthesis · Local language facilitation",
  },
  {
    title: "Secure-by-default architecture",
    body: "Vercel edge + Neon Postgres, encrypted storage, and audit logs ensure the platforms are production-ready the moment pilots go live.",
    caption: "SOC 2 aligned processes · Access controls baked into each MVP",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#27AE60] mb-4">
            Before the testimonials arrive
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
            Commitments you can hold us accountable to
          </h2>
          <p className="text-lg text-gray-600">
            We're still in pilot mode, so instead of fabricated quotes we share the operating principles guiding every engagement. These are the standards that will generate future testimonials.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {leadershipCommitments.map((commitment, index) => (
            <motion.article
              key={commitment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-[#27AE60]">
                <Quote className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Leadership promise
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0A3D62] mb-2">{commitment.title}</h3>
                <p className="text-gray-600 leading-relaxed">{commitment.body}</p>
              </div>
              <p className="text-sm text-gray-500 border-t border-dashed pt-3">
                {commitment.caption}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-[#0A3D62] text-white rounded-2xl p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/80 mb-4">
              <ShieldCheck className="w-4 h-4" />
              Founder Statement
            </div>
            <p className="text-lg leading-relaxed">
              “Our earliest customers will shape these platforms long before press releases. We promise straightforward updates, secure deployments, and delivery teams who pick up the phone.”
            </p>
            <p className="mt-4 text-sm text-white/80">
              Mohammad Deen Hayatu · Founder & CEO
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#0A3D62] font-semibold px-6 py-3 hover:bg-[#FCD116] hover:text-black transition"
            >
              Schedule a discovery call
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Join the early-access list
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;