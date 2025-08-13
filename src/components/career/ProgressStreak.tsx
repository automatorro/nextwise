import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressTracking } from '@/hooks/useProgressTracking';

const ProgressStreak = () => {
  const { t } = useLanguage();
  const { progressData } = useProgressTracking();

  const calculateStreak = () => {
    const lastWeekData = progressData.lastWeek;
    if (!lastWeekData || lastWeekData.length === 0) return 0;

    // Calculate consecutive days with activity
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const dayData = lastWeekData.find(d => d.tracking_date === dateStr);
      if (dayData && (dayData.steps_completed > 0 || dayData.milestones_reached > 0)) {
        streak++;
      } else if (i > 0) {
        // Break streak only if it's not today (user might not have done anything today yet)
        break;
      }
    }
    
    return streak;
  };

  const getWeeklyStats = () => {
    const lastWeekData = progressData.lastWeek;
    const totalSteps = lastWeekData.reduce((sum, day) => sum + day.steps_completed, 0);
    const totalMilestones = lastWeekData.reduce((sum, day) => sum + day.milestones_reached, 0);
    const activeDays = lastWeekData.filter(day => day.steps_completed > 0 || day.milestones_reached > 0).length;
    
    return { totalSteps, totalMilestones, activeDays };
  };

  const currentStreak = calculateStreak();
  const weeklyStats = getWeeklyStats();

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-orange-600 bg-orange-100';
    if (streak >= 3) return 'text-blue-600 bg-blue-100';
    if (streak >= 1) return 'text-green-600 bg-green-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <CardTitle className="text-lg">{t('gamification.streak.title')}</CardTitle>
          </div>
          <Badge className={getStreakColor(currentStreak)}>
            {currentStreak} {t('gamification.streak.days')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-semibold text-lg text-blue-600">{weeklyStats.activeDays}</span>
            </div>
            <p className="text-sm text-gray-600">{t('gamification.streak.activeDays')}</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-semibold text-lg text-green-600">{weeklyStats.totalSteps}</span>
            </div>
            <p className="text-sm text-gray-600">{t('gamification.streak.stepsCompleted')}</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Badge className="w-4 h-4 text-purple-600 mr-1" />
              <span className="font-semibold text-lg text-purple-600">{weeklyStats.totalMilestones}</span>
            </div>
            <p className="text-sm text-gray-600">{t('gamification.streak.milestonesReached')}</p>
          </div>
        </div>

        {currentStreak >= 3 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-orange-800">
                {currentStreak >= 7 
                  ? t('gamification.streak.messages.onFire')
                  : t('gamification.streak.messages.goodStreak')
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressStreak;