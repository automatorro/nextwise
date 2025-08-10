// src/components/test-result/TestResultDisplay.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
// Activăm importul pentru layout-ul specializat
import { DimensionalResultLayout } from './layouts/DimensionalResultLayout';

interface TestResultDisplayProps {
  score: StandardizedScore | null;
  testName?: string;
}

export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ score, testName }) => {
  if (!score) {
    return <div className="text-center p-8"><p className="text-muted-foreground">Se încarcă rezultatele...</p></div>;
  }

  switch (score.type) {
    // Activăm afișarea pentru teste dimensionale
    case 'dimensional':
      return <DimensionalResultLayout score={score} testName={testName} />;
    
    default:
      return (
        <div className="text-center p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded">
          <h2 className="text-xl font-semibold">Rezultat Primit</h2>
          <p>{score.interpretation}</p>
        </div>
      );
  }
};