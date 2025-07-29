
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Brain,
  Lightbulb
} from 'lucide-react';

interface CareerPlan {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalMilestones: number;
  completedMilestones: number;
  estimatedCompletion: string;
  nextMilestone: string;
  aiGenerated: boolean;
}

interface Recommendation {
  type: 'skill' | 'path' | 'test';
  title: string;
  description: string;
  action: string;
}

interface Props {
  activeCareerPlans: CareerPlan[];
  recommendations: Recommendation[];
  features: {
    maxPlans: number;
    hasAI: boolean;
    hasAnalytics: boolean;
  };
}

const CareerDashboard = ({ activeCareerPlans = [], recommendations = [], features }: Props) => {
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'skill': return BookOpen;
      case 'path': return Target;
      case 'test': return Brain;
      default: return Lightbulb;
    }
  };

  // Defensive checks
  const safeActiveCareerPlans = Array.isArray(activeCareerPlans) ? activeCareerPlans : [];
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : [];
  const safeFeatures = features || { maxPlans: 1, hasAI: false, hasAnalytics: false };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planuri Active</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeActiveCareerPlans.length}</div>
            <p className="text-xs text-muted-foreground">
              din {safeFeatures.maxPlans === 999 ? '∞' : safeFeatures.maxPlans} disponibile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres Mediu</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(safeActiveCareerPlans.reduce((acc, plan) => acc + plan.progress, 0) / safeActiveCareerPlans.length || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              din toate planurile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestone-uri</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {safeActiveCareerPlans.reduce((acc, plan) => acc + plan.completedMilestones, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              completate luna aceasta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Career Plans */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Planurile mele active</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Creează plan nou</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {safeActiveCareerPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{plan.title}</span>
                      {plan.aiGenerated && (
                        <Badge variant="secondary" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{plan.progress}%</div>
                    <div className="text-xs text-gray-500">progres</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={plan.progress} className="w-full" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{plan.completedMilestones}/{plan.totalMilestones} milestone-uri</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>{plan.estimatedCompletion}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-1">Următorul pas:</div>
                  <div className="text-sm text-blue-700">{plan.nextMilestone}</div>
                </div>

                <Button className="w-full" variant="outline">
                  Vezi detalii
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recomandări AI pentru tine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeRecommendations.map((rec, index) => {
            const Icon = getRecommendationIcon(rec.type);
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  <Button variant="outline" className="w-full">
                    {rec.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareerDashboard;
