
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getTestNameTranslationKey, getTestDescriptionTranslationKey } from '@/utils/testTranslationMapping';

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
}

interface TestStartScreenProps {
  testType: TestType;
  questionsCount: number;
  onStartTest: () => void;
}

const TestStartScreen: React.FC<TestStartScreenProps> = ({
  testType,
  questionsCount,
  onStartTest
}) => {
  const { t } = useLanguage();
  
  // Get translated test name and description
  const testNameKey = getTestNameTranslationKey(testType.name);
  const testDescriptionKey = getTestDescriptionTranslationKey(testType.name);
  const translatedTestName = t(testNameKey);
  const translatedTestDescription = t(testDescriptionKey);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{translatedTestName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{translatedTestDescription}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">{t('testRunner.questionsLabel')}</p>
              <p className="font-semibold">{questionsCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('testRunner.durationLabel')}</p>
              <p className="font-semibold">{testType.estimated_duration} {t('tests.minutes')}</p>
            </div>
          </div>
          <Button onClick={onStartTest} className="w-full">
            {t('testRunner.startButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestStartScreen;
