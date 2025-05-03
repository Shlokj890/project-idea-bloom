
import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import FeatureCards from '@/components/FeatureCards';
import { Button } from '@/components/ui/button';
import { ArrowDown, ScanSearch } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  
  const scrollToAnalyzer = () => {
    const analyzerSection = document.getElementById('analyzer-section');
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
              <ScanSearch className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Brand Sentiment Analyzer
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Uncover valuable insights about your brand's perception with our advanced sentiment analysis tool
            </p>
            <Button 
              size="lg" 
              className="animate-pulse hover:animate-none"
              onClick={scrollToAnalyzer}
            >
              Try Now <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Powerful Features for Brand Analysis
          </h2>
          <FeatureCards />
        </div>
      </section>
      
      {/* Analyzer Section */}
      <section id="analyzer-section" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Analyze Your Brand Sentiment
              </h2>
              <p className="text-gray-600">
                Enter text about your brand to get a comprehensive sentiment analysis
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SentimentAnalyzer />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Brand Sentiment Analyzer | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
