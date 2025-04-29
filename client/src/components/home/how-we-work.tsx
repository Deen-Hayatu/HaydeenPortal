const steps = [
  {
    number: 1,
    title: "Research",
    description: "We start by understanding the unique challenges faced by industries in West Africa.",
    color: "bg-[#0A3D62]",
  },
  {
    number: 2,
    title: "Design",
    description: "We design innovative solutions that are tailored to local needs and constraints.",
    color: "bg-[#27AE60]",
  },
  {
    number: 3,
    title: "Develop",
    description: "Our team builds robust, scalable software using cutting-edge technologies.",
    color: "bg-[#1ABC9C]",
  },
  {
    number: 4,
    title: "Deploy & Support",
    description: "We provide ongoing support and iterate based on real-world feedback and impact.",
    color: "bg-[#F39C12]",
  },
];

const HowWeWork = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">How We Work</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our approach combines technological innovation with deep industry knowledge to create impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-lg shadow-md p-6 relative">
              <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-xl`}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mt-3 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
