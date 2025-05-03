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
    sm: "h-10",
    md: "h-12",
    lg: "h-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-3">
      <img
        src={logoImage}
        alt="Haydeen Technologies Logo"
        className={`${sizeClasses[size]}`}
      />
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-poppins font-bold leading-tight ${textSizeClasses[size]} ${variant === "dark" ? "text-[#0A3D62]" : "text-white"}`}>
            Haydeen
          </span>
          <span className={`font-poppins font-semibold leading-tight ${size === "lg" ? "text-xl" : size === "md" ? "text-base" : "text-sm"} ${variant === "dark" ? "text-[#0A3D62]" : "text-white"}`}>
            Technologies
          </span>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
