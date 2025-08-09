
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import { DimensionalResultLayout } from './layouts/DimensionalResultLayout';
import { ProfileResultLayout } from './layouts/ProfileResultLayout';
import { ScaleResultLayout } from './layouts/ScaleResultLayout';

interface TestResultDisplayProps {
  score: StandardizedScore | null;
  testName?: string;
  completedAt?: string;
  resultId?: string;
}

export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ 
  score, 
  testName, 
  completedAt, 
  resultId 
}) => {
  if (!score) {
    // This can be replaced with a loading skeleton component later
    return <div>Loading results...</div>;
  }

  // This is the core logic: it routes the score to the correct layout component.
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

    // case 'role':
    //   return <RoleResultLayout score={score} />; // To be implemented in the future

    default:
      return (
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-red-600">Eroare de Afișare</h2>
          <p>Nu a putut fi determinat tipul de rezultat pentru acest test.</p>
          <p>Nume Test: {testName || 'Nespecificat'}</p>
        </div>
      );
  }
};
