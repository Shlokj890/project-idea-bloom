
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartBar, BarChart3, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener effect
  useState(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChartBar className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SentimentScan</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>About</span>
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
