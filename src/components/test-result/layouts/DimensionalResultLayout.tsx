// src/components/test-result/layouts/DimensionalResultLayout.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
// Aceste componente vor trebui să existe și să fie corecte.
// Le vom verifica/repara dacă acest pas dă erori.
import OverallScoreCard from '../OverallScoreCard';
import { DimensionsAnalysis } from '../DimensionsAnalysis';
import { TestExplanations } from '../../tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';

interface DimensionalResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

/**
 * Acesta este layout-ul specializat pentru teste "dimensionale"
 * (ex: Cattell, Big Five), care au scoruri multiple pe diverse axe.
 */
export const DimensionalResultLayout: React.FC<DimensionalResultLayoutProps> = ({ score, testName }) => {
  // Verificare robustă pentru a afișa componentele doar dacă avem date pentru ele.
  const hasDimensions = Array.isArray(score.dimensions) && score.dimensions.length > 0;
  
  return (
    <div className="space-y-6">
      <OverallScoreCard
        scorePercentage={score.overall}
        rawScore={score.raw_score}
        maxScore={score.max_score}
        interpretation={score.interpretation}
        testName={testName}
      />
      
      <ScoringExplanation testName={testName} />
      
      {/* Vom reactiva aceste componente în pașii următori */}
      {/* {hasDimensions && <DimensionsAnalysis dimensions={score.dimensions} />} */}
      {/* {hasDimensions && <TestExplanations score={score} testName={testName} />} */}
    </div>
  );
};