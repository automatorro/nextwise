
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface GlobalProgressProps {
  overallProgress: number;
  completedTests: number;
  totalTests: number;
  milestonesReached: number;
  totalMilestones: number;
  currentStreak: number;
}

const GlobalProgressCard = ({
  overallProgress,
  completedTests,
  totalTests,
  milestonesReached,
  totalMilestones,
  currentStreak
}: GlobalProgressProps) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          {t('dashboard.globalProgress.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{t('dashboard.globalProgress.overallProgress')}</span>
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Target className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm font-medium">{t('dashboard.globalProgress.completedTests')}</p>
              <p className="text-lg font-bold text-blue-700">{completedTests}/{totalTests}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Award className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm font-medium">{t('dashboard.globalProgress.milestonesReached')}</p>
              <p className="text-lg font-bold text-green-700">{milestonesReached}/{totalMilestones}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Calendar className="h-6 w-6 text-orange-600" />
            <div>
              <p className="text-sm font-medium">{t('dashboard.globalProgress.currentStreak')}</p>
              <p className="text-lg font-bold text-orange-700">{currentStreak} {t('dashboard.globalProgress.days')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalProgressCard;
