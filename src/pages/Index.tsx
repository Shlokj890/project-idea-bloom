
import SentimentAnalyzer from '@/components/SentimentAnalyzer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Brand Sentiment Analysis</h1>
        <SentimentAnalyzer />
      </div>
    </div>
  );
};

export default Index;
