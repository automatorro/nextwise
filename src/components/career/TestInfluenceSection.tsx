import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Target, 
  BarChart3, 
  CheckCircle,
  Info,
  Sparkles
} from 'lucide-react';

interface TestInfluenceSectionProps {
  testResults: any[];
}

const TestInfluenceSection: React.FC<TestInfluenceSectionProps> = ({ testResults }) => {
  const { t } = useLanguage();

  const getTestIcon = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five') || name.includes('hexaco')) return Brain;
    if (name.includes('disc') || name.includes('belbin')) return Users;
    if (name.includes('holland') || name.includes('enneagram')) return Target;
    return BarChart3;
  };

  const getTestColor = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five') || name.includes('hexaco')) return 'text-blue-600 bg-blue-100';
    if (name.includes('disc') || name.includes('belbin')) return 'text-green-600 bg-green-100';
    if (name.includes('holland') || name.includes('enneagram')) return 'text-purple-600 bg-purple-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getTestInfluence = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five')) return t('careerPlan.testInfluence.bigFive');
    if (name.includes('disc')) return t('careerPlan.testInfluence.disc');
    if (name.includes('belbin')) return t('careerPlan.testInfluence.belbin');
    if (name.includes('hexaco')) return t('careerPlan.testInfluence.hexaco');
    if (name.includes('holland')) return t('careerPlan.testInfluence.holland');
    if (name.includes('enneagram')) return t('careerPlan.testInfluence.enneagram');
    return t('careerPlan.testInfluence.general');
  };

  if (testResults.length === 0) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Info className="w-5 h-5" />
            <span>{t('careerPlan.testInfluence.noTestsTitle')}</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            {t('careerPlan.testInfluence.noTestsDescription')}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-900">
          <Sparkles className="w-5 h-5" />
          <span>{t('careerPlan.testInfluence.title')}</span>
        </CardTitle>
        <CardDescription className="text-green-700">
          {t('careerPlan.testInfluence.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testResults.map((result, index) => {
            const testName = result?.test_types?.name || result?.testName || 'Unknown Test';
            const IconComponent = getTestIcon(testName);
            const colorClasses = getTestColor(testName);
            const influence = getTestInfluence(testName);
            
            return (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${colorClasses}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900 truncate">
                        {testName}
                      </h4>
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {influence}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {t('careerPlan.testInfluence.completed')}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Brain className="w-4 h-4" />
            <span>
              {t('careerPlan.testInfluence.aiCombination').replace('{{count}}', testResults.length.toString())}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInfluenceSection;