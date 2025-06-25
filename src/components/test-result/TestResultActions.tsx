
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TestResultActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button onClick={() => navigate('/teste')} className="flex-1">
        Încearcă un alt test
      </Button>
      <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
        Mergi la Dashboard
      </Button>
    </div>
  );
};

export default TestResultActions;
