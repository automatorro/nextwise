// src/hooks/useTestCalculation.ts

import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
// Activăm importul pentru funcția de calcul
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation'; 

export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo((): StandardizedScore | null => {
    if (!testName || !answers) {
      return null;
    }

    switch (testName) {
      // Activăm logica pentru testul Cattell
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

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