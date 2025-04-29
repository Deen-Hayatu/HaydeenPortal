import React from "react";
import logoImage from "@/assets/haydeen-logo.png";

interface CompanyLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "dark" | "light";
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  size = "md",
  showText = true,
  variant = "dark",
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={logoImage}
        alt="Haydeen Technologies Logo"
        className={`${sizeClasses[size]}`}
      />
      {showText && (
        <span className={`font-poppins font-bold text-xl ${variant === "dark" ? "text-[#0A3D62]" : "text-white"}`}>
          Technologies
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
