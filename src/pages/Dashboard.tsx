
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useTestResults } from '@/hooks/useTestResults';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Target, 
  TrendingUp,
  Clock
} from 'lucide-react';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';
import TestCategoriesPreview from '@/components/dashboard/TestCategoriesPreview';
import OnboardingTutorial from '@/components/career/OnboardingTutorial';
import GlobalProgressTracker from '@/components/career/GlobalProgressTracker';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { testResults } = useTestResults();
  const { careerPlans } = useCareerPlans();

  // Calculate real stats
  const testsCompleted = testResults.length;
  const careerPlansCount = careerPlans.length;
  const avgProgress = careerPlans.length 
    ? Math.round(careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0) / careerPlans.length)
    : 0;
  const timeSaved = testsCompleted * 2; // Estimate 2 hours saved per test

  // Show onboarding for new users
  const isNewUser = testsCompleted === 0 && careerPlansCount === 0;

  const quickStats = [
    {
      title: t('dashboard.stats.testsCompleted'),
      value: testsCompleted.toString(),
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.stats.careerPlans'),
      value: careerPlansCount.toString(),
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.stats.timeSaved'),
      value: `${timeSaved}h`,
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: t('dashboard.stats.careerProgress'),
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const handleOnboardingComplete = () => {
    // User completed onboarding, they can start exploring
  };

  return (
    <div>
      <HomeNavigation />
      <div className="pt-28">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.welcome')} {user?.user_metadata?.full_name || 'Utilizator'}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                {t('dashboard.welcomeSubtext')}
              </p>
            </div>

            {/* Global Progress Tracker */}
            <div className="mb-8">
              <GlobalProgressTracker />
            </div>

            {/* Onboarding Tutorial for New Users */}
            {isNewUser && (
              <div className="mb-8">
                <OnboardingTutorial 
                  onComplete={handleOnboardingComplete}
                  userHasTests={testsCompleted > 0}
                  userHasPlans={careerPlansCount > 0}
                />
              </div>
            )}

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
                  <Link to="/tests">
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
            <TestCategoriesPreview />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
