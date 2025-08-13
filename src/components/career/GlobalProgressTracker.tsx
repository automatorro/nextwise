import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTestResults } from '@/hooks/useTestResults';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  Target, 
  BarChart3,
  TrendingUp
} from 'lucide-react';

const GlobalProgressTracker: React.FC = () => {
  const { t } = useLanguage();
  const { testResults } = useTestResults();
  const { careerPlans } = useCareerPlans();

  // Calculate progress milestones
  const hasCompletedTests = testResults.length > 0;
  const hasCreatedPlans = careerPlans.length > 0;
  const avgCareerProgress = careerPlans.length 
    ? Math.round(careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0) / careerPlans.length)
    : 0;

  // Calculate overall progress (0-100)
  let overallProgress = 0;
  if (hasCompletedTests) overallProgress += 40;
  if (hasCreatedPlans) overallProgress += 30;
  if (avgCareerProgress > 0) overallProgress += (avgCareerProgress * 0.3);

  const milestones = [
    {
      id: 'assessment',
      title: t('globalProgress.milestones.completeAssessment'),
      completed: hasCompletedTests,
      progress: hasCompletedTests ? 100 : 0,
      icon: BarChart3
    },
    {
      id: 'career-plan',
      title: t('globalProgress.milestones.createCareerPlan'),
      completed: hasCreatedPlans,
      progress: hasCreatedPlans ? 100 : 0,
      icon: Target
    },
    {
      id: 'development',
      title: t('globalProgress.milestones.trackDevelopment'),
      completed: avgCareerProgress > 50,
      progress: avgCareerProgress,
      icon: TrendingUp
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getProgressBadgeVariant = (progress: number) => {
    if (progress >= 80) return 'default';
    if (progress >= 40) return 'secondary';
    return 'outline';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>{t('globalProgress.title')}</span>
        </h3>
        <Badge variant={getProgressBadgeVariant(overallProgress)}>
          {Math.round(overallProgress)}%
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{t('globalProgress.overallProgress')}</span>
            <span className={`font-medium ${getProgressColor(overallProgress)}`}>
              {Math.round(overallProgress)}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="space-y-3">
          {milestones.map((milestone) => {
            const IconComponent = milestone.icon;
            return (
              <div key={milestone.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium truncate ${
                      milestone.completed ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {milestone.title}
                    </p>
                    <span className={`text-xs ml-2 ${getProgressColor(milestone.progress)}`}>
                      {milestone.progress}%
                    </span>
                  </div>
                  {milestone.progress > 0 && milestone.progress < 100 && (
                    <Progress value={milestone.progress} className="h-1 mt-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick stats */}
        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-blue-600">{testResults.length}</p>
              <p className="text-xs text-gray-600">{t('globalProgress.stats.tests')}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">{careerPlans.length}</p>
              <p className="text-xs text-gray-600">{t('globalProgress.stats.plans')}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-purple-600">{avgCareerProgress}%</p>
              <p className="text-xs text-gray-600">{t('globalProgress.stats.avgProgress')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalProgressTracker;