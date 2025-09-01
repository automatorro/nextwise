
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TestTube, 
  BarChart3, 
  FileText, 
  Users, 
  Download,
  Settings
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface QuickActionsProps {
  isAdmin: boolean;
}

const QuickActions = ({ isAdmin }: QuickActionsProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const actions = [
    {
      title: t('profile.quickActions.tryNewTest'),
      description: t('profile.quickActions.tryNewTestDesc'),
      icon: TestTube,
      onClick: () => navigate('/tests'),
      color: 'text-blue-600'
    },
    {
      title: t('profile.quickActions.goToDashboard'),
      description: t('profile.quickActions.goToDashboardDesc'),
      icon: BarChart3,
      onClick: () => navigate('/dashboard'),
      color: 'text-green-600'
    },
    {
      title: t('profile.quickActions.viewAllTests'),
      description: t('profile.quickActions.viewAllTestsDesc'),
      icon: FileText,
      onClick: () => navigate('/tests'),
      color: 'text-purple-600'
    },
    {
      title: t('profile.quickActions.createCareerPlan'),
      description: t('profile.quickActions.createCareerPlanDesc'),
      icon: Users,
      onClick: () => navigate('/career'),
      color: 'text-orange-600'
    },
    {
      title: t('profile.quickActions.downloadReports'),
      description: t('profile.quickActions.downloadReportsDesc'),
      icon: Download,
      onClick: () => {},
      color: 'text-indigo-600'
    },
    {
      title: t('profile.quickActions.manageSubscription'),
      description: t('profile.quickActions.manageSubscriptionDesc'),
      icon: Settings,
      onClick: () => {},
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
                className="h-auto p-4 text-left flex flex-col items-start space-y-2"
                onClick={action.onClick}
              >
                <IconComponent className={`h-5 w-5 ${action.color}`} />
                <div>
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
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
