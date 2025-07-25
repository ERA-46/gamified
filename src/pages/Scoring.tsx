import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from 'react-router-dom';
import { 
  Leaf, 
  TreePine, 
  Award,
  TrendingUp,
  Globe
} from "lucide-react";

const Scoring = () => {
  const [searchParams] = useSearchParams();
  const [currentScore] = useState(parseFloat(searchParams.get("score")));
  const maxScore = 5;
  const currentLevel = "Eco-Explorer";
  const nextLevel = "Sustainability Novice";
  
  const badges = [
    { id: 1, name: "Eco-Explorer", icon: "1.jpeg", color: "bg-green-500", minScore: 0 },
    { id: 2, name: "Sustainability Novice", icon: "2.jpeg", color: "bg-blue-500", minScore: 100 },
    { id: 3, name: "Resource Optimizer", icon: "4.jpeg", color: "bg-yellow-500", minScore: 200 },
    { id: 4, name: "Cloud Steward", icon: "3.jpeg", color: "bg-purple-500", minScore: 300 },
    { id: 5, name: "Green Innovator", icon: "5.jpeg", color: "bg-emerald-600", minScore: 400 }
  ];

  const rankings = [
    { rank: 1, name: "John K", score: 480, level: "Global Sustainability Leader" },
    { rank: 2, name: "Anne S", score: 465, level: "Global Sustainability Leader" },
    { rank: 3, name: "Alex R", score: 445, level: "Global Sustainability Leader" },
    { rank: 4, name: "Mark T", score: 430, level: "Global Sustainability Leader" },
    { rank: "9942", name: "You K", score: 240, level: "Eco-Explorer" }
  ];

const levels = [
  {
    level: 1,
    name: "Eco-Explorer",
    description: "You’ve just started learning about eco-friendly cloud practices. Every small step counts!",
    badge: "A cloud with a green leaf",
    minScore: 0
  },
  {
    level: 2,
    name: "Sustainability Novice",
    description: "You’re taking your first steps in reducing carbon footprints with cloud resources.",
    badge: "A tree inside a cloud",
    minScore: 1
  },
  {
    level: 3,
    name: "Resource Optimizer",
    description: "You’re beginning to optimize resource usage, reducing waste and energy consumption.",
    badge: "A wrench and a leaf",
    minScore: 2
  },
  {
    level: 4,
    name: "Cloud Steward",
    description: "You’re managing cloud resources thoughtfully, keeping eco-impact in mind.",
    badge: "A hand holding a cloud",
    minScore: 3
  },
  {
    level: 5,
    name: "Green Innovator",
    description: "You’re adopting best practices for cloud optimization and introducing eco-friendly techniques.",
    badge: "A cloud with solar panels",
    minScore: 4
  },
  {
    level: 6,
    name: "Carbon Neutral Champion",
    description: "You’ve mastered the art of reducing your cloud carbon footprint and have reached carbon neutrality.",
    badge: "A carbon footprint with a crossed-out symbol",
    minScore: 5
  },
  {
    level: 7,
    name: "Efficiency Architect",
    description: "You’re designing systems that prioritize energy efficiency, resource conservation, and eco-friendly practices.",
    badge: "A blueprint with a green checkmark",
    minScore: 6
  },
  {
    level: 8,
    name: "Green Cloud Engineer",
    description: "You’ve achieved sustainable cloud deployment and are mentoring others to follow the same eco-conscious path.",
    badge: "A cloud surrounded by gears and green vines",
    minScore: 7
  },
  {
    level: 9,
    name: "Eco-System Integrator",
    description: "You are integrating sustainability practices across the entire cloud infrastructure ecosystem.",
    badge: "A network of clouds with green connections",
    minScore: 8
  },
  {
    level: 10,
    name: "Global Sustainability Leader",
    description: "You’ve fully embraced and are actively promoting global eco-friendly cloud initiatives, leading the charge for a greener future.",
    badge: "A globe inside a green cloud",
    minScore: 9
  }
];


  const progressPercentage = (currentScore / maxScore) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Current Score Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-500" />
              Current Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You've just started learning about eco-friendly cloud practices. Every small step counts!
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{currentLevel}</span>
              <Badge variant="secondary">{nextLevel}</Badge>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              {badges.map((badge) => {
                const earned = currentScore >= badge.minScore;

                return (
                  <div key={badge.id} className="flex flex-col items-center relative">
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${earned ? badge.color : 'bg-gray-300 opacity-50'}`}>
                      <img
                        src={`/src/images/${badge.icon}`}
                        alt={badge.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {!earned && (
                        <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1 text-xs">
                          🔒
                        </div>
                      )}
                    </div>
                    <span className="text-xs mt-2 text-center max-w-16">{badge.name}</span>
                  </div>
                );
              })}

            </div>
          </CardContent>
        </Card>

        {/* CO2 Contribution Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-6 w-6 text-green-600" />
              Your CO2 Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              So far you have saved ____ CO2 to the world by using greener decisions. Keep it up.
            </p>
          </CardContent>
        </Card>

        {/* World Rankings Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-blue-500" />
              World Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankings.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold w-8">{user.rank}.</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={(user.score / 500) * 100} className="w-32 h-2" />
                    <span className="text-sm text-muted-foreground min-w-max">{user.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Levels Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {levels.map((levelInfo, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-semibold">
                    Level {levelInfo.level} - {levelInfo.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {levelInfo.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scoring;