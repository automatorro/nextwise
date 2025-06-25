
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Trophy,
  TrendingUp,
  Clock,
  Users,
  Heart
} from 'lucide-react';
import HomeNavigation from '@/components/home/HomeNavigation';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const testCategories = [
    {
      icon: Brain,
      title: t('dashboard.categories.emotionalIntelligence'),
      description: t('dashboard.categories.emotionalIntelligenceDesc'),
      color: 'bg-blue-100 text-blue-600',
      tests: 1
    },
    {
      icon: Users,
      title: t('dashboard.categories.personality'),
      description: t('dashboard.categories.personalityDesc'),
      color: 'bg-purple-100 text-purple-600',
      tests: 5
    },
    {
      icon: Target,
      title: t('dashboard.categories.leadership'),
      description: t('dashboard.categories.leadershipDesc'),
      color: 'bg-green-100 text-green-600',
      tests: 1
    },
    {
      icon: Heart,
      title: t('dashboard.categories.wellness'),
      description: t('dashboard.categories.wellnessDesc'),
      color: 'bg-pink-100 text-pink-600',
      tests: 2
    }
  ];

  const quickStats = [
    {
      title: t('dashboard.stats.testsCompleted'),
      value: '0',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.stats.careerPlans'),
      value: '0',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.stats.timeSaved'),
      value: '0h',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: t('dashboard.stats.careerProgress'),
      value: '0%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div>
      <HomeNavigation />
      <div className="pt-28">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.welcome')}, {user?.user_metadata?.full_name || 'Utilizator'}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                {t('dashboard.welcomeSubtext')}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Start Test */}
              <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-xl">{t('dashboard.actions.startFirstTest')}</CardTitle>
                  </div>
                  <CardDescription>
                    {t('dashboard.actions.startFirstTestDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/teste">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {t('dashboard.actions.exploreTests')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Career Path */}
              <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-xl">{t('dashboard.actions.planCareer')}</CardTitle>
                  </div>
                  <CardDescription>
                    {t('dashboard.actions.planCareerDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/career-paths">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {t('dashboard.actions.startCareerPlan')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Test Categories Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <span>{t('dashboard.categories.title')}</span>
                </CardTitle>
                <CardDescription>
                  {t('dashboard.categories.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testCategories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <category.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{category.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          <Badge variant="secondary" className="mt-2">
                            {category.tests} {category.tests === 1 ? t('dashboard.categories.test') : t('dashboard.categories.tests')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/teste">
                    <Button variant="outline" className="w-full">
                      {t('dashboard.categories.viewAllTests')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
