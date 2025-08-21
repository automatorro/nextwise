
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Target, 
  Calendar,
  Edit,
  Share,
  BarChart3,
  Trophy,
  Clock
} from 'lucide-react';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useCareerMilestones } from '@/hooks/useCareerMilestones';
import MilestoneTracker from './MilestoneTracker';
import EditCareerPlanModal from './EditCareerPlanModal';
import ShareCareerPlanModal from './ShareCareerPlanModal';
import AIInsightsSection from './AIInsightsSection';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const CareerPlanDetails = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { careerPlans, isLoading: plansLoading } = useCareerPlans();
  const { milestones, isLoading: milestonesLoading } = useCareerMilestones(planId);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { toast } = useToast();

  const plan = careerPlans.find(p => p.id === planId);

  if (plansLoading || milestonesLoading) {
    return <div>Se încarcă detaliile planului...</div>;
  }

  if (!plan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Plan nu a fost găsit</h2>
        <Button onClick={() => navigate('/career-paths')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Înapoi la planuri
        </Button>
      </div>
    );
  }

  const completedMilestones = milestones.filter(m => m.is_completed).length;
  const totalMilestones = milestones.length;
  const upcomingMilestones = milestones.filter(m => 
    !m.is_completed && m.target_date && new Date(m.target_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/career-paths')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{plan.title}</h1>
            {plan.description && (
              <p className="text-gray-600 mt-2">{plan.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editează
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share className="w-4 h-4 mr-2" />
            Partajează
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres general</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan.progress_percentage || 0}%</div>
            <Progress value={plan.progress_percentage || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestone-uri</CardTitle>
            <Trophy className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMilestones}/{totalMilestones}</div>
            <p className="text-xs text-muted-foreground">completate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În această săptămână</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMilestones.length}</div>
            <p className="text-xs text-muted-foreground">milestone-uri apropiate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Creat</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {plan.created_at ? format(new Date(plan.created_at), 'dd MMM yyyy') : 'N/A'}
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {plan.generated_by_ai && (
                <Badge variant="secondary" className="text-xs">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Milestones Alert */}
      {upcomingMilestones.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <Clock className="w-5 h-5" />
              <span>Milestone-uri apropiate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingMilestones.slice(0, 3).map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between">
                  <span className="font-medium text-orange-900">{milestone.title}</span>
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    {milestone.target_date ? format(new Date(milestone.target_date), 'dd MMM') : 'Fără deadline'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {(plan as any).ai_insights && Array.isArray((plan as any).ai_insights) && (plan as any).ai_insights.length > 0 && (
        <AIInsightsSection 
          insights={(plan as any).ai_insights} 
          onRemoveInsight={async (insightId) => {
            const currentInsights = Array.isArray((plan as any).ai_insights) ? (plan as any).ai_insights : [];
            const updatedInsights = currentInsights.filter((insight: any) => insight.id !== insightId);
            
            const { error } = await supabase
              .from('career_paths')
              .update({ ai_insights: updatedInsights })
              .eq('id', planId);
            
            if (error) {
              toast({
                title: "Eroare",
                description: "Nu am putut șterge insight-ul.",
                variant: "destructive",
              });
            } else {
              toast({
                title: "Succes",
                description: "Insight-ul a fost șters cu succes.",
              });
              window.location.reload();
            }
          }}
        />
      )}

      {/* Milestone Tracker */}
      <MilestoneTracker careerPathId={planId!} canEdit={true} />

      {/* Modals */}
      {isEditModalOpen && (
        <EditCareerPlanModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          plan={plan}
        />
      )}

      {isShareModalOpen && (
        <ShareCareerPlanModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          plan={plan}
        />
      )}
    </div>
  );
};

export default CareerPlanDetails;
