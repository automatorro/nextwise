
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{testType.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{testType.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Numărul de întrebări</p>
              <p className="font-semibold">{questionsCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Durata estimată</p>
              <p className="font-semibold">{testType.estimated_duration} minute</p>
            </div>
          </div>
          <Button onClick={onStartTest} className="w-full">
            Începe testul
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestStartScreen;
