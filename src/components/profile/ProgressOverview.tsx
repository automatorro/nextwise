
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresul Tău</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progres General</span>
              <span>{userStats.averageScore}%</span>
            </div>
            <Progress value={userStats.averageScore} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Teste Completate</span>
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
