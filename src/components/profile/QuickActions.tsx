
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, BarChart3, FileText, Target, Download, Settings } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const actions = [
    {
      icon: Play,
      title: t('profile.quickActions.tryNewTest'),
      description: t('profile.quickActions.tryNewTestDesc'),
      action: () => navigate('/tests'),
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: t('profile.quickActions.goToDashboard'),
      description: t('profile.quickActions.goToDashboardDesc'),
      action: () => navigate('/dashboard'),
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: t('profile.quickActions.viewAllTests'),
      description: t('profile.quickActions.viewAllTestsDesc'),
      action: () => navigate('/tests'),
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: t('profile.quickActions.createCareerPlan'),
      description: t('profile.quickActions.createCareerPlanDesc'),
      action: () => navigate('/career-paths'),
      color: 'text-orange-600'
    },
    {
      icon: Download,
      title: t('profile.quickActions.downloadReports'),
      description: t('profile.quickActions.downloadReportsDesc'),
      action: () => console.log('Download reports'),
      color: 'text-indigo-600'
    },
    {
      icon: Settings,
      title: t('profile.quickActions.manageSubscription'),
      description: t('profile.quickActions.manageSubscriptionDesc'),
      action: () => navigate('/subscription'),
      color: 'text-red-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.quickActions.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left space-y-2 hover:bg-gray-50"
                onClick={action.action}
              >
                <IconComponent className={`h-6 w-6 ${action.color}`} />
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
