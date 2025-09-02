
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { getTestTranslation } from '@/utils/testTranslationMapping';

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
  const { t, language } = useTranslation();
  
  // Get translated test name and description
  const translation = getTestTranslation(testType.name, language);
  const translatedTestName = translation.name;
  const translatedTestDescription = translation.description;

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Card className="max-w-2xl mx-4">
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
              <p className="font-semibold">{testType.estimated_duration} {t('testRunner.minutes')}</p>
            </div>
          </div>
          <Button onClick={onStartTest} className="w-full">
            {t('testRunner.startTest')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestStartScreen;
