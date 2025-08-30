
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { getResultLabels } from '@/utils/testResultTranslations';

interface TestResultHeaderProps {
  testName: string;
  completedAt: string;
}

const TestResultHeader = ({ testName, completedAt }: TestResultHeaderProps) => {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const labels = getResultLabels(language);

  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/tests')}
        className="flex items-center mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {labels.backToTests}
      </Button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {labels.testResult}: {testName}
      </h1>
      <p className="text-gray-600">
        {labels.completedOn} {new Date(completedAt).toLocaleDateString(language === 'en' ? 'en-US' : 'ro-RO')}
      </p>
    </div>
  );
};

export default TestResultHeader;
