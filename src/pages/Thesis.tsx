import React from 'react';
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { FileDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ThesisPage = () => {
  const { toast } = useToast();

  const generatePDF = async () => {
    toast({
      title: "Generating PDF",
      description: "Please wait while we generate your PDF...",
    });

    const thesisElement = document.getElementById('thesis-content');
    if (!thesisElement) return;

    try {
      const canvas = await html2canvas(thesisElement, {
        scale: 1.5,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'JPEG', imgX, position, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', imgX, position, imgWidth * ratio, imgHeight * ratio);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('brand_sentiment_analysis_thesis.pdf');
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your thesis PDF has been created and downloaded.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Brand Sentiment Analysis Thesis</h1>
          <Button 
            onClick={generatePDF}
            className="flex items-center gap-2"
          >
            <FileDown size={16} />
            Download PDF
          </Button>
        </div>
        
        <div id="thesis-content" className="bg-white p-8 shadow-md rounded-lg prose prose-lg max-w-none">
          <h1 className="text-center text-2xl font-bold mb-8">BRAND SENTIMENT ANALYSIS: DEVELOPMENT AND IMPLEMENTATION OF A WEB-BASED TOOL FOR BRAND PERCEPTION MONITORING</h1>
          
          <h2 className="text-xl font-bold mt-8 mb-4">ABSTRACT</h2>
          <p>This thesis presents the design, development, and validation of a Brand Sentiment Analyzer, a web-based application that employs lexicon-based sentiment analysis to evaluate textual content related to brands. The tool classifies text as positive, negative, or neutral using an expanded word list methodology and provides detailed analytical feedback. Built using React and Tailwind CSS, the system offers an intuitive interface for marketers, brand managers, and researchers to quickly assess brand perception. Testing with various texts demonstrated the tool's ability to accurately classify sentiment, with particular success in identifying strongly positive and negative content. While the current implementation has limitations in handling context, sarcasm, and nuanced expressions, it establishes a foundation for more sophisticated approaches. Future work includes machine learning integration, multilingual support, and automated social media monitoring capabilities. This research contributes to the field of sentiment analysis by providing a practical, accessible tool for brand perception monitoring in the increasingly important domain of customer feedback analysis.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">CHAPTER 1: INTRODUCTION</h2>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">1.1 BACKGROUND</h3>
          <p>In today's digital landscape, brands face unprecedented visibility and scrutiny. Social media platforms, review sites, forums, and comment sections generate vast volumes of text containing consumer opinions and sentiments about products, services, and brand experiences. This textual data holds valuable insights into how customers perceive brands, what aspects they appreciate, and what areas need improvement.</p>
          <p>The proliferation of user-generated content has created both an opportunity and a challenge for businesses. While this wealth of feedback can inform strategic decisions, manually analyzing such large volumes of text is impractical. This has driven the need for automated tools that can efficiently process textual data and extract sentiment information—positive, negative, or neutral—to support business intelligence.</p>
          <p>Sentiment analysis, also known as opinion mining, has emerged as a critical technology for this purpose. By automatically determining the emotional tone behind text, sentiment analysis tools help organizations monitor brand perception, track customer satisfaction, and identify emerging issues before they escalate.</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">1.2 PROBLEM STATEMENT</h3>
          <p>Despite the importance of sentiment analysis for brand management, existing solutions present several challenges:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Complexity: Many sentiment analysis tools employ sophisticated algorithms that require technical expertise to implement and interpret.</li>
            <li>Accessibility: Advanced sentiment analysis solutions often require significant computational resources or specialized knowledge, making them inaccessible to small businesses or individual researchers.</li>
            <li>Integration: Many tools don't offer user-friendly interfaces that allow non-technical users to quickly analyze text and understand results.</li>
            <li>Transparency: Black-box sentiment analysis systems provide results without explaining the factors influencing the sentiment classification.</li>
          </ol>
          <p>These challenges highlight the need for a web-based sentiment analysis tool that combines accuracy with accessibility, offering immediate insights through an intuitive interface.</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">1.3 AIMS AND OBJECTIVES</h3>
          <p>This research aims to develop and validate a web-based Brand Sentiment Analyzer that addresses the identified challenges. The specific objectives include:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Design and implement a responsive web application that allows users to input and analyze text for sentiment related to brands.</li>
            <li>Develop a lexicon-based sentiment analysis algorithm that accurately classifies text as positive, negative, or neutral.</li>
            <li>Create a user-friendly interface that clearly presents sentiment results, including visualization of sentiment intensity and detailed analysis points.</li>
            <li>Evaluate the performance of the tool using diverse brand-related texts to assess accuracy and usefulness.</li>
            <li>Identify limitations of the approach and suggest avenues for future enhancement.</li>
          </ol>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">1.4 SIGNIFICANCE OF THE STUDY</h3>
          <p>This research contributes to both academic and practical domains. From an academic perspective, it explores the application of lexicon-based sentiment analysis in the specific context of brand perception, examining the effectiveness of word-list approaches for this use case. From a practical standpoint, the resulting tool provides marketers, brand managers, and researchers with an accessible means to analyze sentiment without requiring specialized technical knowledge.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">CHAPTER 2: LITERATURE REVIEW</h2>
          
          <p className="text-sm text-gray-500 mt-12 pt-4 border-t border-gray-200">© 2023 Brand Sentiment Analysis Research - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default ThesisPage;
