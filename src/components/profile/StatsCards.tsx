
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingUp, Calendar, Award, Shield } from 'lucide-react';

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
              <p className="text-sm font-medium text-gray-600">Teste Completate</p>
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
              <p className="text-sm font-medium text-gray-600">Scor Mediu</p>
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
              <p className="text-sm font-medium text-gray-600">Luna Aceasta</p>
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
              <p className="text-sm font-medium text-gray-600">
                {isAdmin ? 'Status' : 'Cel Mai Bun La'}
              </p>
              <p className="text-sm font-bold text-gray-900">
                {isAdmin ? 'Administrator' : userStats.bestCategory}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
