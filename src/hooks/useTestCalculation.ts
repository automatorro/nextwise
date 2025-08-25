// src/hooks/useTestCalculation.ts

import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation'; 
// Aici adăugăm noua noastră funcție de calcul
import { calculateDiscScore } from '@/utils/testCalculations/discCalculation';
import { calculateGADScore } from '@/utils/testCalculations/gadCalculation';
import { calculateBigFiveScore } from '@/utils/testCalculations/bigFiveCalculation';
import { calculateEnneagramScore, getEnneagramDominantType } from '@/utils/testCalculations/enneagramCalculation';

export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo((): StandardizedScore | null => {
    if (!testName || !answers) {
      return null;
    }

    switch (testName) {
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

      // === AICI ACTIVĂM TESTUL DISC ===
      case 'Test DISC - Stiluri de Comportament':
        return calculateDiscScore(answers);

      // === AICI ACTIVĂM TESTUL GAD-7 ===
      case 'Evaluare Anxietate GAD-7':
        return calculateGADScore(answers);

      // === AICI ACTIVĂM TESTUL BIG FIVE ===
      case 'Big Five Personality Test':
        return calculateBigFiveScore(answers);

      // === AICI ACTIVĂM TESTUL ENNEAGRAM ===
      case 'Test Enneagram':
      case 'Enneagram Test':
      case 'Enneagram Personality Test':
        const enneagramScores = calculateEnneagramScore(answers);
        const dominantType = getEnneagramDominantType(enneagramScores);
        return {
          type: 'profile',
          dominant_profile: dominantType,
          dimensions: Object.entries(enneagramScores).map(([key, value]) => ({
            id: key,
            name: key.replace('type', 'Type '),
            score: value,
            percentage: Math.round((value / Math.max(...Object.values(enneagramScores))) * 100)
          })),
          interpretation: `Tipul tău dominant Enneagram este ${dominantType.replace('type', 'Type ')}`,
          overall: Math.max(...Object.values(enneagramScores)),
          raw_score: Math.max(...Object.values(enneagramScores)),
          max_score: Math.max(...Object.values(enneagramScores))
        };

      default:
        console.warn(`Nu există logică de calcul în noul sistem pentru: ${testName}.`);
        return {
          type: 'scale',
          interpretation: `Afișarea rezultatelor pentru testul "${testName}" este în curs de implementare în noul sistem.`,
        };
    }
  }, [testName, answers]);

  return score;
};