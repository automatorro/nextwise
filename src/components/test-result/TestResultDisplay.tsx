
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import DimensionalResultLayout from './layouts/DimensionalResultLayout';
import ProfileResultLayout from './layouts/ProfileResultLayout';
import ScaleResultLayout from './layouts/ScaleResultLayout';
import RoleResultLayout from './layouts/RoleResultLayout';

interface TestResultDisplayProps {
  score: StandardizedScore;
  testName: string;
  completedAt: string;
  resultId: string;
}

const TestResultDisplay = ({ score, testName, completedAt, resultId }: TestResultDisplayProps) => {
  console.log('TestResultDisplay rendering with score type:', score.type);
  console.log('Score data:', score);

  // Route to appropriate layout based on score type
  switch (score.type) {
    case 'dimensional':
      return (
        <DimensionalResultLayout
          score={score}
          testName={testName}
          completedAt={completedAt}
          resultId={resultId}
        />
      );
    
    case 'profile':
      return (
        <ProfileResultLayout
          score={score}
          testName={testName}
          completedAt={completedAt}
          resultId={resultId}
        />
      );
    
    case 'scale':
      return (
        <ScaleResultLayout
          score={score}
          testName={testName}
          completedAt={completedAt}
          resultId={resultId}
        />
      );
    
    case 'role':
      return (
        <RoleResultLayout
          score={score}
          testName={testName}
          completedAt={completedAt}
          resultId={resultId}
        />
      );
    
    default:
      console.warn('Unknown score type, falling back to dimensional layout:', score.type);
      return (
        <DimensionalResultLayout
          score={score}
          testName={testName}
          completedAt={completedAt}
          resultId={resultId}
        />
      );
  }
};

export default TestResultDisplay;
