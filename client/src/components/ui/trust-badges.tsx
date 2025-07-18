import { motion } from "framer-motion";
import { Shield, CheckCircle, Award, Smartphone } from "lucide-react";

interface TrustBadgesProps {
  className?: string;
  variant?: "light" | "dark";
}

const TrustBadges = ({ className = "", variant = "light" }: TrustBadgesProps) => {
  const badges = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      text: "MTN Mobile Money",
      subtitle: "Certified Partner",
      color: "bg-yellow-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Ghana Health Service",
      subtitle: "Approved Provider",
      color: "bg-green-600"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "ISO 27001",
      subtitle: "Data Security",
      color: "bg-blue-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Ghana Business",
      subtitle: "Licensed",
      color: "bg-purple-600"
    }
  ];

  const textColor = variant === "dark" ? "text-white" : "text-gray-800";
  const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3"
          >
            <div className={`${badge.color} text-white p-2 rounded-full flex-shrink-0`}>
              {badge.icon}
            </div>
            <div className="min-w-0">
              <div className={`font-semibold text-sm ${textColor}`}>
                {badge.text}
              </div>
              <div className={`text-xs ${subtitleColor}`}>
                {badge.subtitle}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;