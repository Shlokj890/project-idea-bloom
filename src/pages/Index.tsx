
import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  const handleDownloadThesis = async () => {
    toast({
      title: "Preparing thesis document",
      description: "Your document will download shortly...",
    });
    
    try {
      // Import the modules dynamically to avoid build issues
      const { default: jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(16);
      pdf.text("BRAND SENTIMENT ANALYSIS: DEVELOPMENT AND IMPLEMENTATION", 20, 20);
      pdf.text("OF A WEB-BASED TOOL FOR BRAND PERCEPTION MONITORING", 20, 28);
      
      // Add content with smaller font
      pdf.setFontSize(12);
      
      // Abstract
      pdf.text("ABSTRACT", 20, 40);
      const abstract = "This thesis presents the design, development, and validation of a Brand Sentiment Analyzer, a web-based application that employs lexicon-based sentiment analysis to evaluate textual content related to brands. The tool classifies text as positive, negative, or neutral using an expanded word list methodology and provides detailed analytical feedback.";
      const abstractWrapped = pdf.splitTextToSize(abstract, 170);
      pdf.text(abstractWrapped, 20, 50);
      
      // Introduction
      pdf.text("CHAPTER 1: INTRODUCTION", 20, 70);
      pdf.text("1.1 BACKGROUND", 20, 80);
      const background = "In today's digital landscape, brands face unprecedented visibility and scrutiny. Social media platforms, review sites, forums, and comment sections generate vast volumes of text containing consumer opinions and sentiments about products, services, and brand experiences.";
      const backgroundWrapped = pdf.splitTextToSize(background, 170);
      pdf.text(backgroundWrapped, 20, 90);
      
      // Add note about full document
      pdf.setFontSize(10);
      pdf.text("Note: This is a sample of the thesis document. The complete document would include all chapters.", 20, 270);
      
      // Save the PDF
      pdf.save("brand_sentiment_analysis_thesis.pdf");
      
      toast({
        title: "Download Complete",
        description: "Your thesis document has been downloaded as a PDF file.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your document. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 md:mb-0">Brand Sentiment Analyzer</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleDownloadThesis}
          >
            <Download className="h-4 w-4" />
            Download Research Thesis
          </Button>
        </div>
        <SentimentAnalyzer />
      </div>
    </div>
  );
};

export default Index;
