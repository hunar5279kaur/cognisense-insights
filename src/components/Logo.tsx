import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
        <Brain className={`${sizeClasses[size]} text-primary relative z-10 transition-transform group-hover:scale-110`} />
      </div>
      {showText && (
        <span className={`${textClasses[size]} font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
          CogniSense
        </span>
      )}
    </Link>
  );
}
