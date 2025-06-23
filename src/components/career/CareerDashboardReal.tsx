
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
  Lightbulb,
  Plus,
  Sparkles,
  X
} from 'lucide-react';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useCareerRecommendations } from '@/hooks/useCareerRecommendations';
import { useCareerPlanGeneration } from '@/hooks/useCareerPlanGeneration';
import { useTestResults } from '@/hooks/useTestResults';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

const CareerDashboardReal = () => {
  const { careerPlans, isLoading: plansLoading } = useCareerPlans();
  const { recommendations, dismissRecommendation } = useCareerRecommendations();
  const { generateCareerPlan, generateRecommendations, isGeneratingPlan, isGeneratingRecommendations } = useCareerPlanGeneration();
  const { testResults } = useTestResults();
  const { subscription } = useSubscription();
  const { toast } = useToast();

  const getSubscriptionFeatures = () => {
    if (!subscription) return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    
    switch (subscription.subscription_type) {
      case 'premium':
        return { maxPlans: 999, hasAI: true, hasAnalytics: true };
      case 'professional':
        return { maxPlans: 999, hasAI: false, hasAnalytics: true };
      default:
        return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    }
  };

  const features = getSubscriptionFeatures();

  const handleGenerateCareerPlan = () => {
    if (testResults.length === 0) {
      toast({
        title: "Teste necesare",
        description: "Pentru a genera un plan de carieră personalizat, completează mai întâi un test de personalitate.",
        variant: "destructive"
      });
      return;
    }

    // For demo, we'll use a default career goal. In production, this should come from user input
    const careerGoal = "dezvoltator software";
    generateCareerPlan.mutate({ careerGoal, testResults });
  };

  const handleGenerateRecommendations = () => {
    generateRecommendations.mutate();
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'skill': return BookOpen;
      case 'path': return Target;
      case 'test': return Brain;
      case 'course': return BookOpen;
      case 'certification': return Badge;
      default: return Lightbulb;
    }
  };

  const calculateOverallProgress = () => {
    if (careerPlans.length === 0) return 0;
    const totalProgress = careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0);
    return Math.round(totalProgress / careerPlans.length);
  };

  const getTotalCompletedMilestones = () => {
    // For now, estimate based on progress percentage
    return careerPlans.reduce((sum, plan) => {
      const estimatedTotal = 5; // Estimate 5 milestones per plan
      const completed = Math.floor((plan.progress_percentage || 0) / 100 * estimatedTotal);
      return sum + completed;
    }, 0);
  };

  if (plansLoading) {
    return <div>Se încarcă dashboard-ul...</div>;
  }

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
            <div className="text-2xl font-bold">{careerPlans.length}</div>
            <p className="text-xs text-muted-foreground">
              din {features.maxPlans === 999 ? '∞' : features.maxPlans} disponibile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres Mediu</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallProgress()}%</div>
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
            <div className="text-2xl font-bold">{getTotalCompletedMilestones()}</div>
            <p className="text-xs text-muted-foreground">
              completate luna aceasta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Actions */}
      {features.hasAI && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Acțiuni AI</span>
            </CardTitle>
            <CardDescription>
              Generează automat planuri de carieră și recomandări personalizate
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button 
              onClick={handleGenerateCareerPlan}
              disabled={isGeneratingPlan}
              className="flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>{isGeneratingPlan ? 'Generez...' : 'Generează Plan de Carieră'}</span>
            </Button>
            <Button 
              variant="outline"
              onClick={handleGenerateRecommendations}
              disabled={isGeneratingRecommendations}
              className="flex items-center space-x-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{isGeneratingRecommendations ? 'Generez...' : 'Actualizează Recomandări'}</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Active Career Plans */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Planurile mele active</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Creează plan nou</span>
          </Button>
        </div>

        {careerPlans.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nu ai planuri de carieră încă</h3>
              <p className="text-gray-600 mb-6">
                {testResults.length === 0 
                  ? 'Completează mai întâi un test de personalitate, apoi poți genera automat un plan personalizat.'
                  : 'Generează automat un plan personalizat bazat pe rezultatele testelor tale.'
                }
              </p>
              {testResults.length > 0 && features.hasAI ? (
                <Button onClick={handleGenerateCareerPlan} disabled={isGeneratingPlan}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingPlan ? 'Generez planul...' : 'Generează plan AI'}
                </Button>
              ) : (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Creează primul plan
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careerPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{plan.title}</span>
                        {plan.generated_by_ai && (
                          <Badge variant="secondary" className="text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{plan.progress_percentage || 0}%</div>
                      <div className="text-xs text-gray-500">progres</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={plan.progress_percentage || 0} className="w-full" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Milestone-uri în progres</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Plan activ</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">Plan de carieră personalizat</div>
                    <div className="text-sm text-blue-700">Continuă să lucrezi la obiectivele tale</div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Vezi detalii
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recomandări AI pentru tine</h2>
            {features.hasAI && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerateRecommendations}
                disabled={isGeneratingRecommendations}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGeneratingRecommendations ? 'Actualizez...' : 'Actualizează'}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((rec) => {
              const Icon = getRecommendationIcon(rec.recommendation_type);
              return (
                <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => dismissRecommendation.mutate(rec.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="flex-1">
                        {rec.action_text}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Badge variant="secondary" className="ml-2">
                        Prioritate {rec.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboardReal;
