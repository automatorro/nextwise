
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingUp, Calendar, Award, Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface UserStats {
  totalTests: number;
  averageScore: number;
  completedThisMonth: number;
  bestCategory: string;
}

interface StatsCardsProps {
  userStats: UserStats;
  isAdmin: boolean;
}

const StatsCards = ({ userStats, isAdmin }: StatsCardsProps) => {
  const { t } = useTranslation();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('profile.stats.testsCompleted')}</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.totalTests}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('profile.stats.averageScore')}</p>
              <p className={`text-2xl font-bold ${getScoreColor(userStats.averageScore)}`}>
                {userStats.averageScore}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('profile.stats.thisMonth')}</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.completedThisMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('profile.stats.bestAt')}</p>
              <p className="text-lg font-bold text-gray-900">{userStats.bestCategory}</p>
              {isAdmin && (
                <div className="flex items-center mt-1">
                  <Shield className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs text-red-600 font-medium">{t('profile.stats.administrator')}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
