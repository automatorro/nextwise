
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';

interface UserStats {
  totalTests: number;
  averageScore: number;
  completedThisMonth: number;
  bestCategory: string;
}

interface ProgressOverviewProps {
  userStats: UserStats;
  isAdmin: boolean;
}

const ProgressOverview = ({ userStats, isAdmin }: ProgressOverviewProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.progress.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t('profile.progress.overall')}</span>
              <span>{userStats.averageScore}%</span>
            </div>
            <Progress value={userStats.averageScore} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t('profile.progress.testsCompleted')}</span>
              <span>
                {isAdmin 
                  ? `${userStats.totalTests}/∞` 
                  : `${userStats.totalTests}/10`
                }
              </span>
            </div>
            <Progress 
              value={isAdmin ? 100 : Math.min((userStats.totalTests / 10) * 100, 100)} 
              className="w-full" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
