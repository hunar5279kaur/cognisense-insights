import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

interface NavbarProps {
  children?: ReactNode;
  showLogo?: boolean;
}

export function Navbar({ children, showLogo = true }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {showLogo && <Logo />}
        <div className="flex items-center gap-4">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
