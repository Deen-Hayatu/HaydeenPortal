import React from "react";
import logoImage from "@/assets/new-haydeen-logo.png";

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
    sm: "h-16",
    md: "h-24",
    lg: "h-32",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center">
      <img
        src={logoImage}
        alt="Haydeen Technologies Logo"
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};

export default CompanyLogo;
