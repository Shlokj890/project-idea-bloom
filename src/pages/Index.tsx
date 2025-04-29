
import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 md:mb-0">Brand Sentiment Analyzer</h1>
          <Link to="/thesis">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Research Thesis
            </Button>
          </Link>
        </div>
        <SentimentAnalyzer />
      </div>
    </div>
  );
};

export default Index;
