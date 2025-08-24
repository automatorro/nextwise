// src/hooks/useTestCalculation.ts

import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation'; 
// Aici adăugăm noua noastră funcție de calcul
import { calculateDiscScore } from '@/utils/testCalculations/discCalculation';
import { calculateGADScore } from '@/utils/testCalculations/gadCalculation';
import { calculateBigFiveScore } from '@/utils/testCalculations/bigFiveCalculation';

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
      case 'Big Five':
      case 'Test Big Five':
        return calculateBigFiveScore(answers);

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