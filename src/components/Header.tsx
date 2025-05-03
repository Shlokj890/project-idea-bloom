
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChartBar, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener effect
  useEffect(() => {
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
          <span className="font-bold text-xl">BSA</span>
        </div>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>About Brand Sentiment Analyzer</SheetTitle>
                <SheetDescription>
                  Understand your brand's perception in the market
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-4">
                <div>
                  <h3 className="font-medium text-lg">What is BSA?</h3>
                  <p className="text-muted-foreground mt-2">
                    Brand Sentiment Analyzer (BSA) is an advanced tool designed to help businesses understand how their brands are perceived in the market. Using natural language processing and machine learning algorithms, BSA analyzes text data to determine sentiment - whether positive, negative, or neutral.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg">How it Works</h3>
                  <p className="text-muted-foreground mt-2">
                    Simply input text about your brand - such as social media comments, customer reviews, or news articles - and our system will analyze the sentiment, providing you with actionable insights into public perception.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg">Key Features</h3>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Real-time sentiment analysis</li>
                    <li>Detailed sentiment breakdown</li>
                    <li>Contextual understanding</li>
                    <li>Trend analysis over time</li>
                    <li>Competitor comparison</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Brand Sentiment Analyzer | All Rights Reserved
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
