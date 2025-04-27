
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { pipeline } from "@huggingface/transformers";
import { TrendingUp, TrendingDown, Smile, Frown, Meh } from "lucide-react";

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [classifier, setClassifier] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      const sentimentClassifier = await pipeline('sentiment-analysis');
      setClassifier(sentimentClassifier);
    };
    loadModel();
  }, []);

  const analyzeSentiment = async () => {
    if (!text.trim() || !classifier) return;
    
    setIsAnalyzing(true);
    try {
      const result = await classifier(text);
      setSentiment(result[0]);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Brand Sentiment Analyzer</h2>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text about your brand..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
          <Button 
            onClick={analyzeSentiment} 
            disabled={!text.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
          </Button>
        </div>

        {sentiment && (
          <div className={`mt-6 p-6 rounded-lg ${getSentimentColor()} transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Sentiment Result</h3>
                <p className="text-gray-600">
                  {sentiment.label === 'POSITIVE' ? 'Positive Sentiment' : 'Negative Sentiment'}
                </p>
                <p className="text-sm text-gray-500">
                  Confidence: {Math.round(sentiment.score * 100)}%
                </p>
              </div>
              <div className="flex items-center">
                {getSentimentIcon()}
                {sentiment.label === 'POSITIVE' ? 
                  <TrendingUp className="ml-2 text-green-500" /> : 
                  <TrendingDown className="ml-2 text-red-500" />
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
