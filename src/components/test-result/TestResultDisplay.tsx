import React from 'react';
import { StandardizedScore } from '@/types/tests';
import { DimensionalResultLayout } from './layouts/DimensionalResultLayout';
import { ProfileResultLayout } from './layouts/ProfileResultLayout';
import { ScaleResultLayout } from './layouts/ScaleResultLayout';
import TestResultNextSteps from './TestResultNextSteps';

interface TestResultDisplayProps {
  score: StandardizedScore | null;
  testName?: string;
  resultId?: string;
}

export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ score, testName, resultId }) => {
  if (!score) {
    return <div className="text-center p-8"><p className="text-muted-foreground">Se încarcă rezultatele...</p></div>;
  }

  const renderResultLayout = () => {
    switch (score.type) {
      case 'dimensional':
        return <DimensionalResultLayout score={score} testName={testName} resultId={resultId} />;
      
      case 'profile':
        return <ProfileResultLayout score={score} testName={testName} />;

      case 'scale':
        return <ScaleResultLayout score={score} testName={testName} resultId={resultId} />;

      default:
        return (
          <div className="text-center p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded">
            <h2 className="text-xl font-semibold">Rezultat Primit</h2>
            <p>{score.interpretation}</p>
          </div>
        );
    }
  };

  return (
    <div>
      {renderResultLayout()}
      <TestResultNextSteps testName={testName} testType={score.type} />
    </div>
  );
};