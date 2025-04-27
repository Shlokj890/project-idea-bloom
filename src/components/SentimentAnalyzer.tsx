
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Meh, TrendingUp, TrendingDown, ListCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample sentiment analysis data to simulate results
const mockSentimentAnalysis = (text: string) => {
  // Simple sentiment analysis based on positive and negative word counts
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'awesome', 'wonderful', 'love', 'like', 'happy', 'best'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'poor', 'worst', 'disappointed', 'sad'];
  
  const words = text.toLowerCase().split(/\s+/);
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  const score = (positiveCount - negativeCount) / (positiveCount + negativeCount + 1);
  
  if (score > 0) {
    return {
      label: 'POSITIVE',
      score: 0.5 + score * 0.5 // Scale between 0.5 and 1.0
    };
  } else {
    return {
      label: 'NEGATIVE',
      score: 0.5 - score * 0.5 // Scale between 0 and 0.5
    };
  }
};

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<{label: string, score: number} | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use the mock sentiment analysis function
      const result = mockSentimentAnalysis(text);
      setSentiment(result);
      
      toast({
        title: "Analysis Complete",
        description: `Sentiment detected: ${result.label}`,
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the sentiment. Please try again.",
        variant: "destructive"
      });
    }
    setIsAnalyzing(false);
  };

  const getSentimentIcon = () => {
    if (!sentiment) return <Meh className="w-12 h-12 text-gray-400" />;
    return sentiment.label === 'POSITIVE' ? 
      <Smile className="w-12 h-12 text-green-500" /> : 
      <Frown className="w-12 h-12 text-red-500" />;
  };

  const getSentimentColor = () => {
    if (!sentiment) return 'bg-gray-100';
    return sentiment.label === 'POSITIVE' ? 'bg-green-100' : 'bg-red-100';
  };

  const getAnalysisPoints = () => {
    if (!sentiment) return [];
    
    const points = [
      `Overall Sentiment: ${sentiment.label.toLowerCase()}`,
      `Confidence Score: ${Math.round(sentiment.score * 100)}%`,
      sentiment.label === 'POSITIVE' 
        ? 'Positive language detected in the text'
        : 'Negative language detected in the text',
      `Sentiment Strength: ${sentiment.score > 0.75 || sentiment.score < 0.25 ? 'Strong' : 'Moderate'}`
    ];
    
    return points;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="p-6 space-y-4 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Brand Sentiment Analyzer</h2>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text about your brand..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] transition-all duration-300 focus:shadow-md"
          />
          <Button 
            onClick={analyzeSentiment} 
            disabled={!text.trim() || isAnalyzing}
            className="w-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                Analyzing...
              </span>
            ) : (
              'Analyze Sentiment'
            )}
          </Button>
        </div>

        {sentiment && (
          <div 
            className={`mt-6 p-6 rounded-lg ${getSentimentColor()} transition-all duration-300 animate-fade-in`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-xl font-semibold">Sentiment Result</h3>
                  <p className="text-gray-600">
                    {sentiment.label === 'POSITIVE' ? 'Positive Sentiment' : 'Negative Sentiment'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <ListCheck className="h-4 w-4" />
                    Analysis Points
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {getAnalysisPoints().map((point, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                {getSentimentIcon()}
                {sentiment.label === 'POSITIVE' ? 
                  <TrendingUp className="text-green-500" /> : 
                  <TrendingDown className="text-red-500" />
                }
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SentimentAnalyzer;
