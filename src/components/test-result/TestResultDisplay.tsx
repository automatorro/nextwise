import React from 'react';
import { StandardizedScore } from '@/types/tests';
import { DimensionalResultLayout } from './layouts/DimensionalResultLayout';
// We will add other layouts later

interface TestResultDisplayProps {
  score: StandardizedScore | null;
  testName?: string;
}

export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ score, testName }) => {
  if (!score) {
    return <div>Loading results...</div>;
  }

  switch (score.type) {
    case 'dimensional':
      return <DimensionalResultLayout score={score} testName={testName} />;

    // Other cases will be added here

    default:
      return (
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold">Rezultat în Procesare</h2>
          <p>{score.interpretation}</p>
        </div>
      );
  }
};
