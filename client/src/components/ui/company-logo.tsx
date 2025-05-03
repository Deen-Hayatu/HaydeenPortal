import React from "react";
import logoImage from "@/assets/haydeen-new-logo.png";

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
    md: "h-14",
    lg: "h-18",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={logoImage}
        alt="Haydeen Technologies Logo"
        className={`${sizeClasses[size]}`}
      />
      {showText && (
        <span className={`font-poppins font-semibold ${textSizeClasses[size]} ${variant === "dark" ? "text-[#0A3D62]" : "text-white"}`}>
          Technologies
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
