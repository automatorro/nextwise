import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award, 
  Crown,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GamificationBadgesProps {
  careerPlans: any[];
  userStats?: {
    totalPlans: number;
    completedMilestones: number;
    activeStreak: number;
  };
}

const GamificationBadges = ({ careerPlans, userStats }: GamificationBadgesProps) => {
  const { t } = useLanguage();

  const calculateAchievements = (): Achievement[] => {
    const totalPlans = careerPlans.length;
    const completedPlans = careerPlans.filter(plan => (plan.progress_percentage || 0) === 100).length;
    const avgProgress = careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0) / (careerPlans.length || 1);
    const hasAIPlans = careerPlans.some(plan => plan.generated_by_ai);

    return [
      {
        id: 'first_plan',
        icon: <Target className="w-5 h-5" />,
        title: t('gamification.achievements.firstPlan.title'),
        description: t('gamification.achievements.firstPlan.description'),
        earned: totalPlans >= 1,
        rarity: 'common'
      },
      {
        id: 'three_plans',
        icon: <TrendingUp className="w-5 h-5" />,
        title: t('gamification.achievements.threePlans.title'),
        description: t('gamification.achievements.threePlans.description'),
        earned: totalPlans >= 3,
        rarity: 'rare'
      },
      {
        id: 'first_completion',
        icon: <CheckCircle className="w-5 h-5" />,
        title: t('gamification.achievements.firstCompletion.title'),
        description: t('gamification.achievements.firstCompletion.description'),
        earned: completedPlans >= 1,
        rarity: 'rare'
      },
      {
        id: 'ai_collaborator',
        icon: <Zap className="w-5 h-5" />,
        title: t('gamification.achievements.aiCollaborator.title'),
        description: t('gamification.achievements.aiCollaborator.description'),
        earned: hasAIPlans,
        rarity: 'common'
      },
      {
        id: 'high_achiever',
        icon: <Award className="w-5 h-5" />,
        title: t('gamification.achievements.highAchiever.title'),
        description: t('gamification.achievements.highAchiever.description'),
        earned: avgProgress >= 75,
        rarity: 'epic'
      },
      {
        id: 'career_master',
        icon: <Crown className="w-5 h-5" />,
        title: t('gamification.achievements.careerMaster.title'),
        description: t('gamification.achievements.careerMaster.description'),
        earned: totalPlans >= 5 && completedPlans >= 2,
        rarity: 'legendary'
      }
    ];
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const achievements = calculateAchievements();
  const earnedAchievements = achievements.filter(a => a.earned);

  if (earnedAchievements.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <CardTitle className="text-lg">{t('gamification.achievements.title')}</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            {earnedAchievements.length}/{achievements.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {earnedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getRarityColor(achievement.rarity)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {achievement.title}
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationBadges;