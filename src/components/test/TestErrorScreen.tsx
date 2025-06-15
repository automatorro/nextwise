
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface TestErrorScreenProps {
  title: string;
  message: string;
  onReturnToTests: () => void;
}

const TestErrorScreen: React.FC<TestErrorScreenProps> = ({
  title,
  message,
  onReturnToTests
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{message}</p>
          <Button onClick={onReturnToTests} className="w-full">
            Înapoi la teste
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestErrorScreen;
