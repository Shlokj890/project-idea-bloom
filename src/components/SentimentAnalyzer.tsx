import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Meh, TrendingUp, TrendingDown, Minus, ListCheck, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Improved sentiment analysis function with better word lists and neutral detection
const mockSentimentAnalysis = (text: string) => {
  // Expanded list of positive words
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'awesome', 'wonderful', 'love', 'like', 'happy', 'best',
    'fantastic', 'incredible', 'superb', 'outstanding', 'brilliant', 'perfect', 'joy', 'enjoy',
    'beautiful', 'pleasant', 'delightful', 'impressive', 'exceptional', 'marvelous', 'positive',
    'nice', 'appreciate', 'grateful', 'thrilled', 'pleased', 'better', 'success', 'successful',
    'win', 'winner', 'winning', 'recommend', 'recommended', 'praise', 'favorite', 'favourite'
  ];
  
  // Expanded list of negative words
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'poor', 'worst', 'disappointed', 'sad',
    'negative', 'fail', 'failure', 'failed', 'disappointing', 'frustrating', 'annoying', 'useless',
    'broken', 'expensive', 'overpriced', 'slow', 'difficult', 'hard', 'problem', 'issue', 'trouble',
    'unfortunately', 'regret', 'boring', 'waste', 'wasted', 'unhappy', 'upset', 'angry', 'mad'
  ];
  
  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '');
    if (positiveWords.includes(cleanWord)) positiveCount++;
    if (negativeWords.includes(cleanWord)) negativeCount++;
  });
  
  // Calculate the percentage of sentiment words in the text
  const sentimentWordPercentage = (positiveCount + negativeCount) / Math.max(1, totalWords);
  
  if (positiveCount === 0 && negativeCount === 0) {
    return {
      label: 'NEUTRAL',
      score: 0.5,
      details: {
        positiveCount,
        negativeCount,
        totalWords,
        sentimentWordPercentage
      }
    };
  } else if (positiveCount > negativeCount) {
    const intensity = positiveCount / (positiveCount + negativeCount);
    return {
      label: 'POSITIVE',
      score: 0.5 + intensity * 0.5,
      details: {
        positiveCount,
        negativeCount,
        totalWords,
        sentimentWordPercentage
      }
    };
  } else if (negativeCount > positiveCount) {
    const intensity = negativeCount / (positiveCount + negativeCount);
    return {
      label: 'NEGATIVE',
      score: 0.5 - intensity * 0.5,
      details: {
        positiveCount,
        negativeCount,
        totalWords,
        sentimentWordPercentage
      }
    };
  } else {
    // Equal positive and negative words
    return {
      label: 'NEUTRAL',
      score: 0.5,
      details: {
        positiveCount,
        negativeCount,
        totalWords,
        sentimentWordPercentage
      }
    };
  }
};

// Enhanced component with images and better UI
const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<{
    label: string, 
    score: number,
    details: {
      positiveCount: number,
      negativeCount: number,
      totalWords: number,
      sentimentWordPercentage: number
    }
  } | null>(null);
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
    
    switch(sentiment.label) {
      case 'POSITIVE':
        return <Smile className="w-12 h-12 text-green-500" />;
      case 'NEGATIVE':
        return <Frown className="w-12 h-12 text-red-500" />;
      case 'NEUTRAL':
        return <Meh className="w-12 h-12 text-amber-500" />;
      default:
        return <Meh className="w-12 h-12 text-gray-400" />;
    }
  };

  const getSentimentColor = () => {
    if (!sentiment) return 'bg-gray-100';
    
    switch(sentiment.label) {
      case 'POSITIVE':
        return 'bg-green-100';
      case 'NEGATIVE':
        return 'bg-red-100';
      case 'NEUTRAL':
        return 'bg-amber-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getSentimentImage = () => {
    if (!sentiment) return null;
    
    switch(sentiment.label) {
      case 'POSITIVE':
        return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200&q=80";
      case 'NEGATIVE':
        return "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=200&q=80";
      case 'NEUTRAL':
        return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=200&q=80";
      default:
        return null;
    }
  };

  const getTrendIcon = () => {
    if (!sentiment) return null;
    
    switch(sentiment.label) {
      case 'POSITIVE':
        return <TrendingUp className="text-green-500" />;
      case 'NEGATIVE':
        return <TrendingDown className="text-red-500" />;
      case 'NEUTRAL':
        return <Minus className="text-amber-500" />;
      default:
        return null;
    }
  };

  const getAnalysisPoints = () => {
    if (!sentiment) return [];
    
    const { details } = sentiment;
    const points = [
      `Overall Sentiment: ${sentiment.label.toLowerCase()}`,
      `Confidence Score: ${Math.round(sentiment.score * 100)}%`,
      `Positive Words: ${details.positiveCount}`,
      `Negative Words: ${details.negativeCount}`,
      `Total Words Analyzed: ${details.totalWords}`,
      `Sentiment Intensity: ${sentiment.score > 0.75 || sentiment.score < 0.25 ? 'Strong' : 'Moderate'}`
    ];
    
    // Add sentiment-specific points
    if (sentiment.label === 'POSITIVE') {
      points.push('Positive language detected in the text');
      points.push(`Positive word ratio: ${(details.positiveCount / Math.max(1, details.totalWords) * 100).toFixed(1)}%`);
    } else if (sentiment.label === 'NEGATIVE') {
      points.push('Negative language detected in the text');
      points.push(`Negative word ratio: ${(details.negativeCount / Math.max(1, details.totalWords) * 100).toFixed(1)}%`);
    } else {
      points.push('Balanced or neutral language detected');
      points.push('Text contains a mix of positive and negative elements or is primarily neutral');
    }
    
    return points;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with image */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative h-16 w-32 mr-4">
          <Image className="w-full h-full text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-center text-primary">Brand Sentiment Analyzer</h2>
      </div>
      
      <Card className="p-6 space-y-4 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text about your brand..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] transition-all duration-300 focus:shadow-md border-2 focus:border-primary"
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
            className={`mt-6 p-6 rounded-lg ${getSentimentColor()} transition-all duration-300 animate-fade-in shadow-md`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-grow">
                {/* Sentiment image */}
                {getSentimentImage() && (
                  <div className="mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hidden md:block">
                    <img
                      src={getSentimentImage()}
                      alt={`${sentiment.label} sentiment visualization`}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-semibold">Sentiment Result</h3>
                  <p className="text-gray-600">
                    {sentiment.label === 'POSITIVE' 
                      ? 'Positive Sentiment - Your content is well-received!' 
                      : sentiment.label === 'NEGATIVE'
                        ? 'Negative Sentiment - Consider revising your messaging.'
                        : 'Neutral Sentiment - Your content is balanced.'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <ListCheck className="h-4 w-4" />
                    Analysis Points
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {getAnalysisPoints().map((point, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-700 animate-fade-in flex items-start gap-2 hover:translate-x-1 transition-transform duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full mt-1.5 bg-primary"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4 md:ml-4">
                <div className="bg-white p-4 rounded-full shadow-md">
                  {getSentimentIcon()}
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  {getTrendIcon()}
                </div>
                {/* Small sentiment image for mobile */}
                {getSentimentImage() && (
                  <div className="mt-2 overflow-hidden rounded-lg shadow-md md:hidden w-full">
                    <img
                      src={getSentimentImage()}
                      alt={`${sentiment.label} sentiment visualization`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
      
      {/* Informational cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="p-4 hover:shadow-md transition-shadow duration-300 bg-green-50">
          <div className="flex items-center mb-2">
            <Smile className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-medium">Positive Sentiment</h3>
          </div>
          <p className="text-sm text-gray-600">Indicates customer satisfaction and positive brand perception.</p>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow duration-300 bg-amber-50">
          <div className="flex items-center mb-2">
            <Meh className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="font-medium">Neutral Sentiment</h3>
          </div>
          <p className="text-sm text-gray-600">Shows balanced or factual mentions without strong emotion.</p>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow duration-300 bg-red-50">
          <div className="flex items-center mb-2">
            <Frown className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="font-medium">Negative Sentiment</h3>
          </div>
          <p className="text-sm text-gray-600">Highlights areas for improvement in your brand messaging.</p>
        </Card>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
