import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  ArrowRight, 
  Sparkles, 
  BarChart3,
  CheckCircle,
  Info
} from 'lucide-react';

interface TestResultNextStepsProps {
  testName?: string;
  testType?: string;
}

const TestResultNextSteps: React.FC<TestResultNextStepsProps> = ({ testName, testType }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCreateCareerPlan = () => {
    navigate('/career-paths?tab=create');
  };

  const handleExploreMoreTests = () => {
    navigate('/tests');
  };

  const relevantForCareerPlanning = [
    'Big Five',
    'DISC',
    'Belbin',
    'Hexaco',
    'Enneagram',
    'Holland'
  ];

  const isRelevantForCareer = testName && relevantForCareerPlanning.some(
    test => testName.toLowerCase().includes(test.toLowerCase())
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{t('testResult.nextSteps.title')}</span>
        </h3>
        <p className="text-muted-foreground">
          {t('testResult.nextSteps.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Planning CTA */}
        <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Target className="w-5 h-5" />
              <span>{t('testResult.nextSteps.createCareerPlan')}</span>
            </CardTitle>
            <CardDescription>
              {isRelevantForCareer 
                ? t('testResult.nextSteps.careerPlanDescriptionRelevant')
                : t('testResult.nextSteps.careerPlanDescription')
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isRelevantForCareer && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {t('testResult.nextSteps.personalityInsight')}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {t('testResult.nextSteps.aiWillUse').replace('{{testName}}', testName || '')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleCreateCareerPlan}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('testResult.nextSteps.startCareerPlanning')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* More Tests CTA */}
        <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <BarChart3 className="w-5 h-5" />
              <span>{t('testResult.nextSteps.exploreMoreTests')}</span>
            </CardTitle>
            <CardDescription>
              {t('testResult.nextSteps.moreTestsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {t('testResult.categories.personality')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t('testResult.categories.cognitive')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t('testResult.categories.emotional')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t('testResult.categories.leadership')}
              </Badge>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleExploreMoreTests}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {t('testResult.nextSteps.discoverMoreTests')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestResultNextSteps;