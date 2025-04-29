import React from "react";

interface HexagonLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
}

const HexagonLogo: React.FC<HexagonLogoProps> = ({ size = "md", variant = "primary" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const variants = {
    primary: {
      bg: "bg-[#0A3D62]",
      text: "text-white",
    },
    white: {
      bg: "bg-white",
      text: "text-[#0A3D62]",
    },
  };

  const { bg, text } = variants[variant];

  return (
    <div className={`hexagon-logo ${bg} ${sizeClasses[size]} flex items-center justify-center`}>
      <span className={`${text} font-bold text-xl`}>H</span>
    </div>
  );
};

export default HexagonLogo;
