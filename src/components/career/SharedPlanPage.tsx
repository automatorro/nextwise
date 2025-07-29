
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar,
  BarChart3,
  Trophy,
  Clock,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { type CareerPlan } from '@/hooks/useCareerPlans';
import { type CareerMilestone } from '@/hooks/useCareerMilestones';

const SharedPlanPage = () => {
  const { planId } = useParams<{ planId: string }>();

  const { data: plan, isLoading: planLoading } = useQuery({
    queryKey: ['shared-plan', planId],
    queryFn: async () => {
      if (!planId) throw new Error('Plan ID is required');

      const { data, error } = await supabase
        .from('career_paths')
        .select('*')
        .eq('id', planId)
        .single();

      if (error) throw error;
      return data as CareerPlan;
    },
    enabled: !!planId
  });

  const { data: milestones, isLoading: milestonesLoading } = useQuery({
    queryKey: ['shared-milestones', planId],
    queryFn: async () => {
      if (!planId) return [];

      const { data, error } = await supabase
        .from('career_milestones' as any)
        .select('*')
        .eq('career_path_id', planId)
        .order('milestone_order', { ascending: true });

      if (error) throw error;
      return (data as any[]) as CareerMilestone[];
    },
    enabled: !!planId
  });

  if (planLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă planul de carieră...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan nu a fost găsit</h2>
          <p className="text-gray-600">Planul de carieră nu există sau nu este disponibil pentru partajare.</p>
        </div>
      </div>
    );
  }

  const completedMilestones = milestones?.filter(m => m.is_completed).length || 0;
  const totalMilestones = milestones?.length || 0;

  // Filter resources to show only active ones
  const getActiveResources = (resources: any[]) => {
    if (!resources || !Array.isArray(resources)) return [];
    return resources.filter(resource => resource.url && resource.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{plan.title}</h1>
          {plan.description && (
            <p className="text-lg text-gray-600 mb-4">{plan.description}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                Creat: {plan.created_at ? format(new Date(plan.created_at), 'dd MMM yyyy') : 'N/A'}
              </span>
            </div>
            {plan.generated_by_ai && (
              <Badge variant="secondary" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Generat cu AI
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Durata estimată</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMilestones * 2}</div>
              <p className="text-xs text-muted-foreground">săptămâni</p>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Pași către obiectiv</h2>
          
          {milestones && milestones.length > 0 ? (
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <Card key={milestone.id} className={`border-l-4 ${milestone.is_completed ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          milestone.is_completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <span>{milestone.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {milestone.is_completed && (
                          <Badge variant="default" className="bg-green-500">
                            Completat
                          </Badge>
                        )}
                        {milestone.target_date && (
                          <Badge variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(milestone.target_date), 'dd MMM yyyy')}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {milestone.description && (
                      <p className="text-gray-600 mb-4">{milestone.description}</p>
                    )}
                    
                    {milestone.resources && getActiveResources(milestone.resources).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Resurse recomandate:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {getActiveResources(milestone.resources).map((resource, resourceIndex) => (
                            <a
                              key={resourceIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {resource.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Nu există milestone-uri definite pentru acest plan.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Plan de carieră creat cu EmpowerCareer</p>
        </div>
      </main>
    </div>
  );
};

export default SharedPlanPage;
