
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestResultHeaderProps {
  testName: string;
  completedAt: string;
}

const TestResultHeader = ({ testName, completedAt }: TestResultHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/teste')}
        className="flex items-center mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Înapoi la teste
      </Button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Rezultatul testului: {testName}
      </h1>
      <p className="text-gray-600">
        Completat pe {new Date(completedAt).toLocaleDateString('ro-RO')}
      </p>
    </div>
  );
};

export default TestResultHeader;
