
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, MessageSquare, PieChart } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      title: "Sentiment Analysis",
      description: "Analyze brand mentions to determine positive, negative or neutral sentiment",
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Trend Tracking",
      description: "Monitor changes in brand perception over time with advanced analytics",
      icon: TrendingUp, 
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Detailed Reports",
      description: "Get comprehensive reports with actionable insights for brand improvement",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600", 
    },
    {
      title: "Data Visualization",
      description: "Visualize sentiment data with intuitive charts and graphs",
      icon: PieChart,
      color: "bg-amber-100 text-amber-600",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="p-5 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
        >
          <div className={`${feature.color} p-2 rounded-lg w-fit mb-3`}>
            <feature.icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
