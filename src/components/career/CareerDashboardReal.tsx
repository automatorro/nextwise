import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Target, 
  Calendar, 
  BarChart3, 
  Plus, 
  ArrowRight,
  Trash2,
  Eye
} from 'lucide-react';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useLanguage } from '@/hooks/useLanguage';
import { format } from 'date-fns';

const CareerDashboardReal = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { careerPlans, isLoading, deleteCareerPlan } = useCareerPlans();
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  const handleDeletePlan = async (planId: string) => {
    setDeletingPlanId(planId);
    try {
      await deleteCareerPlan.mutateAsync(planId);
    } catch (error) {
      console.error('Error deleting career plan:', error);
    } finally {
      setDeletingPlanId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (careerPlans.length === 0) {
    return (
      <div className="text-center py-12">
        <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('careerPaths.dashboard.noPlans')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('careerPaths.dashboard.createFirst')}
        </p>
        <Button onClick={() => navigate('/career-paths?tab=create-plan')}>
          <Plus className="w-4 h-4 mr-2" />
          {t('careerPaths.dashboard.createPlan')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('careerPaths.dashboard.title')}
          </h2>
          <p className="text-gray-600">
            {t('careerPaths.dashboard.subtitle')}
          </p>
        </div>
        <Button onClick={() => navigate('/career-paths?tab=create-plan')}>
          <Plus className="w-4 h-4 mr-2" />
          {t('careerPaths.dashboard.createPlan')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                  {plan.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {plan.generated_by_ai && (
                    <Badge variant="secondary" className="text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{t('careerPaths.dashboard.progress')}</span>
                  <span>{plan.progress_percentage || 0}%</span>
                </div>
                <Progress value={plan.progress_percentage || 0} className="h-2" />
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {t('careerPaths.dashboard.created')}: {' '}
                  {plan.created_at ? format(new Date(plan.created_at), 'dd MMM yyyy') : 'N/A'}
                </span>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/career-paths/${plan.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t('careerPaths.dashboard.viewDetails')}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={deletingPlanId === plan.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmare ștergere</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ești sigur că vrei să ștergi planul de carieră "{plan.title}"? 
                        Această acțiune nu poate fi anulată și toate milestone-urile asociate vor fi de asemenea șterse.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anulează</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePlan(plan.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Șterge planul
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerDashboardReal;
